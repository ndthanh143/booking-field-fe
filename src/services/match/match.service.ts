import { GetMatchesQuery, MatchResponse, MatchesResponse, UpdateMatchDto } from './match.dto';
import axiosInstance from '@/utils/axiosConfig';

const matchService = {
  getAll: async (query: GetMatchesQuery) => {
    const { data } = await axiosInstance.get<MatchesResponse>('/matches', { params: query });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<MatchResponse>(`/matches/${id}`);

    return data;
  },
  update: async (updateMatchDto: UpdateMatchDto) => {
    const { id, payload } = updateMatchDto;

    const { data } = await axiosInstance.put<MatchResponse>(`/matches/${id}`, payload);

    return data;
  },
};

export default matchService;
