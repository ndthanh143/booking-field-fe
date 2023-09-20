import { User } from '@sentry/react';
import { PitchCategory } from '../pitch_category/pitch-category.dto';
import { Round } from '../round/round.dto';
import { Team } from '../team/team.dto';
import { Venue } from '../venue/venue.dto';
import { BaseData, BasePaginationResponse, BaseResponse } from '@/common/dtos/base.dto';
import { StateEnum } from '@/pages';

export type TournamentResponse = BaseResponse<Tournament>;
export type TournamentsResponse = BasePaginationResponse<Tournament>;

export type CreateTournamentDto = {
  name: string;
  cover: FileList | undefined;
  mode: StateEnum;
  type: TournamentTypeEnum;
  venue: number;
  totalTeam: number;
  pitchCategory: number;
};

export type Tournament = {
  name: string;
  cover: string;
  phone: string;
  mode: StateEnum;
  type: TournamentTypeEnum;
  totalTeam: number;
  user: User;
  venue: Venue;
  pitchCategory: PitchCategory;
  rounds: Round[];
  teams: Team[];
} & BaseData;

export enum TournamentTypeEnum {
  Knockout = 'knockout',
  RoundRobin = 'round_robin',
}
