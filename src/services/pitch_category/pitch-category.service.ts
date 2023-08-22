import { PitchCategoriesResponse, PitchCategoryResponse } from './pitch-category.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getPitchCategories = async () => {
  const { data } = await axiosInstance.get<PitchCategoriesResponse>('/pitch-categories');

  return data;
};

export const getPitchCategory = async (id: number) => {
  const { data } = await axiosInstance.get<PitchCategoryResponse>(`/pitch-categories/${id}`);

  return data.data;
};
