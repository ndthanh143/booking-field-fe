import { Pitch } from '../pitch/pitch.dto';
import { User } from '../user/user.dto';
import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type BookingsResponse = BasePaginationResponse<Booking>;
export type GetAnalystBookingIncomeResponse = BaseResponse<GetAnalystBookingIncomeData[]>;
export type GetAnalystBookingCategoryResponse = BaseResponse<GetAnalystBookingCategoryData[]>;
import { Rating } from '../rating/rating.dto';

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
  page?: number;
  limit?: number;
  venueId?: number;
};

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
