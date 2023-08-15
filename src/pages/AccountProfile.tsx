import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { object, string } from 'yup';
import { UserAccountLayout } from '@/components/UserAccountLayout';
import { useAuth, useBoolean } from '@/hooks';
import { UpdateUserData, UpdateUserPayload } from '@/services/user/user.dto';
import { updateUserInfo } from '@/services/user/user.service';

const schema = object({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().required(),
});

export const AccountProfile = () => {
  const navigate = useNavigate();

  const { value: isUpdating, setTrue, setFalse } = useBoolean(false);

  const { profile, refetch } = useAuth();

  const { register, handleSubmit, setValue } = useForm<UpdateUserData>({
    resolver: yupResolver(schema),
  });

  const { mutate: updateUserMutateion } = useMutation({
    mutationKey: ['update-user'],
    mutationFn: ({ id, data }: UpdateUserPayload) => updateUserInfo(id, data),
    onSuccess: () => {
      refetch({ queryKey: ['profile'] });
      setFalse();
      toast.success('Update user successfully');
    },
  });

  const onSubmitHandler = (data: UpdateUserData) => {
    if (profile) {
      const { _id } = profile;

      updateUserMutateion({ id: _id, data });
    }
  };

  if (!profile) {
    navigate('/');
  }

  useEffect(() => {
    if (profile) {
      const { firstName, lastName, phone } = profile;
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('phone', phone);
    }
  }, [profile, setValue]);

  return (
    profile && (
      <UserAccountLayout>
        <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} marginLeft={4}>
          <Box display='flex' justifyContent='space-between' marginY={4}>
            <Typography variant='h4' fontWeight={500}>
              Hồ sơ của tôi
            </Typography>
            {isUpdating ? (
              <Box display='flex' gap={2}>
                <Button variant='contained' type='submit'>
                  Lưu
                </Button>
                <Button variant='text' onClick={setFalse}>
                  Hủy
                </Button>
              </Box>
            ) : (
              <Button variant='outlined' color='secondary' onClick={setTrue}>
                Chỉnh sửa
              </Button>
            )}
          </Box>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Email</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography fontWeight={500}>{profile.email}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Họ và Tên</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between' gap={2}>
                  <TextField {...register('firstName')} />
                  <TextField {...register('lastName')} />
                </Box>
              ) : (
                <Typography fontWeight={500}>{`${profile.firstName} ${profile.lastName}`}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            alignItems='center'
            paddingY={2}
            borderBottom={1}
            borderColor='secondary.light'
          >
            <Grid item xs={5}>
              <Typography fontSize={18}>Số điện thoại</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between'>
                  <TextField sx={{ flex: 1 }} {...register('phone')} />
                </Box>
              ) : (
                <Typography fontWeight={500}>{profile.phone}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </UserAccountLayout>
    )
  );
};
