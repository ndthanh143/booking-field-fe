import { Box, Tab, Tabs } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { SyntheticEvent } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { tournamentKeys } from '@/services/tournament/tournament.query';

export const TournamentLayout = () => {
  const navigate = useNavigate();

  const { profile } = useAuth();

  const { id } = useParams();

  const { pathname } = useLocation();

  const tournamentInstance = tournamentKeys.detail(Number(id));
  const { data: tournament } = useQuery({ ...tournamentInstance });

  const routes = [`schedule`, `matches`, 'standing', `team-management`];

  const prefix = `/league/${id}`;

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    navigate(`${prefix}/${routes[newValue]}`);
  };

  const isOwner = tournament?.data.user.id === profile?.id;

  return (
    tournament && (
      <Box>
        <Box display='flex' justifyContent='center'>
          <Box zIndex={1}>
            <Tabs
              variant='scrollable'
              value={routes.findIndex((item) => `${prefix}/${item}` === pathname)}
              onChange={handleChange}
            >
              <Tab label='Lịch thi đấu' />
              <Tab label='Trận đấu' disabled={!isOwner} />
              <Tab label='Bảng xếp hạng' />
              <Tab label='Quản lý đội' disabled={!isOwner} />
            </Tabs>
          </Box>
        </Box>
        <Outlet />
      </Box>
    )
  );
};
