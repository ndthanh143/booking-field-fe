import { PitchCategory } from '../pitch_category/pitch-category.dto';
import { Venue } from '../venue/venue.dto';
import { BaseData, BasePaginationResponse, BaseResponse, PaginationQuery } from '@/common/dtos/base.dto';

export type PitchesResponse = BasePaginationResponse<Pitch>;
export type GetPitchesByVenueResponse = BaseResponse<Pitch[]>;
export type GetPitchesByVenueDetailResponse = BaseResponse<GetPitchByVenueDetailData[]>;

export type Pitch = {
  no: number;
  price: number;
  pitchCategory: PitchCategory;
  venue: Venue;
} & BaseData;

export type GetPitchByVenueDetailData = {
  price: number;
  pitchCategory_id: number;
  name: string;
  description: string;
  thumbnail: string;
  quantity: number;
} & BaseData;

export type GetPitchesByVenueQuery = {
  pitchCategoryId?: number;
};

export type SearchPitchesQuery = {
  order?: string;
  keyword?: string;
  pitchCategory?: number;
  minPrice?: number;
  maxPrice?: number;
} & PaginationQuery;
