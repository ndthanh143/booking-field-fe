import { Match } from '../match/match.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData } from '@/common/dtos/base.dto';

export type Team = {
  name: string;
  contact: string;
  tournament: Tournament;
  matches: Match[];
} & BaseData;
