import { Image } from '@mui/icons-material';
import { Box } from '@mui/material';

export const DefaultImage = () => {
  return (
    <Box
      height='100%'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgcolor='secondary.light'
    >
      <Image fontSize='large' />
    </Box>
  );
};
