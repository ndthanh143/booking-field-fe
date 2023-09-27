import { Image, LocationOn } from '@mui/icons-material';
import { Box, Button, Grid, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { commonImages } from '@/assets/images/common';
import { useLocalStorage } from '@/hooks';
import { useLocale } from '@/locales';
import { Venue } from '@/services/venue/venue.dto';
import { averageRate } from '@/utils';

export const AccountFavorite = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const { storedValue, setValue } = useLocalStorage<Venue[]>('favourites', []);

  const handleUnlike = (venue: Venue) => {
    const filterFavorite = storedValue.filter((item) => item.id !== venue.id);
    setValue(filterFavorite);
    toast.success('Remove favorite venue successfully');
  };

  return (
    <>
      <Typography variant='h4' fontSize={{ xs: 20, md: 30 }} fontWeight={500} marginBottom={4}>
        {formatMessage({ id: 'app.account.menu.favorite.title' })}
      </Typography>
      {storedValue.length > 0 ? (
        <Grid container spacing={4}>
          {storedValue.map((venue) => (
            <Grid item xs={12} md={6} key={venue.id}>
              <Box onClick={() => navigate(`/venue/${venue.slug}`)} sx={{ cursor: 'pointer' }}>
                {venue.imageList?.length > 0 ? (
                  <Box
                    component='img'
                    height={250}
                    width='100%'
                    sx={{ objectFit: 'cover' }}
                    borderRadius={3}
                    src={venue.imageList?.[0].imagePath}
                    alt={venue.name}
                  />
                ) : (
                  <Box
                    height='100%'
                    width='100%'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    bgcolor='secondary.light'
                    borderRadius={3}
                  >
                    <Image fontSize='large' />
                  </Box>
                )}
              </Box>

              <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center' gap={1}>
                  <Box display='flex' alignItems='center' gap={1}>
                    <LocationOn />
                    {venue.district}
                  </Box>
                </Box>
                {venue.ratings && <Rating name='rating' value={averageRate(venue.ratings)} />}
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
