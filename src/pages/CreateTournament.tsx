import { yupResolver } from '@hookform/resolvers/yup';
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mixed, number, object, string } from 'yup';
import { UploadImage } from '@/components';
import { useDebounce } from '@/hooks';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { CreateTournamentDto, TournamentTypeEnum } from '@/services/tournament/tournament.dto';
import tournamentService from '@/services/tournament/tournament.service';
import { Venue } from '@/services/venue/venue.dto';
import { venueKeys } from '@/services/venue/venue.query';
import { theme } from '@/styles/theme';

export enum StateEnum {
  Private = 'private',
  Public = 'public',
}

const schema = object({
  name: string().required('Please fill out this field'),
  cover: mixed<FileList>(),
  mode: string().oneOf(Object.values(StateEnum)).required('Please select this field'),
  totalTeam: number().min(2).max(128).required('Please fill out this field'),
  type: string().oneOf(Object.values(TournamentTypeEnum)).required('Please select tournament type'),
  venue: number().required(),
  pitchCategory: number().required('Please select pitch category'),
});

export const CreateTournament = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTournamentDto>({
    resolver: yupResolver(schema),
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [type, setType] = useState<TournamentTypeEnum>();
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [searchAddress, setSearchAddress] = useState('');

  const pitchCategoryInstance = pitchCategoryKeys.list({ venueId: Number(selectedVenue?.id) });
  const { data: pitchCategories } = useQuery({
    ...pitchCategoryInstance,
    enabled: Boolean(selectedVenue),
    staleTime: Infinity,
  });

  const debounceSearchAddress = useDebounce(searchAddress);
  const venueInstance = venueKeys.list({ location: debounceSearchAddress });

  const { data: venues } = useQuery({
    ...venueInstance,
    enabled: !!debounceSearchAddress,
  });

  const { mutate: mutateCreateTournament, isLoading } = useMutation({
    mutationFn: (data: CreateTournamentDto) => tournamentService.create(data),
    onSuccess: (data) => {
      reset();
      navigate(`/league/${data.data.id}/schedule`);
      toast.success('Create tournament success');
    },
  });

  const state = [
    {
      label: 'Riêng tư',
      value: StateEnum.Private,
    },
    {
      label: 'Công khai',
      value: StateEnum.Public,
    },
  ];

  const onSubmitHandler = (data: CreateTournamentDto) => mutateCreateTournament(data);

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} padding={4}>
      <Typography variant='h5'>Tạo giải</Typography>
      <Typography variant='caption' fontStyle='italic'>
        Vui lòng nhập thông tin hợp lệ cho các trường được yêu cầu
      </Typography>
      <Grid container spacing={4} paddingY={2}>
        <Grid item xs={12} md={4} height={240}>
          <Typography variant='body2'>Hình giải đấu</Typography>
          <Box width='100%' height='100%' paddingBottom={2}>
            <UploadImage
              files={files}
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  setFiles(files);
                  setValue('cover', files);
                }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{
                  ':after': {
                    content: '"*"',
                    color: 'error.main',
                  },
                }}
              >
                Tên giải đấu
              </Typography>
              <TextField fullWidth size='small' {...register('name')} />
              {errors.name && (
                <Typography variant='caption' color='error'>
                  {errors.name.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6} md={9}>
              <Typography
                variant='body2'
                sx={{
                  ':after': {
                    content: '"*"',
                    color: 'error.main',
                  },
                }}
              >
                Số điện thoại
              </Typography>
              <TextField size='small' fullWidth />
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography
                variant='body2'
                sx={{
                  ':after': {
                    content: '"*"',
                    color: 'error.main',
                  },
                }}
              >
                Chế độ
              </Typography>
              <Select defaultValue={StateEnum.Private} size='small' fullWidth {...register('mode')}>
                {state.map((item) => (
                  <MenuItem value={item.value} key={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.mode && (
                <Typography variant='caption' color='error'>
                  {errors.mode.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body2'
                sx={{
                  ':after': {
                    content: '"*"',
                    color: 'error.main',
                  },
                }}
              >
                Địa điểm
              </Typography>
              <Autocomplete
                id='country-select-demo'
                options={venues?.data || []}
                onInputChange={(_, value) => setSearchAddress(value)}
                onChange={(_, value) => {
                  setValue('venue', Number(value?.id));
                  setSelectedVenue(value);
                }}
                getOptionLabel={(option) => option.name}
                size='small'
                fullWidth
                renderOption={(props, option) => (
                  <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    <Box>
                      <Typography>{option.name}</Typography>
                      <Typography variant='caption' fontStyle='italic'>
                        {option.address}
                      </Typography>
                    </Box>
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              ':after': {
                content: '"*"',
                color: 'error.main',
              },
            }}
            marginBottom={1}
          >
            Hình thức thi đấu
          </Typography>
          {errors.type && (
            <Typography variant='caption' color='error'>
              {errors.type.message}
            </Typography>
          )}
          <Box
            display='flex'
            gap={2}
            sx={{
              overflowX: 'scroll',
              '&::-webkit-scrollbar': {
                width: 0,
              },
            }}
          >
            {Object.entries(TournamentTypeEnum).map(([key, value]) => (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                width={150}
                height={100}
                bgcolor={type === value ? 'primary.dark' : 'primary.light'}
                borderRadius={4}
                padding={2}
                sx={{ color: 'primary.contrastText', cursor: 'pointer' }}
                onClick={() => {
                  setValue('type', value);
                  setType(value);
                }}
                key={value}
              >
                {key}
              </Box>
            ))}
          </Box>
          <Typography
            sx={{
              ':after': {
                content: '"*"',
                color: 'error.main',
              },
            }}
            marginTop={2}
          >
            Số đội tham gia [2 - 128]
          </Typography>
          <TextField fullWidth type='number' size='small' defaultValue={2} {...register('totalTeam')} />
          {errors.totalTeam && (
            <Typography variant='caption' color='error'>
              {errors.totalTeam.message}
            </Typography>
          )}
          <Typography marginY={2} paddingY={1} paddingX={2} bgcolor='secondary.light' borderRadius={1}>
            Đối với cấu hình này thì số trận đấu của giải là
          </Typography>
          <Box>
            <Typography
              sx={{
                ':after': {
                  content: '"*"',
                  color: 'error.main',
                },
              }}
            >
              Loại sân của giải đấu
            </Typography>
            <Typography variant='caption'>Tương ứng số lượng người thi đấu trên sân của mỗi đội.</Typography>
            {pitchCategories && (
              <Select defaultValue={pitchCategories.data[0].id} {...register('pitchCategory')} fullWidth>
                {pitchCategories.data.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            {errors.pitchCategory && (
              <Typography variant='caption' color='error'>
                {errors.pitchCategory.message}
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
      <Button
        variant='contained'
        sx={{
          marginY: 2,
          width: {
            xs: '100%',
            md: 'fit-content',
          },
        }}
        type='submit'
        disabled={!pitchCategories}
      >
        Tạo giải
      </Button>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </Box>
  );
};
