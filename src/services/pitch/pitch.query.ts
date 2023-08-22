import { PitchesQuery } from './pitch.dto';
import { getPitch, getPitches } from './pitch.service';
import { defineQuery } from '@/utils/defineQuery';

export const pitchKeys = {
  all: ['pitches'] as const,
  lists: () => [...pitchKeys.all, 'list'] as const,
  list: (query: PitchesQuery) => defineQuery([...pitchKeys.lists()], () => getPitches(query)),
  details: () => [...pitchKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...pitchKeys.details()], () => getPitch(id)),
};
