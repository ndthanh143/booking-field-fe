import Cookies from 'js-cookie';
import { AuthResponse } from '../auth/auth.dto';
import { ChangePasswordPayload, SignInPayload, UpdateUserData, UpdateUserResponse } from './user.dto';
import axiosInstance from '@/utils/axiosConfig';

const userService = {
  register: async (payload: SignInPayload) => {
    const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);

    Cookies.set('access_token', data.data.accessToken);
    Cookies.set('user', JSON.stringify(data.data.user));
  },
  updateUserInfo: async (id: number, payload: UpdateUserData) => {
    const { data } = await axiosInstance.put<UpdateUserResponse>(`/users/${id}`, payload);

    Cookies.set('user', JSON.stringify(data.data));

    return data;
  },
  changePassword: async (payload: ChangePasswordPayload) => {
    const { currentPassword, newPassword } = payload;

    const { data } = await axiosInstance.post('/users/change-password', { currentPassword, newPassword });

    return data;
  },
};

export default userService;
