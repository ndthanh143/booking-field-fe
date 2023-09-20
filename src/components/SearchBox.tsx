import { CategoryOutlined, RoomOutlined, SportsSoccer } from '@mui/icons-material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectBox } from './SelectBox';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { defaultLocations } from '@/common/datas/location.data';
import { useDebounce } from '@/hooks';
import { useLocale } from '@/locales';
import { locationKeys } from '@/services/location/location.query';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { Venue } from '@/services/venue/venue.dto';
import { venueKeys } from '@/services/venue/venue.query';

export const SearchBox = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const [pitchCategory, setPitchCategory] = useState<string>('');
  const [searchPitchCategory, setSearchPitchCategory] = useState<string>('');
  const [searchAdress, setSearchAdress] = useState<string>('');
  const [seletedVenue, setSeletedVenue] = useState<Venue | null>();

  const pitchCategoryInstance = pitchCategoryKeys.list({});
  const { data: pitchCategories } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  const debounceSearchAddress = useDebounce(searchAdress);
  const venueInstance = venueKeys.list({ location: debounceSearchAddress });

  const { data: venues } = useQuery({
    ...venueInstance,
    enabled: !!debounceSearchAddress,
  });

  const locationInstance = locationKeys.list({ type: 'p', keyword: debounceSearchAddress });
  const { data: provinces, refetch: locationRefetch } = useQuery(locationInstance);

  const searchHandler = () => {
    if (seletedVenue) {
      navigate(`/venue/${seletedVenue.slug}`);
    } else {
      const location = provinces?.some((item) => item.name === searchAdress) ? searchAdress : defaultLocations[0];

      navigate(
        `/search?location=${location}&pitchCategory=${
          searchPitchCategory || pitchCategories?.data[0].id
        }&minPrice=${DEFAULT_MIN_PRICE}&maxPrice=${DEFAULT_MAX_PRICE}`,
      );
    }
  };

  useEffect(() => {
    if (debounceSearchAddress) {
      locationRefetch();
    }
  }, [debounceSearchAddress, locationRefetch]);

  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-150px' });

  return (
    pitchCategories && (
      <Box
        component={motion.div}
        ref={ref}
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -50 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
        display='flex'
        marginX={{ xs: 2, md: 12, lg: 20 }}
        borderRadius={4}
        boxShadow={4}
        bgcolor='primary.contrastText'
      >
        <Grid
          container
          marginX={{ xs: 2, md: 8 }}
          marginY={4}
          borderRadius={50}
          border={1}
          borderColor='secondary.main'
        >
          <Grid item xs={5}>
            <Box
              position='relative'
              sx={{
                ':after': {
                  content: '""',
                  height: '60%',
                  width: '1px',
                  bgcolor: 'secondary.light',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  right: 0,
                },
                ':hover': {
                  '.reset-icon': {
                    ...(searchAdress !== '' && { display: 'block' }),
                  },
                },
              }}
            >
              <Typography variant='caption' position='absolute' left={60} top={10}>
                {formatMessage({ id: 'app.home.search.place.title' })}
              </Typography>
              <RoomOutlined sx={{ position: 'absolute', left: 30, top: 30 }} />
              <SelectBox
                value={searchAdress}
                onChange={(value) => setSearchAdress(value)}
                placeHolder={formatMessage({ id: 'app.home.search.place.place-holder' })}
              >
                {searchAdress === '' ? (
                  defaultLocations.map((item) => (
                    <Box
                      onClick={() => {
                        setSeletedVenue(null), setSearchAdress(item);
                      }}
                      display='flex'
                      alignItems='center'
                      padding={1}
                      sx={{ cursor: 'pointer', ':hover': { bgcolor: '#ccc' } }}
                      key={item}
                    >
                      <RoomOutlinedIcon sx={{ fontSize: 20, opacity: 0.7, marginRight: 1 }} />
                      {item}
                    </Box>
                  ))
                ) : (
                  <Box padding={1}>
                    {provinces && provinces.length > 0 && (
                      <>
                        <Typography variant='body2' paddingX={1} paddingY={1} fontWeight={700}>
                          {formatMessage({ id: 'app.home.search.place.title' })}
                        </Typography>
                        {provinces?.map((item) => (
                          <Box
                            onClick={() => {
                              setSearchAdress(item.name);
                            }}
                            display='flex'
                            alignItems='center'
                            padding={1}
                            borderRadius={2}
                            sx={{ cursor: 'pointer', ':hover': { bgcolor: '#ccc' }, ':focus': { bgcolor: '#ccc' } }}
                            key={item.code}
                          >
                            <RoomOutlined sx={{ opacity: 0.7, fontSize: 20, marginRight: 1 }} />
                            <Typography>{item.name}</Typography>
                          </Box>
                        ))}
                      </>
                    )}
                    {venues && venues.data.length > 0 && (
                      <>
                        <Typography variant='body2' paddingX={1} paddingY={1} fontWeight={700}>
                          {formatMessage({ id: 'app.home.search.result.venue' })}
                        </Typography>
                        {venues?.data.map((item) => (
                          <Box
                            onClick={() => {
                              setSeletedVenue(item), setSearchAdress(item.name);
                            }}
                            display='flex'
                            alignItems='center'
                            padding={1}
                            sx={{ cursor: 'pointer', ':hover': { bgcolor: '#ccc' }, ':focus': { bgcolor: '#ccc' } }}
                            key={item.id}
                            borderRadius={2}
                          >
                            <SportsSoccer sx={{ opacity: 0.7, fontSize: 20, marginRight: 1 }} />
                            <Box overflow='hidden'>
                              <Typography>{item.name}</Typography>
                              <Typography
                                variant='caption'
                                noWrap
                                overflow='hidden'
                                textOverflow='ellipsis'
                                width='50px'
                                fontStyle='italic'
                              >
                                {item.address}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </>
                    )}
                    {provinces?.length === 0 && venues?.data.length === 0 && (
                      <Typography textAlign='center'>
                        {formatMessage({ id: 'app.home.search.result.no-result' })}
                      </Typography>
                    )}
                  </Box>
                )}
              </SelectBox>
              <CancelOutlinedIcon
                className='reset-icon'
                sx={{
                  cursor: 'pointer',
                  fontSize: 16,
                  marginLeft: 1,
                  display: 'none',
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }}
                onClick={() => setSearchAdress('')}
              />
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box width='100%' position='relative'>
              <Typography variant='caption' position='absolute' left={60} top={10}>
                {formatMessage({ id: 'app.home.search.category.title' })}
              </Typography>
              <CategoryOutlined sx={{ position: 'absolute', left: 30, top: 30 }} />
              <SelectBox
                value={pitchCategory}
                onChange={(data) => setPitchCategory(data)}
                placeHolder={formatMessage({ id: 'app.home.search.category.place-holder' })}
              >
                {pitchCategories.data.map((item) => (
                  <Box
                    onClick={() => {
                      setSearchPitchCategory(item.id.toString());
                      setPitchCategory(item.name);
                    }}
                    display='flex'
                    alignItems='center'
                    padding={1}
                    sx={{ cursor: 'pointer', ':hover': { bgcolor: '#ccc' } }}
                    key={item.id}
                  >
                    <RoomOutlinedIcon sx={{ fontSize: 20, opacity: 0.7, marginRight: 1 }} />
                    {item.name}
                  </Box>
                ))}
              </SelectBox>
            </Box>
          </Grid>
          <Grid item xs={2} display='flex' flex={1} padding={0.5} alignItems='center'>
            <Button variant='contained' onClick={searchHandler} sx={{ borderRadius: 12, height: '100%' }} fullWidth>
              <SearchIcon />
              <Typography display={{ xs: 'none', md: 'none', lg: 'block' }} variant='body2' fontWeight={500}>
                {formatMessage({ id: 'app.home.search.button' })}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
};
