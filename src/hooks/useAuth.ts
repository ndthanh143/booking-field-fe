import { LoginInput } from '@/services/auth/auth.dto';
import { doLogout, postLogin } from '@/services/auth/auth.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '@/services/user/user.dto';
import Cookies from 'js-cookie';

function getUserInfo(): User | null {
  const user = Cookies.get('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({ queryKey: ['profile'], queryFn: () => getUserInfo() });

  const {
    mutate: loginMutation,
    isLoading: loginLoading,
    isError: loginError,
  } = useMutation({
    mutationFn: (payload: LoginInput) => postLogin(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      navigate('/');
    },
  });

  async function login(payload: LoginInput) {
    loginMutation(payload);
  }

  function logout() {
    doLogout();
  }

  return { profile, login, logout, isLoading, loginLoading, loginError };
};
