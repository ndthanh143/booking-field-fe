import { GetBookingsDto } from './booking.dto';
import bookingService from './booking.service';
import { defineQuery } from '@/utils/defineQuery';

export const bookingKeys = {
  all: ['bookings'] as const,
  lists: () => [...bookingKeys.all, 'list'] as const,
  list: (payload: GetBookingsDto) => defineQuery([...bookingKeys.lists()], () => bookingService.getAll(payload)),
  details: () => [...bookingKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...bookingKeys.details()], () => bookingService.getOne(id)),
  personals: () => [...bookingKeys.all, 'personal'] as const,
  personal: () => defineQuery([...bookingKeys.personals()], bookingService.getUserBookings),
};
