import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/locales';

export const BookingComplete = () => {
  const { formatMessage } = useLocale();

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
        textAlign='center'
      >
        <Typography variant='h1' fontSize={{ xs: 40, md: 60 }} color='success.dark'>
          {formatMessage({ id: 'app.booking.success.title' })}
        </Typography>
        <Box
          component='img'
          src='https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/owl-as-soccer-player-with-soccer-ball-markus-schnabel.jpg'
          alt='success booking'
          sx={{ objectFit: 'cover' }}
          maxHeight={400}
        />
        <Button
          variant='contained'
          sx={{ margin: 'auto', display: 'flex' }}
          onClick={() => navigate('/account/my-booking')}
        >
          {formatMessage({ id: 'app.booking.success.go-to-booking' })}
        </Button>
      </Box>
    </Box>
  );
};
