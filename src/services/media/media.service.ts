import { UploadImagesResponse } from './media.dto';
import axiosInstance from '@/utils/axiosConfig';

export const uploadImages = async (files: FileList) => {
  const body = new FormData();

  for (let i = 0; i < files.length; i++) {
    body.append('files', files[i]);
  }

  const { data } = await axiosInstance.post<UploadImagesResponse>('/upload/files', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.data;
};

export const deleteImage = async (imageId: string) => {
  await axiosInstance.delete(`/upload/files/${imageId}`);
};
