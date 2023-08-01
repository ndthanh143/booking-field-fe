import { Category } from '../category/category.dto';
import { Field } from '../field/field.dto';
import { BaseData, BasePaginationResponse } from '@/common/dtos/base.dto';

export type SubFieldsResponse = BasePaginationResponse<SubField>;
export type GetSubFieldByFieldResponse = BasePaginationResponse<GetSubFieldByFieldData>;

export type SubField = {
  no: number;
  price: number;
  category: Category;
  field: Field;
} & BaseData;

export type GetSubFieldByFieldData = {
  price: number;
  category_id: number;
  name: string;
  description: string;
  thumbnail: string;
  quantity: number;
};
