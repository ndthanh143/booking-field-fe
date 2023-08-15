import { CreateRatingPayload, GetRatingVenueResponse } from './rating.dto';
import { PaginationQuery } from '@/common/dtos/base.dto';
import axiosInstance from '@/utils/axiosConfig';

export const getRatingsByVenue = async (venueId: number, query: PaginationQuery) => {
  const { page, limit } = query;

  const { data } = await axiosInstance.get<GetRatingVenueResponse>(
    `/ratings/venue/${venueId}?page=${page}&limit=${limit}`,
  );

  return data;
};

export const createRating = async (payload: CreateRatingPayload) => {
  const { data } = await axiosInstance.post('/ratings', payload);

  return data;
};
