import { Delete } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commonImages } from '@/assets/images/common';
import { ConfirmBox } from '@/components';
import { useAuth, useBoolean } from '@/hooks';
import { Booking } from '@/services/booking/booking.dto';
import { bookingKeys } from '@/services/booking/booking.query';
import bookingService from '@/services/booking/booking.service';
import { formatDate, formatDateToTime } from '@/utils';

export const BookingManagement = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { profile } = useAuth();

  const bookingInstance = bookingKeys.list({ venueId: profile?.venue.id });
  const { data, refetch } = useQuery({ ...bookingInstance, enabled: !!profile });

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [page, setPage] = useState<number>(1);

  const { value: isOpenConfirmBox, setFalse: closeConfirmBox, setTrue: openConfirmBox } = useBoolean(false);

  const { mutate: mutateDeleteBooking } = useMutation({
    mutationFn: (id: number) => bookingService.delete(id),
    onSuccess: () => {
      toast.success('Delete booking successfully');
      closeConfirmBox();
      refetch();
    },
  });

  const handleDeleteBooking = () => selectedBooking && mutateDeleteBooking(selectedBooking.id);

  if (!profile?.username) {
    navigate('/login', {
      state: {
        redirect: pathname,
      },
    });
  }

  return (
    profile &&
    data && (
      <Box>
        {data.data.length > 0 ? (
          <Table size='small' sx={{ marginY: 2 }}>
            <TableHead>
              <TableRow>
                <TableCell>Sân</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Thời gian</TableCell>
                <TableCell>Người đặt</TableCell>
                <TableCell>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.pitch.name}</TableCell>
                  <TableCell>{booking.pitch.pitchCategory.name}</TableCell>
                  <TableCell>{formatDate(booking.startTime)}</TableCell>
                  <TableCell>{`${formatDateToTime(booking.startTime)} - ${formatDateToTime(
                    booking.endTime,
                  )}`}</TableCell>
                  <TableCell>{`${booking.user.lastName} ${booking.user.firstName}`}</TableCell>
                  <TableCell>
                    <Box display='flex' gap={2}>
                      <IconButton
                        color='primary'
                        onClick={() => {
                          setSelectedBooking(booking);
                          openConfirmBox();
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
            <Box component='img' src={commonImages.noResult.src} alt={commonImages.noResult.name} />
            <Typography>Your venues have no booking yet!</Typography>
          </Box>
        )}
        {data.pageInfo.pageCount > 1 && (
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={data.pageInfo.pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        )}
        <ConfirmBox
          title='Bạn có chắc muốn xóa'
          subTitle='Bạn sẽ không thể khôi phục dữ liệu sau khi đã xóa'
          isOpen={isOpenConfirmBox}
          onClose={closeConfirmBox}
          onAccept={handleDeleteBooking}
        />
      </Box>
    )
  );
};
