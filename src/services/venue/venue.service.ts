import { VenueQuery, VenueResponse, VenuesResponse } from './venue.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getVenues = async (query: VenueQuery) => {
  const { keyword } = query;

  const { data } = await axiosInstance.get<VenuesResponse>('/venues', {
    params: {
      keyword,
    },
  });

  return data;
};

export const getVenue = async (slug: string) => {
  const { data } = await axiosInstance.get<VenueResponse>(`/venues/${slug}`);

  return data.data;
};
