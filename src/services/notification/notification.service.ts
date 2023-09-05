import { NotificationResponse, NotificationsResponse, getNotificationsQuery } from './notification.dto';
import axiosInstance from '@/utils/axiosConfig';

const notificationService = {
  async getAll(query: getNotificationsQuery) {
    const { data } = await axiosInstance.get<NotificationsResponse>('/notifications', { params: query });

    return data;
  },

  async getOne(id: number) {
    const { data } = await axiosInstance.get<NotificationResponse>(`/notifications/${id}`);

    return data.data;
  },
};

export default notificationService;
