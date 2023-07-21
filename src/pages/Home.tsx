import { useAuth } from '@/hooks/useAuth';
import { Button, Typography } from '@mui/material';

export const Home = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Typography variant='h1' component='h2'>
        h1. Heading
      </Typography>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
