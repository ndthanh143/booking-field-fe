import {
  BookingsResponse,
  CreateBookingDto,
  GetAnalystBookingCategoryResponse,
  GetAnalystBookingIncomeDto,
  GetAnalystBookingIncomeResponse,
  GetBookingsDto,
} from './booking.dto';
import { OrderEnum } from '@/common/enums/order.enum';
import axiosInstance from '@/utils/axiosConfig';

export const getBookings = async (payload: GetBookingsDto) => {
  const { pitchId, date, page, limit, venueId } = payload;

  const { data } = await axiosInstance.get<BookingsResponse>('/bookings', {
    params: {
      pitchId,
      date,
      sorts: [
        {
          startTime: OrderEnum.Asc,
        },
      ],
      page,
      limit,
      venueId,
    },
  });

  return data;
};

export const getAnalystBookingIncome = async (query: GetAnalystBookingIncomeDto) => {
  const { year, venueId } = query;
  const { data } = await axiosInstance.get<GetAnalystBookingIncomeResponse>('/bookings/analyst', {
    params: {
      year,
      venueId,
    },
  });

  return data.data;
};

export const getAnalystBookingCategory = async (query: GetAnalystBookingIncomeDto) => {
  const { year, venueId } = query;
  const { data } = await axiosInstance.get<GetAnalystBookingCategoryResponse>('/bookings/analyst/category', {
    params: {
      year,
      venueId,
    },
  });

  return data.data;
};

export const getBookingsOfVenue = async (venueId: number) => {
  const { data } = await axiosInstance.get<BookingsResponse>(`/bookings/venue/${venueId}`);

  return data;
};

export const createBooking = async (payload: CreateBookingDto) => {
  await axiosInstance.post('/bookings', payload);
};
