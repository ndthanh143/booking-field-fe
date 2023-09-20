import { Image } from '@mui/icons-material';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from './Link';
import { useLocale } from '@/locales';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { SearchVenueData } from '@/services/venue/venue.dto';
import { convertToAMPM } from '@/utils';

export interface SearchResultCardProps {
  data: SearchVenueData;
}

export const SearchResultCard = ({ data, ...props }: SearchResultCardProps) => {
  const { formatMessage } = useLocale();

  const pitchCategoryInstance = pitchCategoryKeys.list({ venueId: data.id });
  const { data: pitchCategories } = useQuery(pitchCategoryInstance);

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
                {pitchCategories?.data.map((pitchCategory) => (
                  <Typography
                    variant='body2'
                    bgcolor='primary.main'
                    color='primary.contrastText'
                    borderRadius={2}
                    paddingX={1}
                    lineHeight={1.8}
                  >
                    {pitchCategory.name}
                  </Typography>
                ))}
              </Box>
              <Box gap={2}>
                <Box display='flex' alignItems='center' gap={1} marginY={1}>
                  <Typography variant='body2'>Mở cửa:</Typography>
                  <Typography
                    variant='body2'
                    lineHeight={2}
                    bgcolor='secondary.light'
                    width='fit-content'
                    paddingX={1}
                    borderRadius={2}
                  >
                    {convertToAMPM(data.openAt)}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' gap={1} marginY={1}>
                  <Typography variant='body2'>Đóng cửa:</Typography>
                  <Typography
                    variant='body2'
                    lineHeight={2}
                    bgcolor='secondary.light'
                    width='fit-content'
                    paddingX={1}
                    borderRadius={2}
                  >
                    {convertToAMPM(data.closeAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box display='flex' justifyContent='space-between'>
                <Box display='flex' alignItems='center' marginY={1}>
                  <Box display='flex' alignItems='center'>
                    <StarIcon sx={{ color: 'primary.main', marginRight: 1 }} />
                    <Typography>{data.averageRate}</Typography>
                  </Box>
                  <Typography marginX={1}>
                    ({data.totalReview} {formatMessage({ id: 'search.result.result.item.rating' })})
                  </Typography>
                </Box>
                <Typography variant='body1' color='primary.main'>
                  {formatMessage({ id: 'search.result.result.item.unit' })}
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
