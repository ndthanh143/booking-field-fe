import { GetBookingsDto } from './booking.dto';
import { getBooking, getBookings, getUserBookings } from './booking.service';
import { defineQuery } from '@/utils/defineQuery';

export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  list: (payload: GetBookingsDto) => defineQuery([...bookingKeys.lists()], () => getBookings(payload)),
  details: () => [...bookingKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...bookingKeys.details()], () => getBooking(id)),
  personals: () => [...bookingKeys.all, 'personal'] as const,
  personal: () => defineQuery([...bookingKeys.personals()], getUserBookings),
};
