import { Team } from '../team/team.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type MatchResponse = BaseResponse<Match>;
export type MatchesResponse = BasePaginationResponse<Match>;

export type Match = {
  name: string;
  host: Team;
  time: Date;
  guest: Team;
  hostGoals: number;
  guestGoals: number;
  tournament: Tournament;
} & BaseData;

export type UpdateMatchDto = {
  id: number;
  payload: UpdateMatchData;
};

export type UpdateMatchData = Partial<Match>;

export type GetMatchesQuery = {
  tournamentId?: number;
} & BaseQuery;
