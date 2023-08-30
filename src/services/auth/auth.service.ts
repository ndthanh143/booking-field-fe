import Cookies from 'js-cookie';
import { LoginInput, AuthResponse, sendEmailForgotPasswordPayload, ResetPasswordPayload } from './auth.dto';
import axiosInstance from '@/utils/axiosConfig';

export const postLogin = async (payload: LoginInput) => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);

  Cookies.set('access_token', data.data.accessToken);
  Cookies.set('user', JSON.stringify(data.data.user));

  return data;
};

export const doLogout = () => {
  Cookies.remove('access_token');
  Cookies.remove('user');
};

export const getCurrentUser = () => {
  const user = Cookies.get('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const sendEmailForgotPassword = async ({ email }: sendEmailForgotPasswordPayload) => {
  const { data } = await axiosInstance.post(`/auth/forgot-password/${email}`);

  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await axiosInstance.post('/auth/email/reset-password', payload);

  return data;
};
