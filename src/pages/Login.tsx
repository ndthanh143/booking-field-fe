import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Box, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { Link } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { LoginInput } from '@/services/auth/auth.dto';

const schema = object({
  username: string().required('Please enter your username.'),
  password: string().required('Please enter your password.').min(6),
});

export const Login = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const { login, loginLoading, loginError } = useAuth();

  const onSubmitHandler = (payload: LoginInput) => {
    login(payload);
  };

  return (
    <Box
      sx={{
        m: {
          sm: 2,
          md: 4,
          lg: 8,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Login with your account
      </Typography>
      <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }} width='100%'>
        {state?.redirect && (
          <Alert severity='info' sx={{ marginY: 1 }}>
            Please login before
          </Alert>
        )}
        {loginError && <Alert severity='error'>Wrong username/email or password</Alert>}

        <TextField margin='normal' fullWidth id='username' label='Username' autoFocus {...register('username')} />
        {errors.username && (
          <Typography variant='caption' color='error'>
            {errors.username.message}
          </Typography>
        )}
        <TextField
          margin='normal'
          fullWidth
          label='Password'
          type='password'
          id='password'
          required
          sx={{
            ':required': {
              borderColor: 'error.main',
            },
          }}
          autoComplete='current-password'
          {...register('password')}
        />
        {errors.password && (
          <Typography variant='caption' color='error'>
            {errors.password.message}
          </Typography>
        )}
        <LoadingButton loading={loginLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, py: 1 }}>
          Login
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href='/forgotten-password' variant='body2'>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href='/register' variant='body2'>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
