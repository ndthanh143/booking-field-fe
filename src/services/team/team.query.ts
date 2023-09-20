import { GetTeamsQuery } from './team.dto';
import teamService from './team.service';
import { defineQuery } from '@/utils/defineQuery';

export const teamKeys = {
  all: ['teams'] as const,
  lists: () => [...teamKeys.all, 'list'] as const,
  list: (query: GetTeamsQuery) => defineQuery([...teamKeys.lists()], () => teamService.getAll(query)),
  details: () => [...teamKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...teamKeys.details()], () => teamService.getOne(id)),
};
