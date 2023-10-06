import {
  CreateVenuePayload,
  SearchVenueQuery,
  SearchVenueResponse,
  UpdateVenuePayload,
  VenueQuery,
  VenueResponse,
  VenuesResponse,
} from './venue.dto';
import axiosInstance from '@/utils/axiosConfig';

const venueService = {
  getAll: async (query: VenueQuery) => {
    const { data } = await axiosInstance.get<VenuesResponse>('/venues', {
      params: query,
    });

    return data;
  },
  getOne: async (slug: string) => {
    const { data } = await axiosInstance.get<VenueResponse>(`/venues/${slug}`);

    return data.data;
  },
  getByCurrentUser: async () => {
    const { data } = await axiosInstance.get<VenueResponse>(`/venues/me`);

    return data.data;
  },
  search: async (query: SearchVenueQuery) => {
    const { data } = await axiosInstance.get<SearchVenueResponse>('/venues/search', {
      params: query,
    });

    return data;
  },
  create: async (payload: CreateVenuePayload) => {
    const { data } = await axiosInstance.post<VenueResponse>(`/venues`, payload);

    return data;
  },
  update: async ({ id, data: updateVenueData }: UpdateVenuePayload) => {
    const { data } = await axiosInstance.put<VenueResponse>(`/venues/${id}`, updateVenueData);

    return data;
  },
};

export default venueService;
