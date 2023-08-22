import { GetRatingsQuery } from './rating.dto';
import { getRating, getRatings } from './rating.service';
import { defineQuery } from '@/utils/defineQuery';

export const ratingKeys = {
  all: ['ratings'] as const,
  lists: () => [...ratingKeys.all, 'list'] as const,
  list: (query: GetRatingsQuery) => defineQuery([...ratingKeys.lists()], () => getRatings(query)),
  details: () => [...ratingKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...ratingKeys.details()], () => getRating(id)),
};
