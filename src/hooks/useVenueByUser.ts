import { useQuery } from '@tanstack/react-query';
import { useAuth } from '.';
import { venueKeys } from '@/services/venue/venue.query';

export const useVenueByUser = () => {
  const { profile } = useAuth();

  const queryInstance = venueKeys.detail(profile?.venue.slug);
  const { data, isLoading, refetch } = useQuery({
    ...queryInstance,
    enabled: !!profile,
  });

  return { data, isLoading, profile, refetch };
};
