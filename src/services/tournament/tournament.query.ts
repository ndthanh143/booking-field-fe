import tournamentService from './tournament.service';
import { BaseQuery } from '@/common/dtos/base.dto';
import { defineQuery } from '@/utils/defineQuery';

export const tournamentKeys = {
  all: ['tournaments'] as const,
  lists: () => [...tournamentKeys.all, 'list'] as const,
  list: (query: BaseQuery) => defineQuery([...tournamentKeys.lists()], () => tournamentService.getAll(query)),
  details: () => [...tournamentKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...tournamentKeys.details()], () => tournamentService.getOne(id)),
};
