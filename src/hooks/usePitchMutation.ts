import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreatePitchDto, UpdatePitchPayload } from '@/services/pitch/pitch.dto';
import { createPitch, deletePitch, updatePitch } from '@/services/pitch/pitch.service';

export const usePitchMutation = () => {
  const {
    mutate: deletePitchMutation,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    reset: resetDelete,
  } = useMutation({
    mutationKey: ['delete-pitch'],
    mutationFn: (id: number) => deletePitch(id),
    onSuccess: () => {
      toast.success('Xóa sân bóng thành công');
    },
  });

  const {
    mutate: createPitchMutation,
    isSuccess: isCreateSuccess,
    isLoading: isCreateLoading,
    reset: resetCreate,
  } = useMutation({
    mutationKey: ['create-pitch'],
    mutationFn: (data: CreatePitchDto) => createPitch(data),
    onSuccess: () => {
      toast.success('Thêm sân bóng thành công');
    },
  });

  const {
    mutate: updatePitchMutation,
    isSuccess: isUpdateSuccess,
    isLoading: isUpdateLoading,
    reset: resetUpdate,
  } = useMutation({
    mutationKey: ['update-pitch'],
    mutationFn: (payload: UpdatePitchPayload) => updatePitch(payload),
    onSuccess: () => {
      toast.success('Cập nhật sân bóng thành công');
    },
  });
  return {
    createPitchMutation,
    deletePitchMutation,
    updatePitchMutation,
    isDeleteSuccess,
    isCreateSuccess,
    isUpdateSuccess,
    isCreateLoading,
    isDeleteLoading,
    isUpdateLoading,
    resetCreate,
    resetUpdate,
    resetDelete,
  };
};
