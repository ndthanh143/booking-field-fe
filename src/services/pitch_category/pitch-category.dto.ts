import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;
export type PitchCategoryResponse = BaseResponse<PitchCategory>;

export type PitchCategory = {
  name: string;
  thumbnail: string;
  description: string;
} & BaseData;
