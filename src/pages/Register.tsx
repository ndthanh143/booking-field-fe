import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { useAuth } from '@/hooks/useAuth';
import { SignInPayload } from '@/services/user/user.dto';
import { userKeys } from '@/services/user/user.query';
import { postRegister } from '@/services/user/user.service';

type RegisterInput = SignInPayload & {
  confirmPassword: string;
};

const schema = object({
  firstName: string().required('Required'),
  lastName: string().required('Required'),
  username: string().required('Required'),
  email: string().required('Required').email('This field has to be email type'),
  phone: string().required('Required'),
  password: string().required('Required').min(6, 'Password length should be at least 6 characters'),
  confirmPassword: string()
    .required('Required')
    .min(6, 'Password length should be at least 6 characters')
    .oneOf([ref('password')], 'Password does not match'),
});
export const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
  });

  const { profile, isLoading } = useAuth();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: SignInPayload) => postRegister(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.profiles());
      navigate('/');
    },
  });

  const onSubmitHandler = (payload: SignInPayload) => {
    mutation.mutate(payload);
  };

  useEffect(() => {
    if (profile) {
      navigate('/');
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            {mutation.isError && (
              <Typography component='h5' sx={{ color: 'error.light', mt: 1 }} textAlign={'center'}>
                Username has been existed
              </Typography>
            )}
            <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register('firstName')}
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField {...register('lastName')} required fullWidth id='lastName' label='Last Name' />
                </Grid>
                <Grid item xs={12}>
                  <TextField {...register('username')} required fullWidth id='username' label='Username' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('email')}
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField {...register('phone')} required fullWidth name='phone' label='Phone' id='phone' />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register('confirmPassword')}
                    required
                    fullWidth
                    label='Confirm Password'
                    type='password'
                    id='confirm-password'
                  />
                </Grid>
              </Grid>
              <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Accept all policy' />
              <Button type='submit' fullWidth variant='contained' sx={{ py: 1, mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Link href='/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  );
};
