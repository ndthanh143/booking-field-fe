import {
  GetPitchesByVenueDetailResponse,
  GetPitchesByVenueQuery,
  GetPitchesByVenueResponse,
  PitchesResponse,
} from './pitch.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getPitches = async () => {
  const { data } = await axiosInstance.get<PitchesResponse>('/pitches');

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
    response = await axiosInstance.get<GetPitchesByVenueResponse>(
      `/pitches/venue/${venueId}?pitchCategoryId=${pitchCategoryId}`,
    );
  } else {
    response = await axiosInstance.get<GetPitchesByVenueResponse>(`/pitches/venue/${venueId}`);
  }
  return response.data.data;
};
