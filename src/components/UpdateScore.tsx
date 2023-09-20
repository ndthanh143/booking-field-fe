import { yupResolver } from '@hookform/resolvers/yup';
import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { number, object } from 'yup';
import { useLocale } from '@/locales';
import { Match, UpdateMatchDto, UpdateMatchData } from '@/services/match/match.dto';
import matchService from '@/services/match/match.service';
import { tournamentKeys } from '@/services/tournament/tournament.query';

export type UpdateScoreProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Match;
};

const schema = object({
  hostGoals: number(),
  guestGoals: number(),
});

export const UpdateScore = ({ isOpen, onClose, data: match }: UpdateScoreProps) => {
  const { formatMessage } = useLocale();

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      hostGoals: match.hostGoals,
      guestGoals: match.guestGoals,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: UpdateMatchDto) => matchService.update(data),
    onSuccess: () => {
      onClose();
      toast.success('Update match score successfully');
      queryClient.invalidateQueries(tournamentKeys.all);
    },
  });

  const onSubmitHandler = (data: UpdateMatchData) => mutate({ id: match.id, payload: data });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby='parent-modal-title'
      aria-describedby='parent-modal-description'
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        minWidth={400}
        bgcolor='primary.contrastText'
        borderRadius={4}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
      >
        <Box display='flex' alignItems='center' justifyContent='space-between' paddingBottom={2} padding={2}>
          <Typography id='parent-modal-title' textAlign='center' variant='h5' fontWeight={700}>
            {formatMessage({ id: 'app.tournament.match.update-score.box.title' })}
          </Typography>
          <Close
            onClick={onClose}
            sx={{
              cursor: 'pointer',
              ':hover': { opacity: 0.7 },
            }}
          />
        </Box>
        <Divider />
        <Box padding={4} component='form' onSubmit={handleSubmit(onSubmitHandler)}>
          <Box display='flex' gap={2}>
            <Box>
              <Typography>{match.host?.name}</Typography>
              <TextField
                type='number'
                size='small'
                placeholder={formatMessage({ id: 'app.tournament.match.update-score.box.host' })}
                {...register('hostGoals')}
              />
            </Box>
            <Box>
              <Typography textAlign='right'>{match.guest?.name}</Typography>
              <TextField
                type='number'
                size='small'
                placeholder={formatMessage({ id: 'app.tournament.match.update-score.box.guest' })}
                {...register('guestGoals')}
              />
            </Box>
          </Box>
          <Button
            variant='contained'
            sx={{
              display: 'flex',
              marginX: 'auto',
              marginY: 2,
              width: {
                xs: '100%',
                md: 'fit-content',
              },
            }}
            type='submit'
          >
            {formatMessage({ id: 'app.tournament.match.update-score.box.submit' })}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
