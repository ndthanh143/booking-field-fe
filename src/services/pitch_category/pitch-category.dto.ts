import { BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;
export type PitchCategoryResponse = BaseResponse<PitchCategory>;

export type PitchCategory = {
  _id: number;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
