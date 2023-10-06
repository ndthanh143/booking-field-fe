import { LocationOn } from '@mui/icons-material';
import { Box, Button, Grid, Rating, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commonImages } from '@/assets/images/common';
import { DefaultImage } from '@/components/DefaultImage';
import { useAuth } from '@/hooks';
import { useLocale } from '@/locales';
import { UpdateUserPayload } from '@/services/user/user.dto';
import userService from '@/services/user/user.service';
import { Venue } from '@/services/venue/venue.dto';
import { averageRate } from '@/utils';

export const AccountFavorite = () => {
  const navigate = useNavigate();

  const { profile, refetch } = useAuth();

  const { formatMessage } = useLocale();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }: UpdateUserPayload) => userService.updateUserInfo(id, data),
    onSuccess: () => {
      toast.success('Update your favorites successfully');
      refetch();
    },
  });

  const handleUnlike = (venue: Venue) => {
    if (profile) {
      const filteredFavorites = profile.favorites?.filter((item) => item.id !== venue.id);
      mutate({ id: profile.id, data: { favorites: filteredFavorites } });
    }
  };

  return (
    <>
      <Typography variant='h4' fontSize={{ xs: 20, md: 30 }} fontWeight={500} marginBottom={4}>
        {formatMessage({ id: 'app.account.menu.favorite.title' })}
      </Typography>
      {profile && profile.favorites && profile.favorites.length > 0 ? (
        <Grid container spacing={4}>
          {profile?.favorites?.map((venue) => (
            <Grid item xs={12} md={6} key={venue.id}>
              <Box
                onClick={() => navigate(`/venue/${venue.slug}`)}
                sx={{ cursor: 'pointer' }}
                height={200}
                width='100%'
                borderRadius={3}
                overflow='hidden'
              >
                {venue.imageList?.length > 0 ? (
                  <Box
                    component='img'
                    height='100%'
                    width='100%'
                    sx={{ objectFit: 'cover' }}
                    src={venue.imageList?.[0].imagePath}
                    alt={venue.name}
                  />
                ) : (
                  <DefaultImage />
                )}
              </Box>

              <Typography variant='h5' mt={1}>
                {venue.name}
              </Typography>
              <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1}>
                  <Box display='flex' alignItems='center' gap={1}>
                    <LocationOn />
                    {venue.district}
                  </Box>
                </Box>
                {venue.ratings && <Rating name='rating' value={Number(averageRate(venue.ratings))} />}
                <Button variant='text' onClick={() => handleUnlike(venue)}>
                  {formatMessage({ id: 'app.account.menu.favorite.button.unlike' })}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display='flex' justifyContent='center' alignItems='center'>
          <Box marginY={2} textAlign='center'>
            <Box component='img' src={commonImages.noResult.src} alt={commonImages.noResult.name} />
            <Typography>{formatMessage({ id: 'app.account.menu.favorite.no-result' })}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};
