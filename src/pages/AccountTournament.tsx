import { Box, Button, Card, Chip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from '@/components';
import { useAuth } from '@/hooks';
import { useLocale } from '@/locales';
import { TournamentTypeEnum } from '@/services/tournament/tournament.dto';
import { tournamentKeys } from '@/services/tournament/tournament.query';

export const AccountTournament = () => {
  const { formatMessage } = useLocale();

  const navigate = useNavigate();

  const { profile } = useAuth();

  const tournamentInstance = tournamentKeys.list({});
  const { data: tournaments } = useQuery(tournamentInstance);

  const humanTournamentTypeName = {
    [TournamentTypeEnum.Knockout]: 'Knock out',
    [TournamentTypeEnum.RoundRobin]: 'Round Robin',
  };

  return (
    profile && (
      <Box marginLeft={4} position='absolute' width='100%'>
        <Box display='flex' justifyContent='space-between' marginY={4}>
          <Typography variant='h4' fontWeight={500}>
            {formatMessage({ id: 'app.account.menu.tournament.title' })}
          </Typography>
          <Button variant='contained' size='small' onClick={() => navigate('/league/create-tournament')}>
            {formatMessage({ id: 'app.account.menu.tournament.button.create' })}
          </Button>
        </Box>
        {tournaments &&
          tournaments.data.map((tournament) => (
            <Link href={`/league/${tournament.id}/schedule`}>
              <Card sx={{ padding: 2, marginBottom: 2 }}>
                <Box display='flex' alignItems='center' key={tournament.id}>
                  <Box
                    component='img'
                    src={
                      tournament.cover ||
                      'https://b.fssta.com/uploads/application/soccer/competition-logos/EnglishPremierLeague.png'
                    }
                    width={80}
                    height={80}
                    marginRight={2}
                    alt={tournament.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box flex={1}>
                    <Box display='flex' justifyContent='space-between' width='100%'>
                      <Typography fontWeight={500} paddingBottom={1}>
                        {tournament.name}
                      </Typography>
                      <Chip label={humanTournamentTypeName[tournament.type]} color='primary' />
                    </Box>
                    <Box>
                      <Typography variant='body2'>{tournament.venue.name}</Typography>
                      <Typography variant='body2' fontStyle='italic'>
                        {tournament.venue.address}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Link>
          ))}
      </Box>
    )
  );
};
