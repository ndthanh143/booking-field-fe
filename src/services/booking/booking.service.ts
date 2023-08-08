import { BookingsResponse, GetBookingOfPitchByDayDto } from './booking.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getBookingOfPitchByDay = async (payload: GetBookingOfPitchByDayDto) => {
  const { pitchId, date } = payload;
  console.log(date);
  const { data } = await axiosInstance.get<BookingsResponse>(`/bookings/pitch?pitchId=${pitchId}&date=${date}`);

  return data.data;
};
