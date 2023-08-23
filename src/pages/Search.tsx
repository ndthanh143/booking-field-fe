import { Sort, Tune } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Pagination, Typography } from '@mui/material';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { noResultImage } from '@/assets/images/common';
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/common/constants';
import { OrderEnum } from '@/common/enums/order.enum';
import { SearchFilter } from '@/components/SearchFilter';
import { SearchResultCard } from '@/components/SearchResultCard';
import { SearchSort } from '@/components/SearchSort';
import { useBoolean } from '@/hooks';
import { pitchCategoryKeys } from '@/services/pitch_category/pitch-category.query';
import { venueKeys } from '@/services/venue/venue.query';

const STALE_TIME = 5 * 1000;
const PAGE_LIMIT = 10;
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParams = searchParams.get('pitchCategory') || '1';
  const locationParams = searchParams.get('location') || 'Hồ Chí Minh';
  const sortParams = searchParams.get('sort') || OrderEnum.Asc;
  const minPrice = Number(searchParams.get('minPrice')) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(searchParams.get('maxPrice')) || DEFAULT_MAX_PRICE;

  const { value: isOpenSortModal, setTrue: openSortModal, setFalse: closeSortModal } = useBoolean(false);
  const { value: isOpenFilterModal, setTrue: openFilterModal, setFalse: closeFilterModal } = useBoolean(false);

  const [page, setPage] = useState(1);

  const pitchCategoryInstace = pitchCategoryKeys.list();
  const { data: pitchCategories } = useQuery({ ...pitchCategoryInstace, staleTime: STALE_TIME });

  const venueInstance = venueKeys.search({
    location: locationParams,
    page,
    limit: PAGE_LIMIT,
    sorts: [
      {
        field: 'price',
        order: sortParams as OrderEnum,
      },
    ],
    pitchCategory: Number(categoryParams),
    minPrice,
    maxPrice,
  });
  const { data: venues, refetch: venueRefetch } = useQuery(venueInstance);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const center = useMemo(
    () => ({
      lat: 10.796426,
      lng: 106.653084,
    }),
    [],
  );

  useEffect(() => {
    venueRefetch();
  }, [searchParams, venueRefetch, page]);

  console.log(venues);

  return (
    <>
      <Divider sx={{ marginY: 2 }} />
      <Grid container display='flex' justifyContent='space-between' marginY={2}>
        <Grid item xs={4} display='flex' gap={2}>
          {pitchCategories?.data.map((category) => (
            <Button
              variant={Number(categoryParams) == category._id ? 'contained' : 'outlined'}
              key={category._id}
              onClick={() => {
                searchParams.set('pitchCategory', category._id.toString());
                setSearchParams((prev) => [...prev]);
              }}
            >
              {category.name}
            </Button>
          ))}
        </Grid>
        <Grid item xs={4} display='flex' justifyContent='end' gap={2}>
          <Button variant='contained' onClick={openFilterModal}>
            <Tune sx={{ marginRight: 1 }} /> Bộ lọc
          </Button>
          <Button variant='contained' onClick={openSortModal}>
            <Sort sx={{ marginRight: 1 }} />
            Sắp xếp
          </Button>
        </Grid>
      </Grid>
      <Grid container borderTop={1} paddingY={2} bgcolor='footer.light'>
        <Grid item md={7} padding={2} alignItems='center' sx={{ overflowY: 'scroll' }} height='100vh'>
          {venues?.data && venues.data.length > 0 ? (
            <>
              <Typography variant='body2'>Có {venues.data.length} sân bóng phù hợp dành cho bạn</Typography>
              <Box>
                {venues.data.map((item) => (
                  <SearchResultCard data={item} key={item._id} />
                ))}
              </Box>
              {venues.pageInfo.pageCount > 1 && (
                <Pagination
                  sx={{ display: 'flex', justifyContent: 'center' }}
                  count={venues.pageInfo.pageCount}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              )}
            </>
          ) : (
            <Box textAlign='center'>
              <Box
                component='img'
                src={noResultImage.src}
                alt={noResultImage.name}
                width={150}
                height={150}
                marginBottom={2}
              />
              <Typography variant='body1' fontWeight={700}>
                Không tìm thấy Sân bóng.
              </Typography>
              <Typography variant='body2'>Rất tiếc, chúng tôi không tìm thấy sân bóng nào phù hợp.</Typography>
              <Typography variant='body2'>Bạn vui lòng thử lại với địa điểm hoặc loại sân khác.</Typography>
            </Box>
          )}
        </Grid>
        <Grid item md={5}>
          {isLoaded && (
            <GoogleMap mapContainerStyle={{ width: '100%', height: '100vh' }} center={center} zoom={10}>
              {venues?.data.map((item) => (
                <Marker position={{ lat: item.location.lat, lng: item.location.lng }} key={item._id} />
              ))}
            </GoogleMap>
          )}
        </Grid>
      </Grid>

      <SearchSort isOpen={isOpenSortModal} sortParams={sortParams} onClose={closeSortModal} />
      <SearchFilter isOpen={isOpenFilterModal} priceRange={[minPrice, maxPrice]} onClose={closeFilterModal} />
    </>
  );
};
