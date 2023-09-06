import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { useAuth } from '@/hooks';
import { bookingKeys } from '@/services/booking/booking.query';

export const BookingManagement = () => {
  const { profile } = useAuth();

  const bookingInstance = bookingKeys.list({ venueId: profile?.venue.id });
  const { data: bookings } = useQuery({ ...bookingInstance, enabled: !!profile });

  const [page, setPage] = useState<number>(1);

  return (
    profile &&
    bookings && (
      <Box>
        {bookings.data.length > 0 ? (
          <Table size='small' sx={{ marginY: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Sân</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Người đặt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.data.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.pitch.name}</TableCell>
                  <TableCell>{booking.pitch.pitchCategory.name}</TableCell>
                  <TableCell>{moment(booking.startTime).format('DD-MM-YYYY ')}</TableCell>
                  <TableCell>{`${moment(booking.startTime).format('HH:mm')} - ${moment(booking.endTime).format(
                    'HH:mm',
                  )}`}</TableCell>
                  <TableCell>{`${booking.user.lastName} ${booking.user.firstName}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>Sân của bạn chưa có ai đặt !!</Typography>
        )}
        {bookings.pageInfo.pageCount > 1 && (
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={bookings.pageInfo.pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        )}
      </Box>
    )
  );
};
