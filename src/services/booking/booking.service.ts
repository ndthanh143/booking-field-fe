import { BookingsResponse, CreateBookingDto, GetBookingOfPitchByDayDto } from './booking.dto';
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

export const getBookingOfVenue = async (venueId: number) => {
  const { data } = await axiosInstance.get<BookingsResponse>(`/bookings/venue/${venueId}`);

  return data;
};

export const createBooking = async (payload: CreateBookingDto) => {
  await axiosInstance.post('/bookings', payload);
};
