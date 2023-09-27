import { Box, Fab, Grid, Modal } from '@mui/material';
import { Slider } from './Slider';
import { useBoolean } from '@/hooks';
import { useLocale } from '@/locales';
import { VenueImage } from '@/services/venue/venue.dto';

export interface ImageLibraryProps {
  imageList: VenueImage[];
}

export const ImageLibrary = ({ imageList }: ImageLibraryProps) => {
  const { formatMessage } = useLocale();

  const { value, setTrue, setFalse } = useBoolean(false);

  return (
    <Grid container borderRadius={3} overflow='hidden' height={{ xs: 300, md: 500 }}>
      <Grid item xs={12} md={8} position='relative'>
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
            <Box width='100%' height={100 / 3 + '%'} position='relative' key={item.imagePath}>
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
          borderRadius={3}
        >
          <Box borderRadius={3} position='relative'>
            <Slider
              sx={{
                '.slick-dots': {
                  position: 'relative',
                  display: 'flex',
                  gap: 2,
                  width: '100%',
                  height: 60,
                  justifyContent: 'space-between',
                  li: {
                    height: '100%',
                    width: 80,
                  },
                  '.slick-active': {
                    border: 2,
                    borderColor: 'primary.main',
                  },
                },
              }}
              customPaging={(i) => {
                return (
                  <Box
                    component='img'
                    width='100%'
                    height='100%'
                    src={imageList[i].imagePath}
                    sx={{ objectFit: 'cover' }}
                  />
                );
              }}
              dots={true}
              dotsClass='slick-dots slick-thumb'
            >
              {imageList.map((item) => (
                <Box
                  component='img'
                  src={item.imagePath}
                  width='100%'
                  height={{ xs: 300, md: 500 }}
                  sx={{ objectFit: 'cover' }}
                  border={1}
                  borderColor='secondary.light'
                />
              ))}
            </Slider>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};
