import { CheckCircle, GolfCourse } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { noResultImage } from '@/assets/images/common';
import { RatingBox } from '@/components';
import { Booking } from '@/services/booking/booking.dto';
import { bookingKeys } from '@/services/booking/booking.query';
import { CreateRatingPayload } from '@/services/rating/rating.dto';
import ratingService from '@/services/rating/rating.service';
import { convertCurrency, formatDate, formatDateToTime } from '@/utils';

export const AccountBooking = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>();

  const userBookingInstance = bookingKeys.personal();
  const { data, refetch } = useQuery(userBookingInstance);

  const { mutate } = useMutation({
    mutationFn: (payload: CreateRatingPayload) => ratingService.create(payload),
    onSuccess: () => {
      refetch();
      setSelectedBooking(null);
      toast.success('Cảm ơn bạn đã đánh giá');
    },
  });

  const handleRatingSubmit = (payload: CreateRatingPayload) => {
    mutate(payload);
  };

  return (
    <>
      <Box marginLeft={4} position='absolute' width='100%'>
        <Box display='flex' justifyContent='space-between' marginY={4}>
          <Typography variant='h4' fontWeight={500}>
            Đặt sân của tôi
          </Typography>
        </Box>
        {data ? (
          <Box display='flex' flexDirection='column' gap={2}>
            {data.data.map((booking) => (
              <Box border={1} paddingX={2} borderRadius={4} borderColor='secondary.light'>
                <Box display='flex' alignItems='center' paddingY={2}>
                  <GolfCourse />
                  <Typography
                    marginX={2}
                    fontWeight={500}
                    textTransform='uppercase'
                  >{`${booking.pitch.venue.name}`}</Typography>
                </Box>
                <Divider />
                <Grid container spacing={10} alignItems='center' paddingY={2}>
                  <Grid item xs={3}>
                    <Box
                      component='img'
                      src={booking.pitch.venue.imageList?.[0].imagePath}
                      alt={booking.pitch.venue.name}
                      width='100%'
                      height='100%'
                      sx={{ objectFit: 'cover' }}
                      borderRadius={2}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{`${booking.pitch.pitchCategory.name} - ${booking.pitch.name}`}</Typography>
                    <Typography>Ngày: {formatDate(booking.startTime)}</Typography>
                    <Typography>
                      Thời gian: {`${formatDateToTime(booking.startTime)} - ${formatDateToTime(booking.endTime)}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign='end' fontWeight={500}>
                      {convertCurrency(booking.totalPrice)}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Box paddingY={2} display='flex' alignItems='center' gap={1} justifyContent='end'>
                  {booking.rating ? (
                    <Box display='flex' alignItems='center' color='primary' gap={1}>
                      <Typography>Đã đánh giá</Typography>
                      <CheckCircle sx={{ color: 'primary.main' }} />
                    </Box>
                  ) : (
                    <Button
                      variant='contained'
                      onClick={() => {
                        setSelectedBooking(booking);
                      }}
                    >
                      Đánh giá
                    </Button>
                  )}
                  <Button
                    variant='text'
                    color='secondary'
                    sx={{
                      textDecoration: 'underline',
                    }}
                  >
                    Chi tiết
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box marginY={2}>
            <Box component='img' src={noResultImage.src} alt={noResultImage.name} />
            <Typography>bạn chưa đặt sân bóng nào</Typography>
          </Box>
        )}
      </Box>
      {selectedBooking && (
        <RatingBox
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          data={selectedBooking}
          onSubmit={(payload) => handleRatingSubmit(payload)}
        />
      )}
    </>
  );
};
