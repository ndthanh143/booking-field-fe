import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import Push from 'push.js';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as io from 'socket.io-client';
import { LoginInput } from '@/services/auth/auth.dto';
import authService from '@/services/auth/auth.service';
import { notificationKeys } from '@/services/notification/notification.query';
import { userKeys } from '@/services/user/user.query';

export const useAuth = () => {
  const userInstance = userKeys.profile();
  const { data: profile, isLoading, refetch } = useQuery(userInstance);

  const [accessToken, setAccessToken] = useState<string | undefined>(Cookies.get('access_token'));

  console.log(accessToken);

  const [socket, setSocket] = useState<io.Socket>();

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: authService.login,
    onSuccess: ({ data }) => {
      toast.success('Login successfully');
      refetch();
      setAccessToken(data.accessToken);
    },
  });

  async function login(payload: LoginInput) {
    loginMutation(payload);
  }

  function logout() {
    authService.logout();
    socket?.disconnect();
    toast.success('Logout successfully');
    refetch();
  }

  useEffect(() => {
    const socketEv = socket?.on('booking', (message) => {
      Push.create('Thông báo đặt sân', {
        body: message,
        icon: '/logo.png',
        timeout: 4000,
      });
      queryClient.invalidateQueries(notificationKeys.lists());
    });

    return () => {
      socketEv?.off();
    };
  }, [socket]);

  useEffect(() => {
    const newSocket = io.connect(`${import.meta.env.VITE_SOCKET_API_URL}`, {
      extraHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    setSocket(newSocket);
  }, [accessToken]);

  return { profile, login, logout, isLoading, loginLoading, loginError, refetch, socket };
};
