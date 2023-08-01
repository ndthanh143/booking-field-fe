import { FieldResponse, FieldsResponse, SearchFieldQuery, SearchFieldResponse } from './field.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getFields = async (query: SearchFieldQuery) => {
  const { keyword } = query;

  const { data } = await axiosInstance.get<FieldsResponse>('/fields', {
    params: {
      keyword,
    },
  });

  return data;
};

export const getField = async () => {
  const { data } = await axiosInstance.get<FieldResponse>('/fields/1');

  return data.data;
};

export const searchFields = async (query: SearchFieldQuery) => {
  const { keyword, category, minPrice, maxPrice, order, page, limit } = query;

  const { data } = await axiosInstance.get<SearchFieldResponse>(
    `/fields/search?location=${keyword}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&order=${order}&page=${page}&limit=${limit}`,
  );

  return data;
};
