import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Box, Grid, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { Link } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { LoginInput } from '@/services/auth/auth.dto';

const schema = object({
  username: string().required(),
  password: string().required().min(6),
});

export const Login = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: yupResolver(schema),
  });

  const { profile, login, isLoading, loginLoading, loginError } = useAuth();

  const onSubmitHandler = (payload: LoginInput) => {
    login(payload);
  };

  useEffect(() => {
    if (profile) {
      navigate(state?.redirect || '/');
    }
  }, [profile, navigate]);

  return (
    !isLoading && (
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
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Login with your account
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 1 }}>
              {loginError && <Alert severity='error'>Wrong username/email or password</Alert>}
              <TextField
                margin='normal'
                required
                fullWidth
                id='username'
                label='Username'
                autoFocus
                {...register('username')}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                {...register('password')}
              />
              <LoadingButton
                loading={loginLoading}
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2, py: 1 }}
              >
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
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  );
};
