import {
  BookingResponse,
  BookingsResponse,
  CreateBookingDto,
  GetAnalystBookingCategoryResponse,
  GetAnalystBookingIncomeDto,
  GetAnalystBookingIncomeResponse,
  GetBookingsDto,
  UpdateBookingPayload,
} from './booking.dto';
import axiosInstance from '@/utils/axiosConfig';

const bookingService = {
  getAll: async (payload: GetBookingsDto) => {
    const { pitchId, date, page, limit, venueId, sorts } = payload;

    const { data } = await axiosInstance.get<BookingsResponse>('/bookings', {
      params: {
        pitchId,
        date,
        sorts,
        page,
        limit,
        venueId,
      },
    });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<BookingResponse>(`/bookings/${id}`);

    return data;
  },
  getAnalystBookingIncome: async (query: GetAnalystBookingIncomeDto) => {
    const { year, venueId } = query;
    const { data } = await axiosInstance.get<GetAnalystBookingIncomeResponse>('/bookings/analyst', {
      params: {
        year,
        venueId,
      },
    });

    return data.data;
  },
  getAnalystBookingCategory: async (query: GetAnalystBookingIncomeDto) => {
    const { year, venueId } = query;
    const { data } = await axiosInstance.get<GetAnalystBookingCategoryResponse>('/bookings/analyst/category', {
      params: {
        year,
        venueId,
      },
    });

    return data.data;
  },
  getUserBookings: async () => {
    const { data } = await axiosInstance.get<BookingsResponse>(`/bookings/user`);

    return data;
  },
  create: async (payload: CreateBookingDto) => {
    const { data } = await axiosInstance.post<BookingResponse>('/bookings', payload);

    return data;
  },
  update: async (payload: UpdateBookingPayload) => {
    const { id, data: updateData } = payload;

    const { data } = await axiosInstance.put<BookingResponse>(`/bookings/${id}`, updateData);

    return data;
  },
  delete: async (id: number) => {
    await axiosInstance.delete(`/bookings/${id}`);
  },
};

export default bookingService;
