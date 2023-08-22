import axios from 'axios';
import { ProvincesData } from './location.dto';

export const getProvinces = async () => {
  const { data } = await axios.get<ProvincesData[]>('https://provinces.open-api.vn/api/?depth=2');

  return data;
};
