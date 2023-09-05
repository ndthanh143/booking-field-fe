import { useMutation, useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SocketContext } from '@/App';
import { LoginInput } from '@/services/auth/auth.dto';
import authService from '@/services/auth/auth.service';
import { userKeys } from '@/services/user/user.query';

export const useAuth = () => {
  const navigate = useNavigate();

  const userInstance = userKeys.profile();
  const { data: profile, isLoading, refetch } = useQuery(userInstance);

  const socket = useContext(SocketContext);

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: (payload: LoginInput) => authService.login(payload),
    onSuccess: () => {
      refetch();
      navigate('/');
      socket.connect();
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
