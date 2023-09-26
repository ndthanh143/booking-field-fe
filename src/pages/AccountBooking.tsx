import { CheckCircle, GolfCourse } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { commonImages } from '@/assets/images/common';
import { RatingBox } from '@/components';
import { useLocale } from '@/locales';
import { Booking } from '@/services/booking/booking.dto';
import { bookingKeys } from '@/services/booking/booking.query';
import { CreateRatingPayload } from '@/services/rating/rating.dto';
import ratingService from '@/services/rating/rating.service';
import { convertCurrency, formatDate, formatDateToTime } from '@/utils';

export const AccountBooking = () => {
  const { formatMessage } = useLocale();

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>();

  const userBookingInstance = bookingKeys.personal();
  const { data, refetch, isLoading } = useQuery(userBookingInstance);

  const { mutate } = useMutation({
    mutationFn: (payload: CreateRatingPayload) => ratingService.create(payload),
    onSuccess: () => {
      refetch();
      setSelectedBooking(null);
      toast.success('Thanks for rating');
    },
  });

  const handleRatingSubmit = (payload: CreateRatingPayload) => {
    mutate(payload);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' marginBottom={4}>
        <Typography variant='h4' fontSize={{ xs: 20, md: 30 }} fontWeight={500}>
          {formatMessage({ id: 'app.account.menu.my-booking.title' })}
        </Typography>
      </Box>
      {isLoading || !data ? (
        <Box>
          <Skeleton variant='rectangular' height={40} sx={{ borderRadius: 2 }} />
          <Skeleton variant='rectangular' height={80} sx={{ marginY: 2, borderRadius: 2 }} />
          <Box display='flex' gap={2} justifyContent='end'>
            <Skeleton variant='rectangular' height={30} width={80} sx={{ borderRadius: 2 }} />
            <Skeleton variant='rectangular' height={30} width={80} sx={{ borderRadius: 2 }} />
          </Box>
        </Box>
      ) : data.data.length > 0 ? (
        <Box display='flex' flexDirection='column' gap={2}>
          {data.data.map((booking) => (
            <Box border={1} paddingX={2} borderRadius={4} borderColor='secondary.light' key={booking.id}>
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
                  <Typography>
                    {formatMessage({ id: 'app.account.menu.my-booking.day' })}: {formatDate(booking.startTime)}
                  </Typography>
                  <Typography>
                    {formatMessage({ id: 'app.account.menu.my-booking.time' })}:{' '}
                    {`${formatDateToTime(booking.startTime)} - ${formatDateToTime(booking.endTime)}`}
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
                    <Typography>{formatMessage({ id: 'app.account.menu.my-booking.rated' })}</Typography>
                    <CheckCircle sx={{ color: 'primary.main' }} />
                  </Box>
                ) : (
                  <Button
                    variant='contained'
                    onClick={() => {
                      setSelectedBooking(booking);
                    }}
                  >
                    {formatMessage({ id: 'app.account.menu.my-booking.rating' })}
                  </Button>
                )}
                <Button variant='text' color='secondary'>
                  {formatMessage({ id: 'app.account.menu.my-booking.detail' })}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box marginY={2}>
          <Box component='img' src={commonImages.noResult.src} alt={commonImages.noResult.name} />
          <Typography>{formatMessage({ id: 'app.account.menu.my-booking.no-result' })}</Typography>
        </Box>
      )}
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
