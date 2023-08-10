import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const BookingComplete = () => {
  const navigate = useNavigate();
  return (
    <Box height='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Typography variant='h1'>Đặt sân thành công</Typography>
        <Button variant='contained' sx={{ margin: 'auto', display: 'flex' }} onClick={() => navigate('/')}>
          Quay lại trang chủ
        </Button>
      </Box>
    </Box>
  );
};
