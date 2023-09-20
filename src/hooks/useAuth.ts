import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSocket } from '.';
import { LoginInput } from '@/services/auth/auth.dto';
import authService from '@/services/auth/auth.service';
import { userKeys } from '@/services/user/user.query';

export const useAuth = () => {
  const userInstance = userKeys.profile();
  const { data: profile, isLoading, refetch } = useQuery(userInstance);

  const { socket } = useSocket();

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: () => {
      window.location.href = '/';
      refetch();
    },
  });

  async function login(payload: LoginInput) {
    loginMutation(payload);
  }

  function logout() {
    authService.logout();
    socket.disconnect();
    toast.success('Logout successfully');
    refetch();
  }

  return { profile, login, logout, isLoading, loginLoading, loginError, refetch };
};
