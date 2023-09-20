import { TournamentTypeEnum } from '@/services/tournament/tournament.dto';

export const convertRoundName = (roundId: number, totalRounds: number, type: TournamentTypeEnum) => {
  if (type === TournamentTypeEnum.Knockout) {
    const maxMatches = 2 ** (totalRounds - (roundId + 1));

    if (maxMatches === 1) return 'Chung kết';
    if (maxMatches === 2) return 'Bán kết';
    if (maxMatches === 4) return 'Tứ kết';
    return `Vòng 1/${maxMatches}`;
  } else {
    return `Vòng ${roundId + 1}`;
  }
};
