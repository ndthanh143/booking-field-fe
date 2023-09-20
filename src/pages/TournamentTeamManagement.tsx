import { Settings } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UploadImage } from '@/components';
import { useMenu } from '@/hooks';
import { useLocale } from '@/locales';
import mediaService from '@/services/media/media.service';
import { Team } from '@/services/team/team.dto';
import teamService from '@/services/team/team.service';
import { tournamentKeys } from '@/services/tournament/tournament.query';

export type BulkUpdateTeams = {
  teams: Team[];
};

export const TournamentTeamManagement = () => {
  const { formatMessage } = useLocale();

  const { id } = useParams();

  const [files, setFiles] = useState<Record<number, FileList>>({});

  const tournamentInstance = tournamentKeys.detail(Number(id));
  const { data: tournament } = useQuery({ ...tournamentInstance });

  const defaultValues = useMemo(() => ({ teams: tournament?.data.teams }), [tournament]);

  const { register, control, handleSubmit } = useForm<BulkUpdateTeams>({ defaultValues });
  useFieldArray({ control, name: 'teams' });

  const { mutate: updateTeamsInfoMutate, isLoading } = useMutation({
    mutationFn: async (data: BulkUpdateTeams) => {
      await Promise.all(
        Object.entries(files).map(async ([key, value]) => {
          const res = await mediaService.uploadImages(value);

          const teamsIndex = data.teams.findIndex((item) => item.id === Number(key));

          data.teams[teamsIndex].avatar = res[0].url;
        }),
      );
      teamService.bulkUpdate(data);
    },
    onSuccess: () => {
      toast.success('Update teams information successfully');
    },
    onError: () => {
      toast.error('Update teams information failed');
    },
  });

  const { anchorEl, isOpen, onClose, onOpen } = useMenu();

  const onSubmitHandler = async (data: BulkUpdateTeams) => updateTeamsInfoMutate(data);

  return (
    tournament && (
      <FormControl component='form' onSubmit={handleSubmit(onSubmitHandler)} fullWidth>
        <Box marginY={2}>
          {tournament.data.teams.map((team, index) => (
            <Box key={team.id}>
              <Grid container spacing={2} paddingY={4}>
                <Tooltip title='Nhấp vào để thay đổi hình ảnh'>
                  <Grid item xs={12} md={2} display='flex' justifyContent='center' flexWrap='wrap'>
                    <Grid
                      item
                      xs={4}
                      md={12}
                      marginX={2}
                      maxHeight={140}
                      position='relative'
                      sx={{
                        ':before': {
                          content: `"${index + 1}"`,
                          position: 'absolute',
                          zIndex: 1,
                          top: 0,
                          left: 0,
                          bgcolor: 'primary.main',
                          paddingX: 2,
                          paddingY: 1,
                          borderRadius: 4,
                          color: 'primary.contrastText',
                        },
                      }}
                    >
                      <UploadImage
                        number={team.id}
                        files={files[team.id]}
                        url={
                          team.avatar ||
                          'https://www.seekpng.com/png/detail/28-289657_espn-soccer-team-logo-default.png'
                        }
                        onChange={(e) =>
                          setFiles((prev) => ({ ...prev, ...(e.target.files && { [team.id]: e.target.files }) }))
                        }
                      />
                    </Grid>
                  </Grid>
                </Tooltip>
                <Grid item xs={12} md={9} display='flex' flexDirection='column' gap={1}>
                  <TextField
                    placeholder={formatMessage({ id: 'app.tournament.team.name' })}
                    fullWidth
                    size='small'
                    {...register(`teams.${index}.name`)}
                  />
                  <TextField
                    placeholder={formatMessage({ id: 'app.tournament.team.phone' })}
                    fullWidth
                    size='small'
                    {...register(`teams.${index}.contact`)}
                  />
                  <TextField
                    placeholder={formatMessage({ id: 'app.tournament.team.contact-name' })}
                    fullWidth
                    size='small'
                    {...register(`teams.${index}.contactName`)}
                  />
                </Grid>
                <Grid item xs={12} md={1} display='flex' alignItems='center' justifyContent='center'>
                  <Tooltip title='Tùy chỉnh'>
                    <IconButton color='primary' onClick={onOpen}>
                      <Settings fontSize='large' />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    id='long-menu'
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={isOpen}
                    onClose={onClose}
                  >
                    <MenuItem onClick={onClose}>{formatMessage({ id: 'app.tournament.team.action.info' })}</MenuItem>
                    <MenuItem onClick={onClose}>{formatMessage({ id: 'app.tournament.team.action.delete' })}</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))}
          <Box display='flex' justifyContent='center' paddingY={4}>
            <Button
              variant='contained'
              type='submit'
              sx={{
                width: {
                  xs: '100%',
                  md: 'fit-content',
                },
              }}
            >
              {formatMessage({ id: 'app.tournament.team.button.submit' })}
            </Button>
          </Box>
        </Box>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </FormControl>
    )
  );
};
