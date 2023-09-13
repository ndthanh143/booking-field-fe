import { CreateTournamentDto, TournamentResponse, TournamentsResponse } from './tournament.dto';
import { BaseQuery } from '@/common/dtos/base.dto';
import axiosInstance from '@/utils/axiosConfig';

const tournamentService = {
  getAll: async (query: BaseQuery) => {
    const { data } = await axiosInstance.get<TournamentsResponse>('/tournaments', { params: query });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<TournamentResponse>(`/tournaments/${id}`);

    return data;
  },
  create: async (payload: CreateTournamentDto) => {
    const { data } = await axiosInstance.post<TournamentResponse>('/tournaments', payload);

    return data;
  },
};

export default tournamentService;
