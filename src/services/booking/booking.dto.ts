import { BaseData, BaseResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BaseResponse<Booking[]>;

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
