import { getCurrentUser } from '../auth/auth.service';
import { defineQuery } from '@/utils/defineQuery';

export const userKeys = {
  all: ['users'] as const,
  profiles: () => [...userKeys.all, 'profile'] as const,
  profile: () => defineQuery([...userKeys.profiles()], getCurrentUser),
};
