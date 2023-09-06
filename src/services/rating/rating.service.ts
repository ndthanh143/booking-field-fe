import { CreateRatingPayload, RatingsResponse, GetRatingsQuery, RatingResponse } from './rating.dto';
import axiosInstance from '@/utils/axiosConfig';

const ratingService = {
  getAll: async (query: GetRatingsQuery) => {
    const { page, limit, venueId } = query;

    const { data } = await axiosInstance.get<RatingsResponse>('/ratings', {
      params: {
        page,
        limit,
        venueId,
      },
    });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<RatingResponse>(`/ratings/${id}`);

    return data.data;
  },
  create: async (payload: CreateRatingPayload) => {
    const { data } = await axiosInstance.post('/ratings', payload);

    return data;
  },
};

export default ratingService;
