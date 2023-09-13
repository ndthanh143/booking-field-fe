import { Team } from '../team/team.dto';
import { Tournament } from '../tournament/tournament.dto';
import { BaseData } from '@/common/dtos/base.dto';

export type Match = {
  name: string;
  host: Team;
  guest: Team;
  hostGoals: number;
  guestGoals: number;
  tournament: Tournament;
} & BaseData;
