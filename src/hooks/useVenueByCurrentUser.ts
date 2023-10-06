import { useQuery } from '@tanstack/react-query';
import { useAuth } from '.';
import { venueKeys } from '@/services/venue/venue.query';

export const useVenueByCurrentUser = () => {
  const { profile } = useAuth();

  const queryInstance = venueKeys.currentUser();
  const { data, isLoading, refetch } = useQuery({
    ...queryInstance,
    enabled: Boolean(profile),
  });

  return { data, isLoading, refetch };
};
