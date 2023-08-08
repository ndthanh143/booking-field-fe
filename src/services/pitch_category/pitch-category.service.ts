import { PitchCategoriesResponse } from './pitch-category.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getAllCategories = async () => {
  const { data } = await axiosInstance.get<PitchCategoriesResponse>('/pitch-categories');

  return data;
};
