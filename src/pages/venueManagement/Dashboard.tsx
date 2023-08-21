import { CreditCard, People } from '@mui/icons-material';
import { Autocomplete, Box, Card, CardContent, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';

import { useMutation, useQuery } from '@tanstack/react-query';
import { CategoryScale, ChartData, ChartOptions } from 'chart.js';
import { Chart as ChartJS } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import CountUp from 'react-countup';
import { TimePeriodFilter } from '@/common/enums/filter-chart.enum';
import { useVenueByUserQuery } from '@/hooks';
import { GetAnalystBookingIncomeDto } from '@/services/booking/booking.dto';
import { getAnalystBookingCategory, getAnalystBookingIncome, getBookings } from '@/services/booking/booking.service';
import { convertCurrency } from '@/utils/convertCurrency';
import { getMonthsAgoFromDate } from '@/utils/getMonthsAgo';

ChartJS.register(CategoryScale);

export const FilterChartOptions = [
  { label: '1 tháng gần nhất', value: TimePeriodFilter.Month },
  { label: '3 tháng gần nhất', value: TimePeriodFilter.Quarter },
  { label: '6 tháng gần nhất', value: TimePeriodFilter.HalfYear },
  { label: '1 năm gần nhất', value: TimePeriodFilter.Year },
];

const currentDate = new Date();
export const Dashboard = () => {
  const { data: venue } = useVenueByUserQuery();

  const { data: bookings } = useQuery({
    queryKey: ['venue-bookings'],
    queryFn: () => {
      if (venue) {
        return getBookings({ venueId: venue._id });
      }
    },
    enabled: !!venue,
  });

  const { data: incomeData, mutate: getBookingIncomeMutation } = useMutation({
    mutationFn: (payload: GetAnalystBookingIncomeDto) => getAnalystBookingIncome(payload),
  });

  const { data: categoryData, mutate: getBookingCategoryMutation } = useMutation({
    mutationFn: (payload: GetAnalystBookingIncomeDto) => getAnalystBookingCategory(payload),
  });

  const [year, setYear] = useState<number>(currentDate.getFullYear());
  const [selectedIncome, setSelectedIncome] = useState<TimePeriodFilter>(FilterChartOptions[0].value);

  const currentFilterDate = currentDate;
  currentFilterDate.setFullYear(year);
  const filteData = incomeData?.filter(
    (item) =>
      new Date(item.day) > getMonthsAgoFromDate(currentFilterDate, selectedIncome) &&
      new Date(item.day) < currentFilterDate,
  );

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
      getBookingIncomeMutation({ year, venueId: venue._id });
      getBookingCategoryMutation({ year, venueId: venue._id });
    }
  }, [getBookingIncomeMutation, getBookingCategoryMutation, venue, year]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
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
      <Grid item xs={4}>
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
      <Grid item xs={4}></Grid>
      <Grid item xs={8} minHeight='75vh'>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Typography fontWeight={500}>Thu nhập hàng tháng</Typography>
            <Typography variant='caption' fontStyle='italic' fontWeight={200}>
              Tổng thu nhập theo từng tháng
            </Typography>
            <Box display='flex' gap={2}>
              <Autocomplete
                disablePortal
                options={[2018, 2019, 2020, 2021, 2022, 2023]}
                defaultValue={currentDate.getFullYear()}
                sx={{ minWidth: 150 }}
                itemType='number'
                onInputChange={(_, value) => setYear(Number(value))}
                renderInput={(params) => <TextField {...params} />}
              />
              <Select
                labelId='filter-select'
                id='filter-select'
                value={selectedIncome}
                label='Lọc'
                sx={{ minWidth: 150 }}
                onChange={(e) => setSelectedIncome(e.target.value as TimePeriodFilter)}
              >
                {FilterChartOptions.map((item) => (
                  <MenuItem value={item.value}>{item.label}</MenuItem>
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
      <Grid item xs={4} minHeight='75vh'>
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
