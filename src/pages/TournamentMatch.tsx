import { LocalDining, Settings } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SetScheduleBox, UpdateScore } from '@/components';
import { useBoolean, useMediaBreakpoint, useMenu } from '@/hooks';
import { CreateBookingDto } from '@/services/booking/booking.dto';
import bookingService from '@/services/booking/booking.service';
import { Match } from '@/services/match/match.dto';
import matchService from '@/services/match/match.service';
import { tournamentKeys } from '@/services/tournament/tournament.query';
import { convertRoundName, formatDate, formatDateToTime } from '@/utils';

export const TournamentMatch = () => {
  const { id } = useParams();

  const { isMobile } = useMediaBreakpoint();

  const tournamentInstance = tournamentKeys.detail(Number(id));
  const { data: tournament, refetch: refetchTournament } = useQuery({ ...tournamentInstance });

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const { value: isOpenUpdateScore, setFalse: closeUpdateScore, setTrue: openUpdateScore } = useBoolean();
  const { value: isOpenUpdateSchedule, setFalse: closeUpdateSchedule, setTrue: openUpdateSchedule } = useBoolean();
  const { anchorEl, isOpen, onClose, onOpen } = useMenu();

  const { mutate: mutateSetSchedule, isLoading } = useMutation({
    mutationFn: async (payload: CreateBookingDto) => {
      await bookingService.create(payload);
      if (selectedMatch) {
        return matchService.update({ id: selectedMatch.id, payload: { time: payload.startTime } });
      }
    },
    onSuccess: () => {
      toast.success('Set lịch thành công');
      refetchTournament();
      setSelectedMatch(null);
    },
  });

  const handleSubmitSchedule = (data: CreateBookingDto) => mutateSetSchedule(data);

  return (
    tournament &&
    tournament.data.rounds && (
      <Container maxWidth='xl'>
        {tournament.data.rounds.map((round, roundId) => (
          <Box>
            {round.matches.map((match, matchId) => (
              <Grid
                container
                alignItems='center'
                paddingY={2}
                marginY={2}
                borderBottom={isMobile ? 1 : 0}
                borderColor='secondary.light'
              >
                <Grid item padding={2} xs={12} md={2}>
                  <Typography>
                    {convertRoundName(round.no, tournament.data.rounds.length)} - Trận {matchId + 1}:
                  </Typography>
                </Grid>
                <Grid item padding={2} xs={12} md={6} display='flex' justifyContent='space-between' alignItems='center'>
                  <Box display='flex' textAlign='left' alignItems='center' gap={1} justifyContent='left' width={200}>
                    <Box
                      component='img'
                      src={
                        match.host?.avatar ||
                        'https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png'
                      }
                      width={40}
                      height={40}
                      sx={{ objectFit: 'cover' }}
                    />
                    <Typography>
                      {match.host?.name || `Win ${convertRoundName(roundId - 1, tournament.data.rounds.length)} `}
                    </Typography>
                  </Box>
                  <Box display='flex' alignItems='center' justifyContent='center' gap={2}>
                    <Typography bgcolor='secondary.light' fontWeight={500} paddingX={1} borderRadius='50%'>
                      {match.hostGoals}
                    </Typography>
                    <LocalDining />
                    <Typography bgcolor='secondary.light' fontWeight={500} paddingX={1} borderRadius='50%'>
                      {match.guestGoals}
                    </Typography>
                  </Box>
                  <Box display='flex' textAlign='right' alignItems='center' gap={1} justifyContent='right' width={200}>
                    <Typography>
                      {match.guest?.name || `Win ${convertRoundName(roundId - 1, tournament.data.rounds.length)} `}
                    </Typography>
                    <Box
                      component='img'
                      src={
                        match.guest?.avatar ||
                        'https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png'
                      }
                      width={40}
                      height={40}
                      sx={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Grid>
                <Grid item padding={2} xs={6} md={2}>
                  <TextField
                    value={match.time && formatDate(match.time)}
                    disabled
                    placeholder='Ngày thi đấu'
                    size='small'
                  />
                </Grid>
                <Grid item padding={2} xs={6} md={1} display='flex' justifyContent='right'>
                  <TextField
                    value={match.time && formatDateToTime(match.time)}
                    disabled
                    placeholder='Giờ đấu'
                    size='small'
                  />
                </Grid>

                <Grid item padding={2} xs={12} md={1} textAlign='center'>
                  <IconButton
                    onClick={(e) => {
                      setSelectedMatch(match);
                      onOpen(e);
                    }}
                  >
                    <Settings fontSize='large' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Box>
        ))}
        <Menu
          id='settings-match-menu'
          anchorEl={anchorEl}
          open={isOpen}
          onClose={onClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => {
              onClose();
              openUpdateSchedule();
            }}
          >
            Cập nhật lịch đấu
          </MenuItem>
          <MenuItem
            onClick={() => {
              onClose();
              openUpdateScore();
            }}
            disabled={!(selectedMatch?.host && selectedMatch?.guest)}
          >
            Cập nhật tỉ số
          </MenuItem>
        </Menu>
        {selectedMatch && (
          <SetScheduleBox
            data={tournament.data.venue}
            isOpen={isOpenUpdateSchedule}
            onClose={() => {
              closeUpdateSchedule();
              setSelectedMatch(null);
            }}
            onSubmit={(data) => handleSubmitSchedule(data)}
          />
        )}
        {selectedMatch && (
          <UpdateScore
            isOpen={isOpenUpdateScore}
            onClose={() => {
              closeUpdateScore();
              setSelectedMatch(null);
            }}
            data={selectedMatch}
          />
        )}
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Container>
    )
  );
};
