import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import { useLocale } from '@/locales';
import { ChangePasswordPayload } from '@/services/user/user.dto';
import userService from '@/services/user/user.service';

const schema = object({
  currentPassword: string().required('Please fill in this field'),
  newPassword: string().required('Please fill in this field'),
  confirmPassword: string()
    .required('Please fill in this field')
    .oneOf([ref('newPassword')], 'Confirm password is not match'),
});
export const AccountPassword = () => {
  const { formatMessage } = useLocale();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isError } = useMutation({
    mutationFn: (data: ChangePasswordPayload) => userService.changePassword(data),
    onSuccess: () => {
      toast.success('Update password successfully');
      reset();
    },
  });

  const onSubmitHandler = (data: ChangePasswordPayload) => {
    mutate(data);
  };
  return (
    <>
      <Box component='form' onSubmit={handleSubmit(onSubmitHandler)}>
        {isError && <Alert severity='error'>Password is not correct</Alert>}

        <Box marginY={2}>
          <Typography>{formatMessage({ id: 'app.account.menu.change-password.old-password' })}</Typography>
          <TextField type='password' fullWidth placeholder='Nhập mật khẩu cũ' {...register('currentPassword')} />
          {errors.currentPassword && (
            <Typography sx={{ color: 'error.main' }} variant='body2'>
              *{errors.currentPassword.message}
            </Typography>
          )}
        </Box>
        <Box marginY={2}>
          <Typography>{formatMessage({ id: 'app.account.menu.change-password.new-password' })}</Typography>
          <TextField type='password' fullWidth placeholder='Nhập mật khẩu mới' {...register('newPassword')} />
          {errors.newPassword && (
            <Typography sx={{ color: 'error.main' }} variant='body2'>
              *{errors.newPassword.message}
            </Typography>
          )}
        </Box>
        <Box marginY={2}>
          <Typography>{formatMessage({ id: 'app.account.menu.change-password.confirm-password' })}</Typography>
          <TextField type='password' fullWidth placeholder='Nhập lại mật khẩu mới' {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <Typography sx={{ color: 'error.main' }} variant='body2'>
              *{errors.confirmPassword.message}
            </Typography>
          )}
        </Box>
        <Button variant='contained' type='submit'>
          {formatMessage({ id: 'app.account.menu.change-password.submit' })}
        </Button>
      </Box>
    </>
  );
};
