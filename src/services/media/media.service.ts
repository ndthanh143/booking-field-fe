import { UploadImagesResponse } from './media.dto';
import axiosInstance from '@/utils/axiosConfig';

const mediaService = {
  uploadImages: async (files: FileList) => {
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
  },
  deleteImage: async (imageId: string) => {
    await axiosInstance.delete(`/upload/files/${imageId}`);
  },
};

export default mediaService;
