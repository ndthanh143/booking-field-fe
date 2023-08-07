import { ReportOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Stepper, TimeSelection } from '@/components';
import StripeContainer from '@/components/StripeContainer';
import { useBoolean } from '@/hooks';
import { convertDecimalToTime } from '@/utils/formatTime';
import { formatDate } from '@/utils/fortmatDate';

interface TimeInterval {
  id: number;
  startTime: number;
  endTime: number;
}

const bookings: TimeInterval[] = [
  { id: 1, startTime: 0, endTime: 2 },
  { id: 2, startTime: 12, endTime: 14 },
  { id: 3, startTime: 21, endTime: 23 },
];

function findFreeTime(intervals: TimeInterval[]): TimeInterval[] {
  // Sort the intervals by their start times
  intervals.sort((a, b) => a.startTime - b.startTime);

  const freeTimeIntervals: TimeInterval[] = intervals.reduce(
    (acc: TimeInterval[], interval: TimeInterval, index: number, intervals: TimeInterval[]) => {
      const { startTime, endTime } = interval;

      if (index === 0) {
        // Handle the case where the first interval starts after 0
        if (startTime > 0) {
          acc.push({
            id: -1, // You can set the id to a unique value for free time intervals if needed
            startTime: 0,
            endTime: startTime,
          });
        }
      } else {
        const previousInterval = intervals[index - 1];
        const previousEndTime = previousInterval.endTime;

        if (startTime > previousEndTime) {
          // Found a free time interval
          acc.push({
            id: -1, // You can set the id to a unique value for free time intervals if needed
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
  const lastInterval = intervals[intervals.length - 1];
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

interface TimeSelectProps extends TimeInterval {
  onSave: (value: number[]) => void;
}

const TimeSelect = ({ onSave, startTime, endTime, id }: TimeSelectProps) => {
  const isFreeTime = id === -1;
  const { value, setTrue, setFalse } = useBoolean();

  return (
    <>
      <Box
        key={startTime}
        height='40px'
        display='flex'
        width={`${((endTime - startTime) * 100) / 24}%`}
        bgcolor={isFreeTime ? 'primary.main' : 'primary.light'}
        position='relative'
        sx={{
          ':hover': isFreeTime
            ? {
                border: 1,
                borderColor: 'primary.dark',
                bgcolor: 'primary.dark',
                boxShadow: 10,
              }
            : {},
          cursor: isFreeTime ? 'pointer' : 'not-allowed',
        }}
        onClick={setTrue}
      />
      <TimeSelection isOpen={value} onClose={setFalse} onSave={onSave} timeRange={[startTime, endTime]} />
    </>
  );
};

export const Booking = () => {
  const stepList = ['Tùy chọn', 'Thông tin cá nhân', 'Thanh toán', 'Hoàn tất'];
  const [step, setStep] = useState(0);
  const times = findFreeTime(bookings);

  const rangeTime = times.reduce<number[]>(
    (arr, time, index) =>
      index !== times.length - 1 ? [...arr, time.startTime] : [...arr, time.startTime, time.endTime],
    [],
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [timeSelect, setTimeSelect] = useState<number[] | null>(null);
  const [timeRange, setTimeRange] = useState<number[] | null>(null);
  const [selectedPitch, setSelectedPitch] = useState(1);

  console.log('timeRange', timeRange);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleBackStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <Box minHeight='100vh'>
      <Stepper steps={stepList} activeStep={step} sx={{ marginY: 4 }} />
      {step === 0 && (
        <>
          <Typography textAlign='center' variant='h5' marginY={4}>
            Loại sân: Sân 5
          </Typography>
          <Grid container spacing={4}>
            {Array.from(Array(5).keys()).map((index) => (
              <Grid item xs={3} position='relative'>
                <Box onClick={() => setSelectedPitch(index)}>
                  <Box
                    component='img'
                    src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                    width='100%'
                    height='100%'
                    borderRadius={4}
                    sx={{
                      objectFit: 'cover',
                      cursor: 'pointer',
                      opacity: index === selectedPitch ? 1 : 0.5,
                      ':hover': {
                        opacity: 1,
                      },
                      boxShadow: index === selectedPitch ? 10 : 0,
                    }}
                  />
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
          {/*  */}
          <Box display='flex' width='100%' position='relative' border={1} borderColor='primary.dark' marginBottom={4}>
            {times.map((time) => (
              <TimeSelect key={time.startTime} {...time} onSave={(value) => setTimeSelect(value)} />
            ))}
            {rangeTime.map((time) => (
              <Typography
                key={time}
                position='absolute'
                left={`${(time * 100) / 24}%`}
                width='20px'
                textAlign='center'
                ml='-10px'
                top='40px'
              >
                {time}h
              </Typography>
            ))}
          </Box>
          <Box display='flex' justifyContent='center' marginTop={8} marginBottom={4}>
            <Button onClick={handleNextStep} variant='contained'>
              Tiếp theo
            </Button>
          </Box>
        </>
      )}
      {step === 1 && (
        <Grid container spacing={8} marginY={4}>
          <Grid item xs={6} width='100%'>
            <StripeContainer />
          </Grid>
          <Grid item xs={6}>
            <Box display='flex' marginBottom={2}>
              <Box
                component='img'
                src='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'
                alt='field'
                width='20%'
                height='30%'
                sx={{ objectFit: 'cover' }}
                borderRadius={2}
              />
              <Box paddingX={2}>
                <Typography fontWeight={500} variant='h5'>
                  Cheetwood Primary Astro - Football Pitches
                </Typography>
                <Typography fontWeight={300} variant='body2' fontStyle='italic'>
                  Waterloo Road, Cheetham Hill, Lower Broughton, M8 8EJ
                </Typography>
              </Box>
            </Box>

            <Box marginY={2}>
              <Box display='flex'>
                <Typography fontWeight={500}>Loại:</Typography>
                <Typography marginX={1}>Sân 5</Typography>
              </Box>
              {selectedDate && (
                <Box display='flex'>
                  <Typography fontWeight={500}>Ngày:</Typography>
                  <Typography marginX={1}>{formatDate(selectedDate, 'MM/DD/YYYY')}</Typography>
                </Box>
              )}
              <Box display='flex'>
                <Typography fontWeight={500}>Thời gian:</Typography>
                {timeSelect && (
                  <Typography marginX={1}>
                    {convertDecimalToTime(timeSelect[0])} - {convertDecimalToTime(timeSelect[1])}
                  </Typography>
                )}
              </Box>
            </Box>
            <Divider sx={{ marginTop: 1 }} />
            <Box display='flex' justifyContent='space-between' paddingY={2}>
              <Typography fontWeight={500}>Giá:</Typography>
              <Typography>120000đ</Typography>
            </Box>
            <Divider />
            <Box display='flex' justifyContent='space-between' paddingY={2}>
              <Typography fontWeight={500}>Tổng cộng:</Typography>
              <Typography fontWeight={700}>240000đ</Typography>
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
  );
};
