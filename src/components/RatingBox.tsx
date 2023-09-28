import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Modal, Rating, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { TextArea } from './TextArea';
import { useLocale } from '@/locales';
import { Booking } from '@/services/booking/booking.dto';
import { CreateRatingPayload } from '@/services/rating/rating.dto';

export interface IRatingBoxProps {
  isOpen: boolean;
  onClose: () => void;
  data: Booking;
  onSubmit: (payload: CreateRatingPayload) => void;
}

export const RatingBox = ({ isOpen, onClose, data, onSubmit }: IRatingBoxProps) => {
  const { formatMessage } = useLocale();

  const [serviceRate, setServiceRate] = useState<number | null>(null);
  const [qualityRate, setQualityRate] = useState<number | null>(null);

  const [content, setContent] = useState<string>('');

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        minWidth={{ xs: 300, md: 500 }}
        bgcolor='primary.contrastText'
        borderRadius={4}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between' paddingBottom={2} padding={2}>
          <Typography id='parent-modal-title' textAlign='center' variant='h5' fontWeight={700}>
            {formatMessage({ id: 'app.account.menu.my-booking.rating.box.title' })}
          </Typography>
          <Close
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              ':hover': { opacity: 0.7 },
            }}
          />
        </Box>
        <Divider />
        <Box padding={2}>
          <Box display='flex' gap={1}>
            <Box
              component='img'
              src={data.pitch.venue.imageList?.[0].imagePath}
              alt={data.pitch.venue.name}
              width={100}
              height={100}
              sx={{ objectFit: 'cover' }}
              borderRadius={2}
            />
            <Box flex={1}>
              <Typography fontWeight={500}>{data.pitch.venue.name}</Typography>
              <Typography variant='caption'>{data.pitch.venue.address}</Typography>
            </Box>
          </Box>
          <Box justifyContent='center' marginY={2} display='flex' alignItems='center' gap={2}>
            <Typography>Services:</Typography>
            <Rating value={serviceRate} onChange={(_, value) => setServiceRate(value)} size='large' />
          </Box>
          <Box justifyContent='center' marginY={2} display='flex' alignItems='center' gap={2}>
            <Typography>Quality:</Typography>
            <Rating value={qualityRate} onChange={(_, value) => setQualityRate(value)} size='large' />
          </Box>

          <TextArea
            aria-label='minimum height'
            minRows={3}
            placeholder={formatMessage({ id: 'app.account.menu.my-booking.rating.box.description.placeholder' })}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            variant='contained'
            sx={{ width: '100%' }}
            onClick={() =>
              serviceRate && qualityRate && onSubmit({ booking: data.id, serviceRate, qualityRate, content })
            }
            disabled={!(serviceRate && qualityRate)}
          >
            {formatMessage({ id: 'app.account.menu.my-booking.rating.box.submit' })}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
