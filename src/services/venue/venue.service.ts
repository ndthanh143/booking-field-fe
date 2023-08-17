import { UpdateVenuePayload, VenueQuery, VenueResponse, VenuesResponse } from './venue.dto';
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

export const getVenueByUser = async (userId: number) => {
  const { data } = await axiosInstance.get<VenueResponse>(`/venues/user/${userId}`);

  return data.data;
};

export const updateVenue = async ({ id, data: updateVenueData }: UpdateVenuePayload) => {
  const { data } = await axiosInstance.put<VenueResponse>(`/venues/${id}`, updateVenueData);

  return data;
};
