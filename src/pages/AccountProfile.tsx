import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { object, string } from 'yup';
import { useAuth, useBoolean } from '@/hooks';
import { UpdateUserData, UpdateUserPayload } from '@/services/user/user.dto';
import userService from '@/services/user/user.service';

const schema = object({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().required(),
});

export const AccountProfile = () => {
  const { value: isUpdating, setTrue, setFalse } = useBoolean(false);

  const { profile, refetch } = useAuth();

  const { register, handleSubmit } = useForm<UpdateUserData>({
    resolver: yupResolver(schema),
  });

  const { mutate: updateUserMutateion } = useMutation({
    mutationFn: ({ id, data }: UpdateUserPayload) => userService.updateUserInfo(id, data),
    onSuccess: () => {
      refetch();
      setFalse();
      toast.success('Update user successfully');
    },
  });

  const onSubmitHandler = (data: UpdateUserData) => {
    if (profile) {
      const { id } = profile;

      updateUserMutateion({ id, data });
    }
  };

  return (
    profile && (
      <>
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
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography fontWeight={500} overflow='hidden'>
                {profile.email}
              </Typography>
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
              <Typography>Họ và Tên</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between' gap={2}>
                  <TextField {...register('firstName')} defaultValue={profile.firstName} placeholder='FirstName' />
                  <TextField {...register('lastName')} defaultValue={profile.lastName} placeholder='LastName' />
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
              <Typography>Số điện thoại</Typography>
            </Grid>
            <Grid item xs={7}>
              {isUpdating ? (
                <Box display='flex' justifyContent='space-between'>
                  <TextField sx={{ flex: 1 }} {...register('phone')} defaultValue={profile.phone} placeholder='Phone' />
                </Box>
              ) : (
                <Typography fontWeight={500}>{profile.phone}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </>
    )
  );
};
