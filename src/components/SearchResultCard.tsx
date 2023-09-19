import { Image } from '@mui/icons-material';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from './Link';
import { SearchVenueData } from '@/services/venue/venue.dto';
import { convertToAMPM } from '@/utils';

export interface SearchResultCardProps {
  data: SearchVenueData;
}

export const SearchResultCard = ({ data, ...props }: SearchResultCardProps) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
      }}
    >
      <Link href={`/venue/${data.slug}`}>
        <Grid container bgcolor='primary.contrastText' borderRadius={2} padding={2} marginY={2} {...props}>
          <Grid item xs={12} md={3}>
            <Link href='/'>
              {data.imageList?.length > 0 ? (
                <Box
                  component='img'
                  height='100%'
                  width='100%'
                  sx={{ objectFit: 'cover' }}
                  borderRadius={2}
                  src={data.imageList?.[0].imagePath}
                  alt={data.name}
                />
              ) : (
                <Box
                  height='100%'
                  width='100%'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  bgcolor='secondary.light'
                  borderRadius={2}
                >
                  <Image fontSize='large' />
                </Box>
              )}
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            paddingX={2}
            paddingY={{ xs: 2, md: 2, lg: 0 }}
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box>
              <Typography variant='h6'>{data.name}</Typography>
              <Box display='flex' gap={2} marginY={1} flexWrap='wrap'>
                <Typography variant='body2'>Sân 5</Typography>
                <Typography variant='body2'>Sân 7</Typography>
                <Typography variant='body2'>Sân 11</Typography>
                <Typography variant='body2'>Sân Futsal</Typography>
              </Box>
              <Box>
                <Typography variant='body2'>Open: {convertToAMPM(data.openAt)}</Typography>
                <Typography variant='body2'>Close: {convertToAMPM(data.closeAt)}</Typography>
              </Box>
            </Box>

            <Box>
              <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center' marginY={1}>
                  <Box display='flex' alignItems='center'>
                    <StarIcon sx={{ color: 'primary.main', marginRight: 1 }} />
                    <Typography>{data.averageRate}</Typography>
                  </Box>
                  <Typography marginX={1}>({data.totalReview} Đánh giá)</Typography>
                </Box>
                <Typography variant='body1' color='primary.main'>
                  1 giờ
                </Typography>
              </Box>
              <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center'>
                  <PlaceIcon sx={{ marginRight: 1 }} />
                  {data.district}
                </Box>
                <Typography variant='body1' fontWeight={500}>
                  {data.price.toLocaleString('vi')}đ
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Link>
    </Box>
  );
};
