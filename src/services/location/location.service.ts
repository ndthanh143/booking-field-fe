import axios from 'axios';

export const getProvinces = async () => {
  const { data } = await axios.get('https://provinces.open-api.vn/api');

  return data;
};
