import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { CreatePitchDto, UpdatePitchPayload } from '@/services/pitch/pitch.dto';
import pitchService from '@/services/pitch/pitch.service';

export const usePitchMutation = () => {
  const {
    mutate: deletePitchMutation,
    isSuccess: isDeleteSuccess,
    isLoading: isDeleteLoading,
    reset: resetDelete,
  } = useMutation({
    mutationFn: (id: number) => pitchService.delete(id),
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
    mutationFn: (data: CreatePitchDto) => pitchService.create(data),
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
    mutationFn: (payload: UpdatePitchPayload) => pitchService.update(payload),
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
