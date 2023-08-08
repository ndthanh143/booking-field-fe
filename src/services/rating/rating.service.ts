import { GetRatingFieldResponse } from './rating.dto';
import { PaginationQuery } from '@/common/dtos/base.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getRatingsByField = async (fieldId: string, query: PaginationQuery) => {
  const { page, limit } = query;

  const { data } = await axiosInstance.get<GetRatingFieldResponse>(
    `/ratings/field/${fieldId}?page=${page}&limit=${limit}`,
  );

  return data;
};
