import { useMutation, useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginInput } from '@/services/auth/auth.dto';
import { doLogout, postLogin } from '@/services/auth/auth.service';
import { User } from '@/services/user/user.dto';

function getUserInfo(): User | null {
  const user = Cookies.get('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const { data: profile, isLoading, refetch } = useQuery({ queryKey: ['profile'], queryFn: getUserInfo });

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: (payload: LoginInput) => postLogin(payload),
    onSuccess: () => {
      refetch({ queryKey: ['profile'] });
      navigate('/');
    },
  });

  async function login(payload: LoginInput) {
    loginMutation(payload);
  }

  function logout() {
    doLogout();
    toast.success('Logout successfully');
    refetch({ queryKey: ['profile'] });
  }

  return { profile, login, logout, isLoading, loginLoading, loginError };
};
