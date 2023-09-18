import { GetMatchesQuery } from './match.dto';
import matchService from './match.service';
import { defineQuery } from '@/utils/defineQuery';

export const matchKeys = {
  all: ['match'] as const,
  lists: () => [...matchKeys.all, 'list'] as const,
  list: (query: GetMatchesQuery) => defineQuery([...matchKeys.lists(), query], () => matchService.getAll(query)),
  details: () => [...matchKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...matchKeys.details()], () => matchService.getOne(id)),
};
