import mediaService from '../media/media.service';
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
    const { cover } = payload;

    const imageResponse = cover && (await mediaService.uploadImages(cover));

    const { data } = await axiosInstance.post<TournamentResponse>('/tournaments', {
      ...payload,
      ...(imageResponse && { cover: imageResponse[0].url }),
    });

    return data;
  },
};

export default tournamentService;
