import { CheckCircle, GolfCourse } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RatingBox } from '@/components';
import { UserAccountLayout } from '@/components/UserAccountLayout';
import { useAuth } from '@/hooks';
import { BookingData } from '@/services/booking/booking.dto';
import { getUserBookings } from '@/services/booking/booking.service';
import { CreateRatingPayload } from '@/services/rating/rating.dto';
import { createRating } from '@/services/rating/rating.service';
import { convertCurrency } from '@/utils/convertCurrency';

export const AccountBooking = () => {
  const { profile } = useAuth();

  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>();

  const { data: bookings, refetch: userBookingsRefetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: () => {
      if (profile) {
        return getUserBookings(5);
      }
    },
    enabled: !!profile,
  });

  const { mutate: ratingMutation } = useMutation({
    mutationKey: ['create-rating'],
    mutationFn: (payload: CreateRatingPayload) => createRating(payload),
    onSuccess: () => {
      userBookingsRefetch();
      setSelectedBooking(null);
      toast.success('Cảm ơn bạn đã đánh giá');
    },
  });

  const handleRatingSubmit = (payload: CreateRatingPayload) => {
    ratingMutation(payload);
  };

  if (!profile) {
    navigate('/');
  }

  return (
    <UserAccountLayout>
      <Box marginLeft={4} position='absolute' width='100%'>
        <Box display='flex' justifyContent='space-between' marginY={4}>
          <Typography variant='h4' fontWeight={500}>
            Đặt sân của tôi
          </Typography>
        </Box>
        {bookings && (
          <Box display='flex' flexDirection='column' gap={2}>
            {bookings.data.map((booking) => (
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
                      src={booking.pitch.venue.imageList[0].imagePath}
                      alt={booking.pitch.venue.name}
                      width='100%'
                      height='100%'
                      sx={{ objectFit: 'cover' }}
                      borderRadius={2}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{`${booking.pitch.pitchCategory.name} - ${booking.pitch.no}`}</Typography>
                    <Typography>Ngày: {moment(booking.startTime).format('DD/MM/YYYY')}</Typography>
                    <Typography>
                      Thời gian:{' '}
                      {`${moment(booking.startTime).format('h:mm A')} - ${moment(booking.endTime).format('h:mm A')}`}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography textAlign='end' fontWeight={500}>
                      {/* {booking.pitch.price * (dateToTimeFloat(booking.endTime) - dateToTimeFloat(booking.startTime))} */}
                      {convertCurrency(120000)}
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
      <ToastContainer />
    </UserAccountLayout>
  );
};
