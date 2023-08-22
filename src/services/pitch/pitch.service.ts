import {
  CreatePitchDto,
  GetPitchesByVenueDetailResponse,
  PitchResponse,
  PitchesResponse,
  PitchesQuery,
  UpdatePitchPayload,
} from './pitch.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getPitches = async (query: PitchesQuery) => {
  const { keyword, pitchCategoryId, venueId, minPrice, maxPrice, order, page, limit } = query;

  const { data } = await axiosInstance.get<PitchesResponse>(`/pitches`, {
    params: {
      location: keyword,
      pitchCategoryId,
      venueId,
      minPrice,
      maxPrice,
      page,
      limit,
      sorts: [
        {
          price: order,
        },
      ],
    },
  });

  return data;
};

export const getPitch = async (id: number) => {
  const { data } = await axiosInstance.get<PitchResponse>(`/pitches/${id}`);

  return data;
};

export const getPitchesByVenueDetail = async (venueId: number) => {
  const { data } = await axiosInstance.get<GetPitchesByVenueDetailResponse>(`/pitches/venue-detail/${venueId}`);

  return data.data;
};

export const createPitch = async (payload: CreatePitchDto) => {
  const { data } = await axiosInstance.post<PitchResponse>('/pitches', payload);

  return data;
};

export const updatePitch = async (payload: UpdatePitchPayload) => {
  const { id, data: pitchData } = payload;

  const { data } = await axiosInstance.put<PitchResponse>(`/pitches/${id}`, pitchData);

  return data;
};

export const deletePitch = async (id: number) => {
  await axiosInstance.delete(`/pitches/${id}`);
};
