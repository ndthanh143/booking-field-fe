import { BasePaginationResponse } from '@/common/dtos/base.dto';

export type CategoriesResponse = BasePaginationResponse<Category>;

export type Category = {
  _id: string;
  name: string;
  thumbnail: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
