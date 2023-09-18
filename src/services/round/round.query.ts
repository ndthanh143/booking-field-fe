import { GetRoundsQuery } from './round.dto';
import roundService from './round.service';
import { defineQuery } from '@/utils/defineQuery';

export const roundKeys = {
  all: ['round'] as const,
  lists: () => [...roundKeys.all, 'list'] as const,
  list: (query: GetRoundsQuery) => defineQuery([...roundKeys.lists(), query], () => roundService.getAll(query)),
  details: () => [...roundKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...roundKeys.details(), id], () => roundService.getOne(id)),
};
