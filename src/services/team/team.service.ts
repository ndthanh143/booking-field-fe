import { CreateTeamDto, GetTeamsQuery, TeamResponse, TeamsResponse, UpdateTeamDto } from './team.dto';
import { BulkUpdateTeams } from '@/pages';
import axiosInstance from '@/utils/axiosConfig';

const teamService = {
  getAll: async (query: GetTeamsQuery) => {
    const { data } = await axiosInstance.get<TeamsResponse>('/teams', { params: query });

    return data;
  },
  getOne: async (id: number) => {
    const { data } = await axiosInstance.get<TeamResponse>(`/teams/${id}`);

    return data;
  },
  create: async (payload: CreateTeamDto) => {
    const { data } = await axiosInstance.post<TeamResponse>('/teams', payload);

    return data;
  },
  update: async (dto: UpdateTeamDto) => {
    const { id, payload } = dto;

    const { data } = await axiosInstance.put<TeamResponse>(`/teams/${id}`, payload);

    return data;
  },
  bulkUpdate: async (data: BulkUpdateTeams) =>
    Promise.all(data.teams.map(async (team) => teamService.update({ id: team.id, payload: team }))),

  delete: async (id: number) => {
    await axiosInstance.delete<TeamResponse>(`/teams/${id}`);
  },
};

export default teamService;
