import { BookingsResponse, CreateBookingDto, GetBookingOfPitchByDayDto, UserBookingsResponse } from './booking.dto';
import { OrderEnum } from '@/common/enums/order.enum';
import axiosInstance from '@/utils/axiosConfig';

export const getBookingOfPitchByDay = async (payload: GetBookingOfPitchByDayDto) => {
  const { pitchId, date } = payload;

  const { data } = await axiosInstance.get<BookingsResponse>('/bookings', {
    params: {
      pitchId,
      date,
      sorts: [
        {
          startTime: OrderEnum.Asc,
        },
      ],
    },
  });

  return data;
};

export const createBooking = async (payload: CreateBookingDto) => {
  await axiosInstance.post('/bookings', payload);
};

export const getUserBookings = async (id: number) => {
  const { data } = await axiosInstance.get<UserBookingsResponse>(`/bookings/user/${id}`);

  return data;
};
