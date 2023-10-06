import { yupResolver } from '@hookform/resolvers/yup';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import authService from '@/services/auth/auth.service';

export type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

const schema = object({
  newPassword: string().required('Please enter your new password').min(6),
  confirmPassword: string()
    .required('Please confirm your new password')
    .oneOf(
      [ref('newPassword')],
      'The password and confirm password fields do not match. Please ensure they are the same.',
    ),
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
    mutationFn: authService.resetPassword,
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
  );
};
