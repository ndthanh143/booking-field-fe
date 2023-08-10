import { ReportOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Tooltip, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Stepper } from '@/components';
import StripeContainer from '@/components/StripeContainer';
import { TimeSelect } from '@/components/TimeSelect';
import { CreateBookingDto, GetBookingOfPitchByDayDto } from '@/services/booking/booking.dto';
import { createBooking, getBookingOfPitchByDay } from '@/services/booking/booking.service';
import { Pitch } from '@/services/pitch/pitch.dto';
import { getPitchesByVenue } from '@/services/pitch/pitch.service';
import { getVenue } from '@/services/venue/venue.service';
import { convertCurrency } from '@/utils/convertCurrency';
import { findFreeTime } from '@/utils/findBookingFreeTime';
import { convertDecimalToTime } from '@/utils/formatTime';

export const BookingPage = () => {
  const stepList = ['Tùy chọn', 'Thanh toán', 'Hoàn tất'];

  const [step, setStep] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const { slug } = useParams();

  const [searchParams, _] = useSearchParams();

  const { data: venue, mutate: venueMutation } = useMutation({
    mutationKey: ['venue'],
    mutationFn: (slug: string) => getVenue(slug),
  });

  const { data: bookings, mutate: getBookingMutate } = useMutation({
    mutationKey: ['booking-pitch-by-day'],
    mutationFn: ({ pitchId, date }: GetBookingOfPitchByDayDto) => getBookingOfPitchByDay({ pitchId, date }),
  });

  const { mutate: createBookingMutate } = useMutation({
    mutationKey: ['create-booking'],
    mutationFn: (payload: CreateBookingDto) => createBooking(payload),
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
  const [selectedTime, setSelectedTime] = useState<number[] | null>();
  const [selectedPitch, setSelectedPitch] = useState<Pitch>();

  const times = bookings && findFreeTime(bookings.data);

  const rangeTime = times?.reduce<number[]>(
    (arr, time, index) =>
      index !== times.length - 1 ? [...arr, time.startTime] : [...arr, time.startTime, time.endTime],
    [],
  );

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  const convertToDate = (dateString: string, time: number) => {
    const date = new Date(dateString);
    const hours = Math.floor(time);
    const minutes = (time - hours) * 60;

    date.setHours(hours, minutes, 0, 0);

    return date;
  };

  const handleSubmit = () => {
    if (selectedTime && selectedPitch) {
      const startTimeNumber = selectedTime[0];
      const startDayString = dayjs(selectedDate).format('YYYY-MM-DD');

      const endTimeNumber = selectedTime[1];
      const endDayString = dayjs(selectedDate).format('YYYY-MM-DD');

      const startTime = convertToDate(startDayString, startTimeNumber);
      const endTime = convertToDate(endDayString, endTimeNumber);

      createBookingMutate({
        startTime,
        endTime,
        pitch: selectedPitch._id,
      });
    }
  };

  useEffect(() => {
    if (slug) {
      venueMutation(slug);
    }
  }, [slug, venueMutation]);

  useEffect(() => {
    if (selectedPitch && selectedTime) {
      setTotalPrice(selectedPitch.price * (selectedTime[1] - selectedTime[0]));
    }
  }, [selectedPitch, selectedTime]);

  useEffect(() => {
    if (selectedDate && selectedPitch) {
      setSelectedTime(null);
      getBookingMutate({ pitchId: selectedPitch._id, date: dayjs(selectedDate).format('YYYY-MM-DD') });
    }
  }, [selectedDate, selectedPitch, getBookingMutate]);

  return (
    pitches && (
      <Box minHeight='100vh'>
        <Stepper steps={stepList} activeStep={step} sx={{ marginY: 4 }} />
        {step === 0 && (
          <>
            <Typography textAlign='center' variant='h5' marginY={4}>
              Loại sân: {pitches[0].pitchCategory.name}
            </Typography>
            <Grid container spacing={4} border={1} paddingBottom={4} borderColor='secondary.light' marginTop={1}>
              {pitches.map((item) => (
                <Grid item xs={3} position='relative' key={item._id}>
                  <Box onClick={() => setSelectedPitch(item)}>
                    <Box
                      width='100%'
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
                      bgcolor='primary.light'
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <Typography variant='h5'>{item.no}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box display='flex' justifyContent='center'>
              <DatePicker
                value={selectedDate}
                label='Chọn ngày muốn đặt'
                sx={{ marginY: 4 }}
                format='DD/MM/YYYY'
                disablePast
                onChange={(date) => setSelectedDate(date)}
              />
            </Box>
            <Box
              display='flex'
              width='100%'
              position='relative'
              borderColor='primary.dark'
              marginBottom={4}
              marginTop={2}
            >
              {times &&
                times.map((time) => (
                  <TimeSelect key={time.startTime} {...time} onSave={(value) => setSelectedTime(value)} />
                ))}
              {selectedTime && (
                <Tooltip title={`${convertDecimalToTime(selectedTime[0])} - ${convertDecimalToTime(selectedTime[1])}`}>
                  <Box
                    height={20}
                    bgcolor='secondary.light'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    fontSize={12}
                    sx={{ cursor: 'default' }}
                    position='absolute'
                    bottom='100%'
                    borderTop={1}
                    borderLeft={1}
                    borderRight={1}
                    borderColor='secondary.main'
                    left={`${(selectedTime[0] * 100) / 24}%`}
                    width={`${((selectedTime[1] - selectedTime[0]) * 100) / 24}%`}
                  >
                    {`${convertDecimalToTime(selectedTime[0])} - ${convertDecimalToTime(selectedTime[1])}`}
                  </Box>
                </Tooltip>
              )}
              {rangeTime?.map((time) => (
                <Typography
                  key={time}
                  position='absolute'
                  left={`${(time * 100) / 24}%`}
                  width='20px'
                  textAlign='center'
                  ml='-10px'
                  top='40px'
                >
                  {convertDecimalToTime(time)}
                </Typography>
              ))}
            </Box>
            {times && (
              <Box display='flex' justifyContent='center' gap={2} marginY={4}>
                <Box
                  width={120}
                  height={40}
                  fontSize={12}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  bgcolor='primary.main'
                  color='primary.contrastText'
                >
                  Còn trống
                </Box>
                <Box
                  width={120}
                  height={40}
                  fontSize={12}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  bgcolor='primary.light'
                >
                  Đã có người đặt
                </Box>
                <Box
                  width={120}
                  height={40}
                  fontSize={12}
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  bgcolor='secondary.light'
                >
                  Đang chọn
                </Box>
              </Box>
            )}
            <Box display='flex' justifyContent='center' marginBottom={4}>
              <Button
                onClick={handleNextStep}
                variant='contained'
                disabled={!selectedPitch || !selectedDate || !selectedTime}
              >
                Tiếp theo
              </Button>
            </Box>
          </>
        )}
        {step === 1 && (
          <Grid container spacing={8} marginY={4}>
            <Grid item xs={6} width='100%'>
              <StripeContainer currency='vnd' amount={totalPrice} onSubmit={handleSubmit} />
              <Button
                onClick={handleBackStep}
                variant='outlined'
                color='secondary'
                disabled={!selectedPitch || !selectedDate || !selectedTime}
              >
                Quay lại
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box display='flex' marginBottom={2}>
                <Box
                  component='img'
                  src={pitches[0].venue.imageList[0].imagePath}
                  alt='venue'
                  width='20%'
                  height='30%'
                  sx={{ objectFit: 'cover' }}
                  borderRadius={2}
                />
                <Box paddingX={2}>
                  <Typography fontWeight={500} variant='h5'>
                    {pitches[0].venue.name}
                  </Typography>
                  <Typography fontWeight={300} variant='body2' fontStyle='italic'>
                    {pitches[0].venue.address}
                  </Typography>
                </Box>
              </Box>

              <Box marginY={2}>
                <Box display='flex'>
                  <Typography fontWeight={500}>Loại:</Typography>
                  <Typography marginX={1}>{pitches?.[0].pitchCategory.name}</Typography>
                </Box>
                {selectedDate && (
                  <Box display='flex'>
                    <Typography fontWeight={500}>Ngày:</Typography>
                    <Typography marginX={1}>{dayjs(selectedDate).format('DD/MM/YYYY')}</Typography>
                  </Box>
                )}
                <Box display='flex'>
                  <Typography fontWeight={500}>Thời gian:</Typography>
                  {selectedTime && (
                    <Typography marginX={1}>
                      {convertDecimalToTime(selectedTime[0])} - {convertDecimalToTime(selectedTime[1])}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Divider sx={{ marginTop: 1 }} />
              <Box display='flex' justifyContent='space-between' paddingY={2}>
                <Typography fontWeight={500}>Giá:</Typography>
                <Typography>{selectedPitch && convertCurrency(selectedPitch.price)}</Typography>
              </Box>
              <Divider />
              <Box display='flex' justifyContent='space-between' paddingY={2}>
                <Typography fontWeight={500}>Tổng cộng:</Typography>
                <Typography fontWeight={700}>{convertCurrency(totalPrice)}</Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <ReportOutlined />
                <Typography variant='caption' marginX={1}>
                  Mọi thay đổi hoặc hủy bỏ đều do địa điểm quyết định và thường không được chấp thuận.
                </Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <ReportOutlined />
                <Typography variant='caption' marginX={1}>
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
