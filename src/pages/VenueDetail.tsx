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
import moment from 'moment';
import { MutableRefObject, SyntheticEvent, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RATING_PAGE_LIMIT } from '@/common/constants';
import { ImageLibrary } from '@/components/ImageLibrary';
import { pitchKeys } from '@/services/pitch/pitch.query';
import { ratingKeys } from '@/services/rating/rating.query';
import { venueKeys } from '@/services/venue/venue.query';
import { convertCurrency } from '@/utils/convertCurrency';
import convertToAMPM from '@/utils/convertTimestamp';
import { groupBy } from '@/utils/groupBy';

export const VenueDetail = () => {
  const navigate = useNavigate();

  const pitchesRef = useRef() as MutableRefObject<HTMLDivElement>;
  const ratingsRef = useRef() as MutableRefObject<HTMLDivElement>;
  const addressRef = useRef() as MutableRefObject<HTMLDivElement>;
  const operatingRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(1);

  const { slug } = useParams();

  const venueInstance = venueKeys.detail(slug);
  const { data: venue } = useQuery({
    ...venueInstance,
    enabled: !!slug,
  });

  const pitchInstance = pitchKeys.list({ venueId: venue?._id });
  const { data: pitches } = useQuery({ ...pitchInstance, enabled: !!venue });

  const ratingInstance = ratingKeys.list({ venueId: venue?._id, page, limit: RATING_PAGE_LIMIT });
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

  const rateAverage = ratings
    ? (ratings.data.reduce((acc, cur) => acc + Number(cur.rate), 0) / ratings.data.length).toFixed(1)
    : 0;

  const groupByCategory = pitches && groupBy(pitches.data, (item) => item.pitchCategory.name);

  return (
    venue && (
      <Box marginY={8}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h3'>{venue.name}</Typography>
          <Box display='flex' alignItems='center'>
            <FavoriteBorderIcon sx={{ marginX: 2 }} />
            <Typography variant='body1'>Yêu thích</Typography>
          </Box>
        </Box>
        <Box display='flex' justifyContent='space-between' marginY={1}>
          <Box display='flex' alignItems='center'>
            <PlaceIcon sx={{ marginX: 1, color: 'primary.main' }} />
            <Typography variant='body1'>{venue.address}</Typography>{' '}
          </Box>
          <Box display='flex' alignItems='center'>
            <StarIcon sx={{ marginX: 1, color: 'primary.main' }} />
            <Typography variant='body1'>{rateAverage}/5</Typography>
          </Box>
        </Box>
        {venue.imageList && venue.imageList.length > 0 && <ImageLibrary imageList={venue.imageList} />}

        <Box position='sticky' top={0} bgcolor='primary.contrastText' zIndex={1}>
          <Tabs value={tab} onChange={handleChange}>
            <Tab label='Danh sách sân' onClick={() => pitchesRef.current.scrollIntoView({ behavior: 'smooth' })} />
            <Tab label='Đánh giá' onClick={() => ratingsRef.current.scrollIntoView({ behavior: 'smooth' })} />
            <Tab label='Địa chỉ' onClick={() => addressRef.current.scrollIntoView({ behavior: 'smooth' })} />
            <Tab label='Giờ hoạt động' onClick={() => operatingRef.current.scrollIntoView({ behavior: 'smooth' })} />
          </Tabs>
        </Box>
        <Box marginY={4} ref={pitchesRef}>
          <Typography variant='h4'>Danh sách sân</Typography>
          {groupByCategory &&
            groupByCategory.map((item) => (
              <Grid
                container
                paddingY={4}
                borderBottom={1}
                borderColor='footer.dark'
                sx={{
                  ':last-child': {
                    borderBottom: 0,
                  },
                }}
                key={item.key}
              >
                <Grid item md={3}>
                  <Box
                    bgcolor='primary.main'
                    color='primary.contrastText'
                    width={200}
                    height={200}
                    borderRadius={4}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    fontSize={24}
                  >
                    {item.key}
                  </Box>
                </Grid>
                <Grid item md={3}>
                  <Typography marginBottom={2} fontWeight={500}>
                    Thông tin sân
                  </Typography>
                  <Box>
                    <Box display='flex' alignItems='center' marginY={2}>
                      <SportsSoccerIcon />
                      <Typography marginLeft={1}>Bóng size 4</Typography>
                    </Box>
                    <Box display='flex' alignItems='center' marginY={2}>
                      <LocalDrinkIcon />
                      <Typography marginLeft={1}>Trà đá</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={3}>
                  <Typography marginBottom={2} fontWeight={500}>
                    Số lượng
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
                <Grid item md={3}>
                  <Typography marginBottom={2} fontWeight={500}>
                    Giá sân
                  </Typography>
                  <Typography variant='body1' color='primary.main' fontWeight={500} marginY={2}>
                    1 Giờ
                  </Typography>
                  <Typography variant='h5' fontWeight={500} marginY={2}>
                    {convertCurrency(item.values[0].price)}
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{ marginY: 2 }}
                    onClick={() => navigate(`/booking/${venue.slug}?pitchCategory=${item.values[0].pitchCategory._id}`)}
                  >
                    Đặt sân
                  </Button>
                </Grid>
              </Grid>
            ))}
        </Box>

        <Box marginY={4} ref={ratingsRef}>
          <Typography variant='h4'>Đánh giá</Typography>
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
                    {ratings.pageInfo.count} Đánh giá
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={6}>
                {ratings.data.map((rating) => (
                  <Grid item xs={12} md={6} key={rating._id}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Box display='flex' alignItems='center'>
                        <Avatar sx={{ bgcolor: 'primary.main', marginRight: 2, width: 56, height: 56 }}>
                          {rating.booking.user.lastName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant='body1' sx={{ opacity: 0.6 }}>
                            {moment(rating.createdAt).format('DD/MM/YYYY')}
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
                            Đánh giá
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
            <Box marginY={2}>Chưa có đánh giá nào</Box>
          )}
        </Box>

        <Box marginY={4} ref={addressRef}>
          <Typography variant='h4'>Địa chỉ</Typography>
          {isLoaded && (
            <Box borderRadius={4} overflow='hidden' marginY={2}>
              <GoogleMap mapContainerStyle={{ width: '100%', height: '50vh' }} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </Box>
          )}
        </Box>

        <Box marginY={4} ref={operatingRef}>
          <Typography variant='h4'>Giờ hoạt động</Typography>
          <Box display='flex' justifyContent='space-around' marginY={2}>
            <Box textAlign='center'>
              <Typography variant='h6' fontWeight={500}>
                Mở cửa
              </Typography>
              <Typography variant='body1'>{convertToAMPM(venue.openAt)}</Typography>
            </Box>
            <Box textAlign='center'>
              <Typography variant='h6' fontWeight={500}>
                Đóng cửa
              </Typography>
              <Typography variant='body1'>{convertToAMPM(venue.closeAt)}</Typography>
            </Box>
            <Box textAlign='center'>
              <Typography variant='h6' fontWeight={500}>
                Thời gian
              </Typography>
              <Typography variant='body1'>Cả tuần</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};
