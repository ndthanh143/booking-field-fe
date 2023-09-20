import { yupResolver } from '@hookform/resolvers/yup';
import { NoEncryption, Send } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, string } from 'yup';
import { sendEmailForgotPasswordPayload } from '@/services/auth/auth.dto';
import authService from '@/services/auth/auth.service';

const schema = object({
  email: string().required('Please fill in your email address'),
});
export const ForgottenPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<sendEmailForgotPasswordPayload>({ resolver: yupResolver(schema) });

  const { mutate, isError, isLoading, isSuccess } = useMutation({
    mutationFn: authService.sendEmailForgotPassword,
    onSuccess: () => {
      toast.success('Send reset password email successfully!');
    },
  });

  const onSubmitHandler = (data: sendEmailForgotPasswordPayload) => mutate(data);

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
          <Avatar variant='circular' sx={{ padding: 4, marginBottom: 2, bgcolor: 'primary.main' }}>
            <NoEncryption fontSize='large' />
          </Avatar>
          <Typography component='h1' variant='h4' fontWeight={500}>
            Forgot your password?
          </Typography>
          <Typography variant='body1' marginY={2}>
            Dont worry, we can help.
          </Typography>
          <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }} width='80%'>
            {isSuccess && (
              <Typography
                textAlign='center'
                marginBottom={2}
                padding={1}
                bgcolor='success.dark'
                color='success.contrastText'
              >
                Please check your email to receive reset password link
              </Typography>
            )}
            <TextField placeholder='Please fill in your email address' type='email' fullWidth {...register('email')} />
            {isError && (
              <Typography fontStyle='italic' color='error.main' variant='body2'>
                *No user founded with this email
              </Typography>
            )}
            {errors.email && (
              <Typography fontStyle='italic' color='error.main' variant='body2'>
                *{errors.email.message}
              </Typography>
            )}
            <Box display='flex' marginY={2} gap={2}>
              <Button variant='outlined' onClick={() => navigate('/login')}>
                Back to login
              </Button>
              <LoadingButton loading={isLoading} type='submit' variant='contained'>
                Send email
                <Send sx={{ ml: 1 }} fontSize='small' />
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
