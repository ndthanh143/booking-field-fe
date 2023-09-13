import { Match } from '../match/match.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData } from '@/common/dtos/base.dto';

export type Round = {
  no: number;
  tournament: Tournament;
  matches: Match[];
} & BaseData;
