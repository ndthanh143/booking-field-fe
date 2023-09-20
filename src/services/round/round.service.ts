import { GetRoundsQuery, RoundResponse, RoundsResponse } from './round.dto';
import axiosInstance from '@/utils/axiosConfig';

const roundService = {
  getAll: async (query: GetRoundsQuery) => {
    const { data } = await axiosInstance.get<RoundsResponse>('/rounds', { params: query });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<RoundResponse>(`/rounds/${id}`);

    return data;
  },
};

export default roundService;
