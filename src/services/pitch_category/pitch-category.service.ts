import { PitchCategoriesResponse, PitchCategoryResponse } from './pitch-category.dto';
import axiosInstance from '@/utils/axiosConfig';

const pitchCategoryService = {
  getAll: async () => {
    const { data } = await axiosInstance.get<PitchCategoriesResponse>('/pitch-categories');

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<PitchCategoryResponse>(`/pitch-categories/${id}`);

    return data.data;
  },
};

export default pitchCategoryService;
