import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DefaultImage } from './DefaultImage';
import { Link } from './Link';
import { useLocale } from '@/locales';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { SearchVenueData } from '@/services/venue/venue.dto';
import {} from '@/utils';

export interface SearchResultCardProps {
  data: SearchVenueData;
}

export const SearchResultCard = ({ data, ...props }: SearchResultCardProps) => {
  const { formatMessage } = useLocale();

  const pitchCategoryInstance = pitchCategoryKeys.list({ venueId: data.id });
  const { data: pitchCategories } = useQuery(pitchCategoryInstance);

  return (
    <Link href={`/venue/${data.slug}`}>
      <Grid
        component={motion.div}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.3,
        }}
        container
        bgcolor='primary.contrastText'
        borderRadius={3}
        sx={{
          ':hover': {
            boxShadow: 10,
          },
          transition: '0.2s ease box-shadow',
        }}
        padding={2}
        marginY={2}
        {...props}
      >
        <Grid item xs={12} md={3} minHeight={200}>
          <Box borderRadius={3} height='100%' width='100%' overflow='hidden'>
            {data.imageList?.length > 0 ? (
              <Box
                component='img'
                height='100%'
                width='100%'
                sx={{ objectFit: 'cover' }}
                src={data.imageList?.[0].imagePath}
                alt={data.name}
              />
            ) : (
              <DefaultImage />
            )}
          </Box>
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
            <Box display='flex' gap={1} marginY={1} flexWrap='wrap'>
              {pitchCategories?.data.map((pitchCategory) => (
                <Chip label={pitchCategory.name} color='primary' key={pitchCategory.id} />
              ))}
            </Box>
            <Box gap={2}>
              <Box display='flex' alignItems='center' gap={1} marginY={1}>
                <Typography variant='body2' fontWeight={500}>
                  {formatMessage({ id: 'app.search.card.open' })}:
                </Typography>

                <Chip label={data.openAt} />
              </Box>
              <Box display='flex' alignItems='center' gap={1} marginY={1}>
                <Typography variant='body2' fontWeight={500}>
                  {formatMessage({ id: 'app.search.card.close' })}:
                </Typography>
                <Chip label={data.closeAt} />
              </Box>
            </Box>
          </Box>

          <Box>
            <Box display='flex' justifyContent='space-between'>
              <Box display='flex' alignItems='center' marginY={1}>
                <Box display='flex' alignItems='center'>
                  <StarIcon sx={{ color: 'primary.main', marginRight: 1 }} />
                  <Typography>{((data.averageQualityRate + data.averageServiceRate) / 2).toFixed(1)}</Typography>
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
  );
};
