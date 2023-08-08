import { CategoriesResponse } from './category.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get<CategoriesResponse>('/categories');

  return data;
};
