import { Link, Typography } from '@mui/material';

export const Copyright = () => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' marginY={1}>
      {'Copyright © '}
      <Link color='inherit' href='/'>
        go2play
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
};
