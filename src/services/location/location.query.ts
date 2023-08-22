import { getProvinces } from './location.service';
import { defineQuery } from '@/utils/defineQuery';

export const locationKeys = {
  all: ['provinces'] as const,
  lists: () => [...locationKeys.all, 'list'] as const,
  list: () => defineQuery([...locationKeys.lists()], () => getProvinces()),
};
