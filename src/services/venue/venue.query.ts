import { VenueQuery } from './venue.dto';
import { getVenue, getVenues } from './venue.service';
import { defineQuery } from '@/utils/defineQuery';

export const venueKeys = {
  all: ['venues'] as const,
  lists: () => [...venueKeys.all, 'list'] as const,
  list: (query: VenueQuery) => defineQuery([...venueKeys.lists(), query], () => getVenues(query)),
  details: () => [venueKeys.all, 'detail'] as const,
  detail: (slug?: string) =>
    defineQuery([...venueKeys.details(), slug], () => {
      if (slug) {
        return getVenue(slug);
      }
    }),
};
