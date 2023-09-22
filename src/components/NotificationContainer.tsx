import { useQueryClient } from '@tanstack/react-query';
import Push from 'push.js';
import { useSocket } from '@/hooks';
import { notificationKeys } from '@/services/notification/notification.query';

export const NotificationContainer = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  socket.on('booking', (message) => {
    Push.create('Thông báo đặt sân', {
      body: message,
      icon: '/logo.svg',
      timeout: 4000,
    });
    queryClient.invalidateQueries(notificationKeys.lists());
  });

  return <></>;
};
