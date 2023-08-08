import { ReportOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Stepper } from '@/components';
import StripeContainer from '@/components/StripeContainer';
import { TimeSelect } from '@/components/TimeSelect';
import { Booking, GetBookingOfPitchByDayDto } from '@/services/booking/booking.dto';
import { getBookingOfPitchByDay } from '@/services/booking/booking.service';
import { Pitch } from '@/services/pitch/pitch.dto';
import { getPitchesByVenue } from '@/services/pitch/pitch.service';
import { getVenue } from '@/services/venue/venue.service';
import { convertCurrency } from '@/utils/convertCurrency';
import { convertDecimalToTime } from '@/utils/formatTime';
import { formatDate } from '@/utils/fortmatDate';

function findFreeTime(bookings: Booking[]): Booking[] {
  // Sort the intervals by their start times
  bookings.sort((a, b) => a.startTime.getHours() - b.startTime.getHours());

  const freeTimeIntervals: Booking[] = bookings.reduce(
    (acc: Booking[], booking: Booking, index: number, bookings: Booking[]) => {
      const { startTime, endTime } = booking;

      if (index === 0) {
        // Handle the case where the first interval starts after 0
        if (startTime.getHours() > 0) {
          acc.push({
            id: -1, // You can set the id to a unique value for free time intervals if needed
            startTime: 0,
            endTime: startTime,
          });
        }
      } else {
        const previousBooking = bookings[index - 1];
        const previousEndTime = previousBooking.endTime;

        if (startTime > previousEndTime) {
          // Found a free time interval
          acc.push({
            _id: -1, // You can set the id to a unique value for free time intervals if needed
            startTime: previousEndTime,
            endTime: startTime,
          });
        }
      }

      // Add the current interval to the accumulator
      acc.push(interval);

      return acc;
    },
    [],
  );

  // Check for any remaining free time at the end of the day
  const lastInterval = bookings[bookings.length - 1];
  const lastEndTime = lastInterval.endTime;

  if (lastEndTime < 24) {
    freeTimeIntervals.push({
      id: -1, // You can set the id to a unique value for free time intervals if needed
      startTime: lastEndTime,
      endTime: 24,
    });
  }

  return freeTimeIntervals;
}

