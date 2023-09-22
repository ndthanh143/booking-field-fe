import { Close } from '@mui/icons-material';
import { Box, Fab, Grid, IconButton, Modal } from '@mui/material';
import { useState } from 'react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { useBoolean } from '@/hooks';
import { useLocale } from '@/locales';
import { VenueImage } from '@/services/venue/venue.dto';

export interface ImageLibraryProps {
  imageList: VenueImage[];
}

export const ImageLibrary = ({ imageList }: ImageLibraryProps) => {
  const { formatMessage } = useLocale();

  const { value, setTrue, setFalse } = useBoolean(false);
  const [_, setSwiper] = useState<SwiperType | null>(null);

  return (
    <Grid container borderRadius={4} overflow='hidden' height={500}>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          ':after': {
            content: '""',
            inset: 0,
            position: 'absolute',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            display: 'none',
          },
          ':hover': {
            ':after': {
              display: 'block',
            },
          },
          cursor: 'pointer',
        }}
        position='relative'
      >
        <Box
          component='img'
          src={imageList[0].imagePath}
          alt={imageList[0].imagePath}
          width='100%'
          height='100%'
          sx={{ objectFit: 'cover' }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        height='100%'
        position='relative'
        paddingLeft={{ xs: 0, md: 2 }}
        marginTop={{ xs: 2, md: 0 }}
      >
        <Box width='100%' height='100%' display='flex' flexDirection={{ xs: 'row', md: 'column' }} gap={2}>
          {imageList.slice(1, 4).map((item) => (
            <Box
              width='100%'
              height={100 / 3 + '%'}
              sx={{
                ':after': {
                  content: '""',
                  inset: 0,
                  position: 'absolute',
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  display: 'none',
                },
                ':hover': {
                  ':after': {
                    display: 'block',
                  },
                },
                cursor: 'pointer',
              }}
              position='relative'
              key={item.imagePath}
            >
              <Box component='img' width='100%' height='100%' sx={{ objectFit: 'cover' }} src={item.imagePath} />
            </Box>
          ))}
        </Box>
        <Fab
          variant='extended'
          color='primary'
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: 12,
            fontSize: 12,
            opacity: 0.9,
          }}
          onClick={setTrue}
        >
          {formatMessage({ id: 'app.venue.gallery.view-all-button' })}
        </Fab>
      </Grid>
      <Modal
        open={value}
        onClose={setFalse}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          maxWidth={{ xs: 500, md: 800 }}
          maxHeight={800}
          paddingX={3}
          paddingY={3}
          bgcolor='primary.contrastText'
          borderRadius={4}
        >
          <Box maxHeight={500} overflow='hidden' borderRadius={4} position='relative'>
            <Swiper spaceBetween={50} slidesPerView={1} centeredSlides={true} modules={[Navigation, Thumbs]}>
              {imageList.map((item) => (
                <SwiperSlide key={item.imagePath}>
                  <Box
                    component='img'
                    src={item.imagePath}
                    width='100%'
                    height={{ xs: 300, md: 500 }}
                    sx={{ objectFit: 'cover' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <IconButton
              sx={{
                top: 0,
                right: 0,
                zIndex: 10,
                position: 'absolute',
                bgcolor: 'primary.contrastText',
                color: '#000',
              }}
              onClick={setFalse}
            >
              <Close color='inherit' />
            </IconButton>
          </Box>
          <Box maxHeight={50} overflow='hidden' marginTop={4}>
            <Swiper
              spaceBetween={10}
              slidesPerView={7}
              modules={[Navigation, Thumbs]}
              onSwiper={(swiper) => setSwiper(swiper)}
            >
              {imageList.map((item) => (
                <SwiperSlide key={item.imagePath}>
                  <Box
                    component='img'
                    src={item.imagePath}
                    width='100%'
                    minHeight={70}
                    sx={{ cursor: 'pointer', objectFit: 'cover' }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};
