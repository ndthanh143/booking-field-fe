import { TournamentTypeEnum } from '@/services/tournament/tournament.dto';

type Tournament = {
  round: number;
  matches: Match[];
};

type Match = {
  teamA: string;
  teamB: string;
};

const interleaveArrays = (array1: any[], array2: any[]) => {
  const result = [];
  const minLength = Math.min(array1.length, array2.length);

  for (let i = 0; i < minLength; i++) {
    result.push(array1[i], array2[i]);
  }

  result.push(...array1.slice(minLength));
  result.push(...array2.slice(minLength));

  return result;
};

const findTournamentKnockout = (
  tournament: Tournament[],
  currentRound: number,
  restTeam: string[],
  numTeams: number,
): Tournament[] => {
  const totalRounds = Math.ceil(Math.log2(numTeams));
  if (currentRound == totalRounds) return tournament;

  const teams = Array(numTeams)
    .fill(null)
    .map((_, index) => `Đội ${index}`);

  if (currentRound === 0) {
    const matches = [];
    const totalMatchesAtFirstRound = numTeams - 2 ** (totalRounds - 1);

    for (let i = 0; i < totalMatchesAtFirstRound; i++) {
      matches.push({ teamA: teams[2 * i], teamB: teams[2 * i + 1] });
    }

    tournament.push({
      round: currentRound,
      matches,
    });

    const restTeam = teams.slice(totalMatchesAtFirstRound * 2);
    return findTournamentKnockout(tournament, currentRound + 1, restTeam, numTeams);
  } else {
    const winPrevRound = Array(tournament[currentRound - 1].matches.length)
      .fill(null)
      .map((_, index) => `Win round ${currentRound - 1}#${index + 1}`);

    const currentRoundTeams = interleaveArrays(winPrevRound, restTeam);
    const totalMatches = 2 ** (totalRounds - (currentRound + 1));
    const matches = [];
    for (let i = 0; i < totalMatches; i++) {
      matches.push({ teamA: currentRoundTeams[2 * i], teamB: currentRoundTeams[2 * i + 1] });
    }
    tournament.push({
      round: currentRound,
      matches,
    });

    return findTournamentKnockout(tournament, currentRound + 1, [], numTeams);
  }
};

const findTournamentRoundRobin = (tournament: Tournament[], numTeams: number, currentRound: number): Tournament[] => {
  const totalRounds = numTeams % 2 === 0 ? numTeams - 1 : numTeams;

  if (currentRound === totalRounds) return tournament;

  const totalMatchesPerRound = (numTeams * (numTeams - 1)) / (2 * totalRounds);

  const matches = Array(totalMatchesPerRound)
    .fill(null)
    .map(() => ({
      teamA: 'team',
      teamB: 'team',
    }));

  tournament.push({
    round: currentRound,
    matches,
  });

  return findTournamentRoundRobin(tournament, numTeams, currentRound + 1);
};

export const createTournament = (numTeams: number, type: TournamentTypeEnum) => {
  const tournament: Tournament[] = [];

  const result = {
    [TournamentTypeEnum.Knockout]: () => findTournamentKnockout(tournament, 0, [], numTeams),
    [TournamentTypeEnum.RoundRobin]: () => {
      findTournamentRoundRobin(tournament, numTeams, 0);
    },
  };

  return result[type]();
};
