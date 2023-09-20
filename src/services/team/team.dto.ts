import { Match } from '../match/match.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type TeamResponse = BaseResponse<Team>;
export type TeamsResponse = BasePaginationResponse<Team>;

export type Team = {
  name: string;
  avatar: string;
  contact: string;
  contactName: string;
  tournament: Tournament;
  matchesPlayed: number;
  win: number;
  draw: number;
  lose: number;
  point: number;
  matches: Match[];
} & BaseData;

export type CreateTeamDto = {
  name: string;
  avatar: string;
  contact: string;
  contactName: string;
  tournament: number;
};

export type UpdateTeamDto = {
  id: number;
  payload: Partial<Team>;
};

export type GetTeamsQuery = {
  tournamentId: number;
} & BaseQuery;
