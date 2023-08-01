import { GetSubFieldByFieldResponse } from './sub-field.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getSubFieldsByField = async (fieldId: string) => {
  const { data } = await axiosInstance.get<GetSubFieldByFieldResponse>(`/sub-fields/field/${fieldId}`);

  return data.data;
};
