import { Match } from '../match/match.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type RoundResponse = BaseResponse<Round>;
export type RoundsResponse = BasePaginationResponse<Round>;

export type Round = {
  no: number;
  tournament: Tournament;
  matches: Match[];
} & BaseData;

export type GetRoundsQuery = {
  tournamentId: number;
} & BaseQuery;
