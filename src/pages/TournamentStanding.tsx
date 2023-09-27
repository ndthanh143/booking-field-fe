import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { OrderEnum } from '@/common/enums/order.enum';
import { teamKeys } from '@/services/team/team.query';

export const TournamentStanding = () => {
  const { id } = useParams();

  const teamInstance = teamKeys.list({
    tournamentId: Number(id),
    sorts: [{ field: 'point', order: OrderEnum.Desc }],
  });
  const { data: teams } = useQuery({ ...teamInstance });

  return (
    teams && (
      <Box
        paddingY={4}
        sx={{
          overflowX: 'scroll',
          '&::-webkit-scrollbar': {
            width: '0',
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 200 }}>Team</TableCell>
              <TableCell>MP</TableCell>
              <TableCell>W</TableCell>
              <TableCell>D</TableCell>
              <TableCell>L</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.data.map((team, index) => (
              <TableRow key={team.id}>
                <TableCell sx={{ minWidth: 200 }}>
                  <Box display='flex' alignItems='center' gap={2} width='100%'>
                    <Typography>{index + 1}</Typography>
                    <Box
                      component='img'
                      src={
                        team.avatar || 'https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png'
                      }
                      width={20}
                      height={20}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Typography>{team.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{team.matchesPlayed}</TableCell>
                <TableCell>{team.win}</TableCell>
                <TableCell>{team.draw}</TableCell>
                <TableCell>{team.lose}</TableCell>
                <TableCell>{team.point}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    )
  );
};
