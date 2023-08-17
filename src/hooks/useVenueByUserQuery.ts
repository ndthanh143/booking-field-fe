import { useQuery } from '@tanstack/react-query';
import { useAuth } from '.';
import { getVenueByUser } from '@/services/venue/venue.service';

export const useVenueByUserQuery = () => {
  const { profile } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['venue'],
    queryFn: () => {
      if (profile) {
        return getVenueByUser(profile._id);
      }
    },
    enabled: !!profile,
  });

  return { data, isLoading, profile, refetch };
};
