import Cookies from 'js-cookie';
import { LoginInput, AuthResponse } from './auth.dto';
import axiosInstance from '@/utils/axiosConfig';

export const postLogin = async (payload: LoginInput) => {
  const { data } = await axiosInstance.post<AuthResponse>('auth/login', payload);

  Cookies.set('access_token', data.data.accessToken);
  Cookies.set('user', JSON.stringify(data.data.user));

  return data;
};

export const doLogout = () => {
  Cookies.remove('access_token');
  Cookies.remove('user');
};
