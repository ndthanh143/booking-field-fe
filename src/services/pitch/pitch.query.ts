import { PitchesQuery } from './pitch.dto';
import pitchService from './pitch.service';
import { defineQuery } from '@/utils/defineQuery';

export const pitchKeys = {
  all: ['pitches'] as const,
  lists: () => [...pitchKeys.all, 'list'] as const,
  list: (query: PitchesQuery) => defineQuery([...pitchKeys.lists()], () => pitchService.getAll(query)),
  details: () => [...pitchKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...pitchKeys.details()], () => pitchService.getOne(id)),
};
