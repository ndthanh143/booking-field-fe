import { Delete } from '@mui/icons-material';
import { Box, Button, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ImageUpload } from '@/components';
import { Round } from '@/services/round/round.dto';
import { tournamentKeys } from '@/services/tournament/tournament.query';

export const TournamentDetail = () => {
  const { id } = useParams();

  const [tab, setTab] = useState(0);
  const [filterByRound, setFilterByRound] = useState<number | null>(null);

  const [rounds, setRounds] = useState<Round[]>();

  const tournamentInstance = tournamentKeys.detail(Number(id));
  const { data: tournament } = useQuery({ ...tournamentInstance });

  const convertRoundName = (roundId: number, totalRounds: number) => {
    const maxMatches = 2 ** (totalRounds - (roundId + 1));

    if (maxMatches === 1) return 'Chung kết';
    if (maxMatches === 2) return 'Bán kết';
    if (maxMatches === 4) return 'Tứ kết';
    return `Vòng 1/${maxMatches}`;
  };

  const acronym = (inputString: string) => {
    const words = inputString.split(' ');
    const acronym = words.map((word) => word.charAt(0).toUpperCase()).join('');
    return acronym;
  };

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    const filteredTournament =
      filterByRound === null
        ? tournament?.data.rounds
        : tournament?.data.rounds.filter((item) => item.no === filterByRound);
    setRounds(filteredTournament);
  }, [filterByRound, tournament]);

  return (
    tournament && (
      <Box>
        <Box bgcolor='primary.contrastText' zIndex={1}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab label='Lịch thi đấu' />
            <Tab label='Bảng xếp hạng' />
            <Tab label='Đội thi đấu' />
            <Tab label='Thống kê' />
            <Tab label='Quản lý đội' />
          </Tabs>
        </Box>
        {tab === 0 && (
          <Box paddingY={4}>
            <Box display='flex' gap={2}>
              <Button
                variant='contained'
                sx={{
                  width: 100,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: filterByRound === null ? 'primary.main' : 'secondary.light',
                  borderRadius: '50%',
                }}
                onClick={() => setFilterByRound(null)}
              >
                Tất cả
              </Button>
              {tournament.data.rounds.map((round) => (
                <Button
                  variant='contained'
                  sx={{
                    width: 100,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: filterByRound === round.no ? 'primary.main' : 'secondary.light',
                    borderRadius: '50%',
                  }}
                  onClick={() => setFilterByRound(round.no)}
                >
                  {acronym(convertRoundName(round.no, tournament.data.rounds.length))}
                </Button>
              ))}
            </Box>
            {rounds?.map((round) => (
              <Box marginY={4} borderRadius={2} overflow='hidden'>
                <Box bgcolor='primary.dark' padding={1} textAlign='center'>
                  <Typography sx={{ color: 'primary.contrastText' }}>
                    {convertRoundName(round.no, tournament.data.rounds.length)}
                  </Typography>
                </Box>
                <Box bgcolor='secondary.light'>
                  {round.matches.map((match) => (
                    <Box paddingY={2} display='flex' justifyContent='center'>
                      <Box display='flex' justifyContent='left' alignItems='center' gap={2} width={200}>
                        <Box
                          component='img'
                          src='https://cdn.britannica.com/69/5869-004-7D75CD05/Flag-Argentina.jpg'
                          alt={match.host?.name}
                          width={40}
                        />
                        <Typography>Đội {match.host?.name}</Typography>
                      </Box>
                      <Box
                        bgcolor='primary.main'
                        color='primary.contrastText'
                        paddingY={1}
                        marginX={2}
                        minWidth={100}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                      >
                        {match.hostGoals} - {match.guestGoals}
                      </Box>

                      <Box display='flex' justifyContent='right' alignItems='center' gap={2} width={200}>
                        <Typography textAlign='center'>Đội {match.guest?.name}</Typography>
                        <Box
                          component='img'
                          src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/255px-Flag_of_Portugal.svg.png'
                          alt={match.guest?.name}
                          width={40}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {tab === 1 && <Box></Box>}
        {tab === 4 && (
          <Grid container>
            <Grid item xs={3}>
              {/* <ImageUpload onChange={() => {}} /> */}
            </Grid>
            <Grid item xs={3}>
              <Delete />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField placeholder='Tên đội *' fullWidth />
              <TextField placeholder='SĐT liên hệ' fullWidth />
            </Grid>
          </Grid>
        )}
      </Box>
    )
  );
};
