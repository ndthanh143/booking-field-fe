import { Pitch } from '../pitch/pitch.dto';
import { Rating } from '../rating/rating.dto';
import { BaseData, BasePaginationResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BasePaginationResponse<Booking>;
export type UserBookingsResponse = BasePaginationResponse<BookingData>;

export type Booking = {
  startTime: Date;
  endTime: Date;
  pitch_id: number;
  user_id: number;
} & BaseData;

export type BookingData = {
  startTime: Date;
  endTime: Date;
  pitch: Pitch;
  rating: Rating;
} & BaseData;

export type GetBookingOfPitchByDayDto = {
  pitchId: number;
  date: string;
};

export type CreateBookingDto = {
  startTime: Date;
  endTime: Date;
  pitch: number;
};
