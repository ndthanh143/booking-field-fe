import Cookies from 'js-cookie';
import { User } from '../user/user.dto';
import { LoginInput, AuthResponse, sendEmailForgotPasswordPayload, ResetPasswordPayload } from './auth.dto';
import axiosInstance from '@/utils/axiosConfig';

const authService = {
  login: async (payload: LoginInput) => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);

    Cookies.set('access_token', data.data.accessToken);
    Cookies.set('user', JSON.stringify(data.data.user));

    return data;
  },
  logout: () => {
    Cookies.remove('access_token');
    Cookies.remove('user');
  },
  getCurrentUser: (): User | null => {
    const user = Cookies.get('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  },
  sendEmailForgotPassword: async ({ email }: sendEmailForgotPasswordPayload) => {
    const { data } = await axiosInstance.post(`/auth/forgot-password/${email}`);

    return data;
  },
  resetPassword: async (payload: ResetPasswordPayload) => {
    const { data } = await axiosInstance.post('/auth/email/reset-password', payload);

    return data;
  },
};

export default authService;
