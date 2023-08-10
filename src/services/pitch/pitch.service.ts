import {
  GetPitchesByVenueDetailResponse,
  GetPitchesByVenueQuery,
  GetPitchesByVenueResponse,
  PitchesResponse,
  SearchPitchesQuery,
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
