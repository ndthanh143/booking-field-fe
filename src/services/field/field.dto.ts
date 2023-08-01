import { SubField } from '../sub-field/sub-field.dto';
import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';

export type FieldsResponse = BasePaginationResponse<Field>;
export type FieldResponse = BaseResponse<Field>;
export type SearchFieldResponse = BasePaginationResponse<SearchFieldData>;

export type SearchFieldQuery = {
  page?: number;
  limit?: number;
  order?: string;
  keyword?: string;
  category?: number;
  minPrice?: number;
  maxPrice?: number;
};

export type Field = {
  name: string;
  description: string;
  location: Location;
  address: string;
  province: string;
  district: string;
  price: Price;
  rating: number;
  totalReview: number;
  subFields: SubField[];
  imageList: FieldImage[];
  openAt: string;
  closeAt: string;
  slug: string;
} & BaseData;

export type Location = {
  lat: number;
  lng: number;
};

export type Price = {
  type: string;
  pricePerHour: number;
};

export type SearchFieldData = Field & {
  price: number;
  category_id: number;
};

export type FieldImage = {
  imagePath: string;
};
