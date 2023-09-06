import { Box, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { defaultLocations } from '@/common/datas/location.data';
import { SearchBox } from '@/components/SearchBox';
import { Slider } from '@/components/Slider';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';

export const Home = () => {
  const navigate = useNavigate();

  const pitchCategoryInstance = pitchCategoryKeys.list();
  const { data } = useQuery({ ...pitchCategoryInstance, staleTime: Infinity });

  const SliderSettings = {
    dots: false,
    autoplay: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
  };

  return (
    data && (
      <>
        <Box position='relative' marginBottom={14}>
          <Box component='img' sx={{ width: '100%' }} alt='san co nhan tao so 1' src='banner.jpg' />
          <Box position='absolute' width='100%' bottom={-40}>
            <SearchBox />
          </Box>
        </Box>
        <Box marginY={2}>
          <Slider {...SliderSettings}>
            {data.data.map((category) => (
              <Box display='flex' justifyContent='center' maxHeight={200} paddingX={4} key={category.id}>
                <Box
                  borderRadius={4}
                  overflow='hidden'
                  position='relative'
                  maxHeight={200}
                  sx={{
                    ':before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      display: 'none',
                    },
                    ':hover': {
                      ':before': {
                        display: 'block',
                      },
                    },
                    cursor: 'pointer',
                  }}
                >
                  <Box
                    component='img'
                    width='100%'
                    height='100%'
                    overflow='hidden'
                    alt={category.name}
                    src={category.thumbnail}
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>

        <Box marginY={10}>
          <Typography variant='h5' marginY={2}>
            Danh mục sân bóng
          </Typography>
          <Grid container sx={{ width: 'full' }} spacing={4}>
            {data.data.map((category) => (
              <Grid item xs={12} md={6} lg={3} key={category.id}>
                <Card sx={{ maxWidth: 345, minHeight: 400, borderRadius: 4 }} key={category.id}>
                  <Box
                    position='relative'
                    sx={{
                      ':before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.4)',
                        display: 'none',
                        zIndex: 1,
                      },
                      ':hover': {
                        ':before': {
                          display: 'block',
                        },
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      navigate(
                        `/search?location=${defaultLocations[0]}&pitchCategory=${category.id}&minPrice=${DEFAULT_MIN_PRICE}&maxPrice=${DEFAULT_MAX_PRICE}`,
                      )
                    }
                  >
                    <CardMedia sx={{ height: 200 }} image={category.thumbnail} title={category.name} />
                  </Box>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {category.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {category.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    )
  );
};
