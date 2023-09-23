import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import PlaceIcon from '@mui/icons-material/Place';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Box, Button, Grid, Rating, Tab, Tabs, Typography } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { MutableRefObject, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RATING_PAGE_LIMIT } from '@/common/constants';
import { ImageLibrary } from '@/components';
import { useLocale } from '@/locales';
import { pitchKeys } from '@/services/pitch/pitch.query';
import { ratingKeys } from '@/services/rating/rating.query';
import { venueKeys } from '@/services/venue/venue.query';
import { convertCurrency, convertToAMPM, formatDate, groupBy } from '@/utils';

export const VenueDetail = () => {
  const { formatMessage } = useLocale();

  const navigate = useNavigate();

  const pitchesRef = useRef() as MutableRefObject<HTMLDivElement>;
  const ratingsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const addressRef = useRef() as MutableRefObject<HTMLDivElement>;
  const operatingRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [tab, setTab] = useState(0);

  const { slug } = useParams();

  const venueInstance = venueKeys.detail(slug);
  const { data: venue } = useQuery({
    ...venueInstance,
    enabled: !!slug,
  });

  const pitchInstance = pitchKeys.list({ venueId: venue?.id });
  const { data: pitches } = useQuery({ ...pitchInstance, enabled: !!venue });

  const ratingInstance = ratingKeys.list({ venueId: venue?.id, page: 1, limit: RATING_PAGE_LIMIT });
  const { data: ratings } = useQuery({ ...ratingInstance, enabled: !!venue });

  const center = useMemo(
    () => ({
      lat: 10.796426,
      lng: 106.653084,
    }),
    [],
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY || '',
  });

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const rateAverage =
    ratings && ratings.data.length > 0
      ? (ratings.data.reduce((acc, cur) => acc + Number(cur.rate), 0) / ratings.data.length).toFixed(1)
      : 0;

  const groupByCategory = pitches && groupBy(pitches.data, (item) => item.pitchCategory.name);

  return (
    venue && (
      <Box marginY={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={10} order={1}>
            <Typography variant='h3'>{venue.name}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            order={2}
            display='flex'
            alignItems='center'
            justifyContent={{ xs: 'start', md: 'end' }}
          >
            <FavoriteBorderIcon sx={{ marginRight: 1 }} />
            <Typography variant='body1'>{formatMessage({ id: 'app.venue.favorite' })}</Typography>
          </Grid>
          <Grid item xs={12} md={10} order={3} display='flex'>
            <PlaceIcon sx={{ marginRight: 1, color: 'primary.main' }} />
            <Typography variant='body1'>{`${venue.address}, ${venue.district}, ${venue.province}`}</Typography>
          </Grid>
          <Grid item xs={12} md={2} order={4} display='flex' justifyContent={{ xs: 'start', md: 'end' }}>
            <StarIcon sx={{ marginRight: 1, color: 'primary.main' }} />
            <Typography variant='body1'>{rateAverage}/5</Typography>
          </Grid>
          <Grid item xs={12} md={12} order={{ xs: 0, md: 5 }} marginY={2}>
            {venue.imageList && venue.imageList.length > 0 && <ImageLibrary imageList={venue.imageList} />}
          </Grid>
        </Grid>

        <Box position='sticky' marginY={2} top={0} bgcolor='primary.contrastText' zIndex={1}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab
              label={formatMessage({ id: 'app.venue.tab.pitch-list' })}
              onClick={() => pitchesRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
            <Tab
              label={formatMessage({ id: 'app.venue.tab.rating' })}
              onClick={() => ratingsRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
            <Tab
              label={formatMessage({ id: 'app.venue.tab.address' })}
              onClick={() => addressRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
            <Tab
              label={formatMessage({ id: 'app.venue.tab.work-time' })}
              onClick={() => operatingRef.current.scrollIntoView({ behavior: 'smooth' })}
            />
          </Tabs>
        </Box>
        <Box marginY={4} ref={pitchesRef}>
          <Typography variant='h4'>{formatMessage({ id: 'app.venue.pitches.title' })}</Typography>
          {groupByCategory &&
            groupByCategory.map((item) => (
              <Grid
                container
                paddingY={4}
                spacing={2}
                borderBottom={1}
                borderColor='footer.dark'
                sx={{
                  ':last-child': {
                    borderBottom: 0,
                  },
                }}
                key={item.key}
              >
                <Grid item xs={12} md={3}>
                  <Box
                    bgcolor='primary.main'
                    color='primary.contrastText'
                    width={{ xs: '100%', md: '80%' }}
                    height={200}
                    borderRadius={3}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    fontSize={24}
                  >
                    {item.key}
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography marginBottom={2} fontWeight={500}>
                    {formatMessage({ id: 'app.venue.pitches.item.info' })}
                  </Typography>
                  <Box>
                    <Box display='flex' alignItems='center' marginY={2}>
                      <SportsSoccerIcon />
                      <Typography marginLeft={1}>
                        {formatMessage({ id: 'app.venue.pitches.item.info.ball' })}
                      </Typography>
                    </Box>
                    <Box display='flex' alignItems='center' marginY={2}>
                      <LocalDrinkIcon />
                      <Typography marginLeft={1}>
                        {formatMessage({ id: 'app.venue.pitches.item.info.drink' })}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3} textAlign={{ xs: 'right', md: 'left' }}>
                  <Typography marginBottom={2} fontWeight={500}>
                    {formatMessage({ id: 'app.venue.pitches.item.amount' })}
                  </Typography>
                  <Box
                    display='inline-flex'
                    paddingX={4}
                    paddingY={1}
                    borderRadius={2}
                    border={1}
                    borderColor='primary.main'
                    color='primary.main'
                  >
                    {item.values.length}
                  </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography marginBottom={2} fontWeight={500}>
                    {formatMessage({ id: 'app.venue.pitches.item.price' })}
                  </Typography>
                  <Box>
                    <Typography variant='body1' color='primary.main' fontWeight={500} marginY={2}>
                      {formatMessage({ id: 'app.venue.pitches.item.price.unit' })}
                    </Typography>
                    <Typography variant='h5' fontWeight={500} marginY={2}>
                      {convertCurrency(item.values[0].price)}
                    </Typography>
                  </Box>
                  <Button
                    variant='contained'
                    sx={{ marginY: 2 }}
                    onClick={() => navigate(`/booking/${venue.slug}?pitchCategory=${item.values[0].pitchCategory.id}`)}
                  >
                    {formatMessage({ id: 'app.venue.pitches.item.book' })}
                  </Button>
                </Grid>
              </Grid>
            ))}
        </Box>

        <Box marginY={4} ref={ratingsRef}>
          <Typography variant='h4'> {formatMessage({ id: 'app.venue.ratings.title' })}</Typography>
          {ratings && ratings.data.length > 0 ? (
            <>
              <Box display='flex' alignItems='center' marginY={2}>
                <Box display='flex' alignItems='center'>
                  <StarIcon sx={{ fontSize: 44, color: 'primary.main' }} />
                  <Typography variant='h3' fontWeight={500}>
                    {rateAverage}
                  </Typography>
                </Box>
                <Typography fontWeight={500} variant='h6'>
                  /5
                </Typography>

                <Box display='flex' alignItems='center' marginX={2}>
                  <FiberManualRecordIcon sx={{ fontSize: 8 }} />
                  <Typography variant='h5' marginX={1}>
                    {ratings.pageInfo.count} {formatMessage({ id: 'app.venue.ratings.title' })}
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={6}>
                {ratings.data.map((rating) => (
                  <Grid item xs={12} md={6} key={rating.id}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Box display='flex' alignItems='center'>
                        <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2, width: 56, height: 56 }}>
                          {rating.booking.user.lastName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant='body1' sx={{ opacity: 0.6 }}>
                            {formatDate(rating.createdAt)}
                          </Typography>
                          <Box display='flex'>
                            <Typography variant='body1'>Khách hàng:</Typography>
                            <Typography variant='body1' fontWeight={500} marginX={1}>
                              {`${rating.booking.user.lastName} ${rating.booking.user.firstName}`}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <Box display='flex' alignItems='center'>
                          <Typography variant='body1' marginX={1}>
                            Loại:
                          </Typography>
                          <Typography fontWeight={500}>{rating.booking.pitch.pitchCategory.name}</Typography>
                        </Box>
                        <Box display='flex' alignItems='center'>
                          <Typography variant='body1' marginX={1}>
                            {formatMessage({ id: 'app.venue.ratings.title' })}
                          </Typography>
                          <Rating
                            name='simple-controlled'
                            value={rating.rate}
                            readOnly
                            sx={{ color: 'primary.main' }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Typography marginY={1}>{rating.content}</Typography>
                  </Grid>
                ))}
                <Grid
                  item
                  display='flex'
                  alignItems='center'
                  sx={{
                    cursor: 'pointer',
                    ':hover': {
                      color: 'primary.light',
                    },
                  }}
                  xs={12}
                >
                  <Typography sx={{ textDecoration: 1 }}>Hiển thị thêm</Typography>
                  <KeyboardArrowRightIcon />
                </Grid>
              </Grid>
            </>
          ) : (
            <Box marginY={2}> {formatMessage({ id: 'app.venue.ratings.no-result' })}</Box>
          )}
        </Box>

        <Box marginY={4} ref={addressRef}>
          <Typography variant='h4'> {formatMessage({ id: 'app.venue.address.title' })}</Typography>
          {isLoaded && (
            <Box borderRadius={4} overflow='hidden' marginY={2}>
              <GoogleMap mapContainerStyle={{ width: '100%', height: '50vh' }} center={center} zoom={15}>
                <Marker position={{ lat: venue.location.lat, lng: venue.location.lng }} />
              </GoogleMap>
            </Box>
          )}
        </Box>

        <Box marginY={4} ref={operatingRef}>
          <Typography variant='h4'> {formatMessage({ id: 'app.venue.work-time.title' })}</Typography>
          <Box display='flex' justifyContent='space-around' marginY={2}>
            <Box textAlign='center' bgcolor='secondary.light' padding={4} borderRadius='50%'>
              <Typography variant='h6' fontWeight={500}>
                {formatMessage({ id: 'app.venue.work-time.open' })}
              </Typography>
              <Typography variant='body1'>{convertToAMPM(venue.openAt)}</Typography>
            </Box>
            <Box textAlign='center' bgcolor='secondary.light' padding={4} borderRadius='50%'>
              <Typography variant='h6' fontWeight={500}>
                {formatMessage({ id: 'app.venue.work-time.close' })}
              </Typography>
              <Typography variant='body1'>{convertToAMPM(venue.closeAt)}</Typography>
            </Box>
            <Box textAlign='center' bgcolor='secondary.light' padding={4} borderRadius='50%'>
              <Typography variant='h6' fontWeight={500}>
                {formatMessage({ id: 'app.venue.work-time.time' })}
              </Typography>
              <Typography variant='body1'>Cả tuần</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};
