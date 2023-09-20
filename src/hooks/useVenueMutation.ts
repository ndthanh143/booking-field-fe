import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UpdateVenuePayload } from '@/services/venue/venue.dto';
import { venueKeys } from '@/services/venue/venue.query';
import venueService from '@/services/venue/venue.service';

export const useVenueMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateVenueMutation,
    isLoading: isUpdating,
    reset: resetUpdateState,
  } = useMutation({
    mutationFn: ({ id, data }: UpdateVenuePayload) => venueService.update({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(venueKeys.details());
      toast.success('Cập nhật thông tin sân thành công');
    },
  });

  return { updateVenueMutation, isUpdating, resetUpdateState };
};
