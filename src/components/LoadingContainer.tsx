import { Box, CircularProgress } from '@mui/material';

export const LoadingContainer = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
      <CircularProgress color='inherit' size='large' />
    </Box>
  );
};
