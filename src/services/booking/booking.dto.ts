import { Pitch } from '../pitch/pitch.dto';
import { Rating } from '../rating/rating.dto';
import { User } from '../user/user.dto';
import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BasePaginationResponse<Booking>;
export type BookingResponse = BaseResponse<Booking>;
export type GetAnalystBookingIncomeResponse = BaseResponse<GetAnalystBookingIncomeData[]>;
export type GetAnalystBookingCategoryResponse = BaseResponse<GetAnalystBookingCategoryData[]>;

export type Booking = {
  startTime: Date;
  endTime: Date;
  pitch: Pitch;
  user: User;
  totalPrice: number;
  rating: Rating;
} & BaseData;

export type GetBookingsDto = {
  pitchId?: number;
  date?: string;
  venueId?: number;
} & BaseQuery;

export type CreateBookingDto = {
  startTime: Date;
  endTime: Date;
  pitch: number;
};

export type GetAnalystBookingIncomeDto = {
  year: number;
  venueId: number;
};

export type GetAnalystBookingIncomeData = {
  day: number;
  total: number;
};

export type GetAnalystBookingCategoryData = {
  pitchCategoryId: number;
  category: string;
  total: number;
};
