import { User } from '../user/user.dto';
import { BaseData, BasePaginationResponse } from '@/common/dtos/base.dto';

export type EvaluateResponse = BasePaginationResponse<Rating>;
export type GetRatingFieldResponse = BasePaginationResponse<GetRatingFieldData>;

export type Rating = {
  content: string;
  rate: number;
  booking_id: number;
} & BaseData;

export type GetRatingFieldData = Rating & {
  category_name: string;
} & User;
