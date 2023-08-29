import { yupResolver } from '@hookform/resolvers/yup';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import { resetPassword } from '@/services/auth/auth.service';

export type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

const schema = object({
  newPassword: string().required('Please fill in this field').min(6),
  confirmPassword: string()
    .required('Please fill in this field')
    .oneOf([ref('newPassword')], 'Mật khẩu nhập lại không khớp'),
});

export const ResetPassword = () => {
  const navigate = useNavigate();

  const { resetToken } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(schema),
  });

  const { mutate } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success('Change password successfully');
      navigate('/login');
    },
    onError: () => {
      toast.error('Your reset token is expired!');
    },
  });
  const onSubmitHandler = (data: ResetPasswordForm) =>
    resetToken && mutate({ resetToken, newPassword: data.newPassword });

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://www.si.com/.image/t_share/MTkxMTk2ODg5NjI0MjI1MDAz/al-rihla.webp)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ padding: 4, bgcolor: 'success.dark', marginY: 4 }}>
            <LockOpen fontSize='large' />
          </Avatar>
          <Typography variant='h4' fontWeight={500} marginBottom={2}>
            Update your new password
          </Typography>
          <Box width='80%' component='form' onSubmit={handleSubmit(onSubmitHandler)}>
            <TextField
              type='password'
              fullWidth
              placeholder='Your new password'
              sx={{ marginY: 1 }}
              {...register('newPassword')}
            />
            {errors.newPassword && <Typography color='error.main'>*{errors.newPassword.message}</Typography>}
            <TextField
              type='password'
              fullWidth
              placeholder='Confirm your new password'
              sx={{ marginY: 1 }}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <Typography color='error.main'>*{errors.confirmPassword.message}</Typography>}
            <LoadingButton variant='contained' fullWidth sx={{ marginY: 2 }} type='submit'>
              Continue
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
