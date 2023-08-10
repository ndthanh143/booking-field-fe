import { BaseData, BasePaginationResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BasePaginationResponse<Booking>;

export type Booking = {
  startTime: Date;
  endTime: Date;
  pitch_id: number;
  user_id: number;
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
