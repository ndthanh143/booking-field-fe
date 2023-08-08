import Cookies from 'js-cookie';
import { AuthResponse } from '../auth/auth.dto';
import { SignInPayload } from './user.dto';
import axiosInstance from '@/utils/axiosConfig';

export const postRegister = async (payload: SignInPayload) => {
  const { data } = await axiosInstance.post<AuthResponse>('auth/register', payload);

  Cookies.set('access_token', data.data.accessToken);
  Cookies.set('user', JSON.stringify(data.data.user));
};

export const getCurrentUser = async () => {
  const token = Cookies.get('access_token');

  if (token) {
    const { data } = await axiosInstance.get('user/me', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    return data;
  }

  return null;
};
