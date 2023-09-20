import { CreditCard, People } from '@mui/icons-material';
import { Box, Card, CardContent, Grid, MenuItem, Select, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CategoryScale, ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect, useMemo, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { TimePeriodFilter } from '@/common/enums/filter-chart.enum';
import { useVenueByUser } from '@/hooks';
import { GetAnalystBookingIncomeDto } from '@/services/booking/booking.dto';
import { bookingKeys } from '@/services/booking/booking.query';
import bookingService from '@/services/booking/booking.service';
import { convertCurrency, getMonthsAgo } from '@/utils';

ChartJS.register(CategoryScale);

export const FilterChartOptions = [
  { label: '1 tháng gần nhất', value: TimePeriodFilter.Month },
  { label: '3 tháng gần nhất', value: TimePeriodFilter.Quarter },
  { label: '6 tháng gần nhất', value: TimePeriodFilter.HalfYear },
  { label: '1 năm gần nhất', value: TimePeriodFilter.Year },
];

const currentDate = new Date();
export const Dashboard = () => {
  const { data: venue } = useVenueByUser();

  const bookingInstance = bookingKeys.list({ venueId: venue?.id });
  const { data: bookings } = useQuery({
    ...bookingInstance,
    enabled: !!venue,
  });

  const { data: incomeData, mutate: getBookingIncomeMutation } = useMutation({
    mutationFn: (payload: GetAnalystBookingIncomeDto) => bookingService.getAnalystBookingIncome(payload),
  });

  const { data: categoryData, mutate: getBookingCategoryMutation } = useMutation({
    mutationFn: (payload: GetAnalystBookingIncomeDto) => bookingService.getAnalystBookingCategory(payload),
  });

  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [selectedIncome, setSelectedIncome] = useState<TimePeriodFilter>(FilterChartOptions[0].value);

  const currentFilterDate = currentDate;
  currentFilterDate.setFullYear(year);
  const filteData = incomeData?.filter(
    (item) =>
      new Date(item.day) > getMonthsAgo(currentFilterDate, selectedIncome) && new Date(item.day) < currentFilterDate,
  );

  const listFiveYearFromNow = useMemo(() => Array.from(Array(5), (_, index) => currentDate.getFullYear() - index), []);

  const lineData: ChartData<'line'> = {
    labels: filteData?.map((item) => `${item.day}`),
    datasets: [
      {
        label: 'Thu nhập thường ngày',
        data: filteData?.map((item) => item.total) || [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const lineOptions: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieData: ChartData<'pie'> = {
    labels: categoryData?.map((item) => item.category) || [],
    datasets: [
      {
        label: 'Số lần đặt sân',
        data: categoryData?.map((item) => item.total) || [],
        backgroundColor: [
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions: ChartOptions<'pie'> = {};

  useEffect(() => {
    if (venue) {
      getBookingIncomeMutation({ year, venueId: venue.id });
      getBookingCategoryMutation({ year, venueId: venue.id });
    }
  }, [getBookingIncomeMutation, getBookingCategoryMutation, venue, year, selectedIncome]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundImage: 'linear-gradient(to right, #0606ab, #4f4fff)', color: 'primary.contrastText' }}>
          <CardContent>
            <CreditCard />
            <Box>
              <CountUp end={bookings?.data.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0} duration={1} />đ{' '}
            </Box>
            <Typography variant='body2'>Tổng thu nhập</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ backgroundImage: 'linear-gradient(to right, #025e38, #18bb78)', color: 'primary.contrastText' }}>
          <CardContent>
            <People />
            <Typography>
              <CountUp end={bookings?.data.length || 0} duration={1} />
            </Typography>
            <Typography variant='body2'>Số lượng đơn đặt sân</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8} minHeight={{ md: 300, lg: '75vh' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography fontWeight={500}>Thu nhập hàng tháng</Typography>
            <Typography variant='caption' fontStyle='italic' fontWeight={200}>
              Tổng thu nhập theo từng tháng
            </Typography>
            <Box display='flex' gap={2}>
              <Select
                labelId='year-select'
                id='year-select'
                sx={{ minWidth: 150 }}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {listFiveYearFromNow.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId='filter-select'
                id='filter-select'
                value={selectedIncome}
                sx={{ minWidth: 150 }}
                onChange={(e) => setSelectedIncome(e.target.value as TimePeriodFilter)}
              >
                {FilterChartOptions.map((item) => (
                  <MenuItem value={item.value} key={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Typography paddingTop={2}>
              Tổng: {convertCurrency(filteData?.reduce((acc, cur) => acc + cur.total, 0) || 0)}
            </Typography>
            <Line data={lineData} options={lineOptions} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} minHeight={{ md: 300, lg: '75vh' }}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography textAlign='center' fontWeight={500} paddingBottom={4}>
              Thống kê số lượng sân được sử dụng
            </Typography>
            <Pie data={pieData} options={pieOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
