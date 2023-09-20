import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;
export type PitchCategoryResponse = BaseResponse<PitchCategory>;

export type PitchCategory = {
  name: string;
  thumbnail: string;
  description: string;
} & BaseData;

export type GetPitchCategoriesQuery = {
  venueId?: number;
} & BaseQuery;
