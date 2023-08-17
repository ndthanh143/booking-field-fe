import { Pitch } from '../pitch/pitch.dto';
import { User } from '../user/user.dto';
import { BaseData, BasePaginationResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BasePaginationResponse<Booking>;

export type Booking = {
  startTime: Date;
  endTime: Date;
  pitch: Pitch;
  user: User;
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