export const BookingPage = () => {
  const stepList = ['Tùy chọn', 'Thông tin cá nhân', 'Thanh toán', 'Hoàn tất'];
  const [step, setStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const rangeTime = times.reduce<number[]>(
    (arr, time, index) =>
      index !== times.length - 1 ? [...arr, time.startTime] : [...arr, time.startTime, time.endTime],
    [],
  );

  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: venue, mutate: venueMutation } = useMutation({
    mutationKey: ['venue'],
    mutationFn: (slug: string) => getVenue(slug),
  });

  const { data: bookings, mutate: bookingMutate } = useMutation({
    mutationKey: ['booking-pitch-by-day'],
    mutationFn: ({ pitchId, date }: GetBookingOfPitchByDayDto) => getBookingOfPitchByDay({ pitchId, date }),
  });

  const { data: pitches } = useQuery({
    queryKey: ['pitches'],
    queryFn: () => {
      if (venue) {
        const { _id } = venue;
        const pitchCategoryId = Number(searchParams.get('pitchCategory'));
        return getPitchesByVenue(_id, { pitchCategoryId });
      }
    },
    enabled: !!venue,
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedTime, setSelectedTime] = useState<number[] | null>(null);
  const [selectedPitch, setSelectedPitch] = useState<Pitch>();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (slug) {
      venueMutation(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (selectedPitch && selectedTime) {
      setTotalPrice(selectedPitch.price * (selectedTime[1] - selectedTime[0]));
    }
  }, [selectedPitch, selectedTime]);

  useEffect(() => {
    if (selectedDate && selectedPitch) {
      bookingMutate({ pitchId: selectedPitch._id, date: formatDate(selectedDate, 'YYYY-MM-DD') });
    }
  }, [selectedDate, selectedPitch, bookingMutate]);

  const times = findFreeTime(bookings);

  return (
    pitches && (
      <Box minHeight="100vh">
        <Stepper steps={stepList} activeStep={step} sx={{ marginY: 4 }} />
        {step === 0 && (
          <>
            <Typography textAlign="center" variant="h5" marginY={4}>
              Loại sân: {pitches[0].pitchCategory.name}
            </Typography>
            <Grid container spacing={4}>
              {pitches.map((item) => (
                <Grid item xs={3} position="relative" key={item._id}>
                  <Box onClick={() => setSelectedPitch(item)}>
                    <Box
                      width="100%"
                      height={100}
                      borderRadius={4}
                      sx={{
                        objectFit: 'cover',
                        cursor: 'pointer',
                        opacity: item === selectedPitch ? 1 : 0.5,
                        ':hover': {
                          opacity: 1,
                        },
                        boxShadow: item === selectedPitch ? 10 : 0,
                      }}
                      bgcolor="primary.light"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5">{item.no}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center">
              <DatePicker
                value={selectedDate}
                label="Chọn ngày muốn đặt"
                sx={{ marginY: 4 }}
                format="DD/MM/YYYY"
                disablePast
                onChange={(date) => setSelectedDate(date)}
              />
            </Box>
            <Box display="flex" width="100%" position="relative" border={1} borderColor="primary.dark" marginBottom={4}>
              {times.map((time) => (
                <TimeSelect key={time.startTime} {...time} onSave={(value) => setSelectedTime(value)} />
              ))}
              {rangeTime.map((time) => (
                <Typography
                  key={time}
                  position="absolute"
                  left={`${(time * 100) / 24}%`}
                  width="20px"
                  textAlign="center"
                  ml="-10px"
                  top="40px"
                >
                  {time}h
                </Typography>
              ))}
            </Box>
            <Box display="flex" justifyContent="center" marginTop={8} marginBottom={4}>
              <Button
                onClick={handleNextStep}
                variant="contained"
                disabled={!selectedPitch || !selectedDate || !selectedTime}
              >
                Tiếp theo
              </Button>
            </Box>
          </>
        )}
        {step === 1 && (
          <Grid container spacing={8} marginY={4}>
            <Grid item xs={6} width="100%">
              <StripeContainer currency="vnd" amount={totalPrice} />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" marginBottom={2}>
                <Box
                  component="img"
                  src={pitches[0].venue.imageList[0].imagePath}
                  alt="venue"
                  width="20%"
                  height="30%"
                  sx={{ objectFit: 'cover' }}
                  borderRadius={2}
                />
                <Box paddingX={2}>
                  <Typography fontWeight={500} variant="h5">
                    {pitches[0].venue.name}
                  </Typography>
                  <Typography fontWeight={300} variant="body2" fontStyle="italic">
                    {pitches[0].venue.address}
                  </Typography>
                </Box>
              </Box>

              <Box marginY={2}>
                <Box display="flex">
                  <Typography fontWeight={500}>Loại:</Typography>
                  <Typography marginX={1}>{pitches?.[0].pitchCategory.name}</Typography>
                </Box>
                {selectedDate && (
                  <Box display="flex">
                    <Typography fontWeight={500}>Ngày:</Typography>
                    <Typography marginX={1}>{formatDate(selectedDate, 'MM/DD/YYYY')}</Typography>
                  </Box>
                )}
                <Box display="flex">
                  <Typography fontWeight={500}>Thời gian:</Typography>
                  {selectedTime && (
                    <Typography marginX={1}>
                      {convertDecimalToTime(selectedTime[0])} - {convertDecimalToTime(selectedTime[1])}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Divider sx={{ marginTop: 1 }} />
              <Box display="flex" justifyContent="space-between" paddingY={2}>
                <Typography fontWeight={500}>Giá:</Typography>
                <Typography>{selectedPitch && convertCurrency(selectedPitch.price)}</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" paddingY={2}>
                <Typography fontWeight={500}>Tổng cộng:</Typography>
                <Typography fontWeight={700}>{convertCurrency(totalPrice)}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ReportOutlined />
                <Typography variant="caption" marginX={1}>
                  Mọi thay đổi hoặc hủy bỏ đều do địa điểm quyết định và thường không được chấp thuận.
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ReportOutlined />
                <Typography variant="caption" marginX={1}>
                  Bằng cách đặt hàng, bạn đồng ý với Điều khoản và Điều kiện & Chính sách quyền riêng tư của Playfinder
                  cũng như điều khoản sử dụng của địa điểm
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    )
  );
};
