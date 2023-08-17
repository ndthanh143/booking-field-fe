import {
  CreatePitchDto,
  GetPitchesByVenueDetailResponse,
  GetPitchesByVenueQuery,
  GetPitchesByVenueResponse,
  PitchResponse,
  PitchesResponse,
  SearchPitchesQuery,
  UpdatePitchDto,
  UpdatePitchPayload,
} from './pitch.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getPitches = async (query: SearchPitchesQuery) => {
  const { keyword, pitchCategory: category, minPrice, maxPrice, order, page, limit } = query;

  const { data } = await axiosInstance.get<PitchesResponse>(`/pitches`, {
    params: {
      location: keyword,
      pitchCategoryId: category,
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

export const getPitchesByVenueDetail = async (venueId: number) => {
  const { data } = await axiosInstance.get<GetPitchesByVenueDetailResponse>(`/pitches/venue-detail/${venueId}`);

  return data.data;
};

export const getPitchesByVenue = async (venueId: number, query?: GetPitchesByVenueQuery) => {
  let response;
  if (query) {
    const { pitchCategoryId } = query;
    response = await axiosInstance.get<GetPitchesByVenueResponse>(`/pitches/venue/${venueId}`, {
      params: {
        pitchCategoryId,
      },
    });
  } else {
    response = await axiosInstance.get<GetPitchesByVenueResponse>(`/pitches/venue/${venueId}`);
  }
  return response.data.data;
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
