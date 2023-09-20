import { Box, Divider, Modal, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Match } from '@/services/match/match.dto';
import { formatDateWithTime } from '@/utils';

export type MatchDetailProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Match;
};

export const MatchDetail = ({ isOpen, onClose, data }: MatchDetailProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        bgcolor='primary.contrastText'
        width='80%'
        maxWidth={900}
        borderRadius={4}
        component={motion.div}
        overflow='hidden'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Box paddingTop={2} paddingX={1}>
          <Typography color='secondary.main' sx={{ opacity: 0.7 }} variant='body2' marginX={2}>
            {formatDateWithTime(data.time)}
          </Typography>
          <Box display='flex' justifyContent='space-between' alignItems='top' margin={2}>
            <Box textAlign='center' minWidth={150}>
              <Box
                component='img'
                src={data.host.avatar || 'https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png'}
                width={40}
                height={50}
              />
              <Typography paddingY={1}>{data.host.name}</Typography>
            </Box>
            <Box display='flex' flex={1} justifyContent='space-around'>
              <Typography variant='h4' textAlign='center' paddingX={2}>
                {data.hostGoals}
              </Typography>
              <Typography variant='h4' textAlign='center'>
                -
              </Typography>
              <Typography variant='h4' textAlign='center' paddingX={2}>
                {data.guestGoals}
              </Typography>
            </Box>
            <Box textAlign='center' minWidth={150}>
              <Box
                component='img'
                src={
                  data.guest.avatar || 'https://www.seekpng.com/png/full/28-289657_espn-soccer-team-logo-default.png'
                }
                width={40}
                height={50}
              />
              <Typography paddingY={1}>{data.guest.name}</Typography>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box display='flex' justifyContent='space-between' boxShadow={4}>
          <Typography
            textTransform='uppercase'
            variant='body2'
            sx={{
              opacity: 0.6,
              ':hover': {
                bgcolor: 'secondary.light',
                opacity: 1,
              },
              cursor: 'pointer',
            }}
            padding={2}
            width='100%'
            textAlign='center'
          >
            Timeline
          </Typography>
          <Typography
            textTransform='uppercase'
            variant='body2'
            sx={{
              opacity: 0.6,
              ':hover': {
                bgcolor: 'secondary.light',
                opacity: 1,
              },
              cursor: 'pointer',
            }}
            padding={2}
            width='100%'
            textAlign='center'
          >
            Lineups
          </Typography>
          <Typography
            textTransform='uppercase'
            variant='body2'
            sx={{
              opacity: 0.6,
              ':hover': {
                bgcolor: 'secondary.light',
                opacity: 1,
              },
              cursor: 'pointer',
            }}
            padding={2}
            width='100%'
            textAlign='center'
          >
            Stats
          </Typography>
          <Typography
            textTransform='uppercase'
            variant='body2'
            sx={{
              opacity: 0.6,
              ':hover': {
                bgcolor: 'secondary.light',
                opacity: 1,
              },
              cursor: 'pointer',
            }}
            padding={2}
            width='100%'
            textAlign='center'
          >
            News
          </Typography>
        </Box>
        <Box>
          <Box />
        </Box>
      </Box>
    </Modal>
  );
};
