import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert, Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import { Link } from '@/components';
import { SignInPayload } from '@/services/user/user.dto';
import { userKeys } from '@/services/user/user.query';
import userService from '@/services/user/user.service';

type RegisterInput = SignInPayload & {
  confirmPassword: string;
};

const schema = object({
  firstName: string().required('Please enter your first name.'),
  lastName: string().required('Please enter your last name.'),
  username: string().required('Please enter a username.'),
  email: string()
    .required('Please provide your email address.')
    .email('Please enter a valid email address (e.g., example@email.com).'),
  phone: string().required('Please enter your phone number.'),
  password: string()
    .required('Please enter a password.')
    .min(6, 'Password must be at least 6 characters long.')
    .max(50, 'Password cannot exceed 50 characters.'),
  confirmPassword: string()
    .required('Please confirm your password.')
    .min(6, 'Password length should be at least 6 characters.')
    .oneOf(
      [ref('password')],
      'The password and confirm password fields do not match. Please ensure they are the same.',
    ),
});
export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: SignInPayload) => userService.register(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.profiles());
      navigate('/');
      toast.success('Sign up account successfully');
    },
  });

  const onSubmitHandler = (payload: SignInPayload) => {
    mutation.mutate(payload);
  };

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
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', cursor: 'pointer' }} onClick={() => navigate('/')}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign up
      </Typography>
      {mutation.isError && <Alert severity='error'>Username has been existed</Alert>}
      <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField {...register('firstName')} required fullWidth id='firstName' label='First Name' autoFocus />
            {errors.firstName && (
              <Typography variant='caption' color='error'>
                {errors.firstName.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField {...register('lastName')} required fullWidth id='lastName' label='Last Name' />
            {errors.lastName && (
              <Typography variant='caption' color='error'>
                {errors.lastName.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField {...register('username')} required fullWidth id='username' label='Username' />
            {errors.username && (
              <Typography variant='caption' color='error'>
                {errors.username.message}
              </Typography>
            )}
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
            {errors.email && (
              <Typography variant='caption' color='error'>
                {errors.email.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField {...register('phone')} required fullWidth name='phone' label='Phone' id='phone' />
            {errors.phone && (
              <Typography variant='caption' color='error'>
                {errors.phone.message}
              </Typography>
            )}
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
            {errors.password && (
              <Typography variant='caption' color='error'>
                {errors.password.message}
              </Typography>
            )}
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
            {errors.confirmPassword && (
              <Typography variant='caption' color='error'>
                {errors.confirmPassword.message}
              </Typography>
            )}
          </Grid>
        </Grid>
        {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Accept all policy" /> */}
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
  );
};
