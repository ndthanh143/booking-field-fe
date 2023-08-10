import { BasePaginationResponse } from '@/common/dtos/base.dto';

export type PitchCategoriesResponse = BasePaginationResponse<PitchCategory>;

export type PitchCategory = {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
