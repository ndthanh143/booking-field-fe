import { Delete } from '@mui/icons-material';
import { Backdrop, Box, CircularProgress, Grid, IconButton } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ImageUpload } from '../ImageUpload';
import { useVenueByUserQuery, useVenueMutation } from '@/hooks';
import { uploadImages } from '@/services/media/media.service';
import { VenueImage } from '@/services/venue/venue.dto';

export const ImagesManagement = () => {
  const { data: venue } = useVenueByUserQuery();

  const { updateVenueMutation, resetUpdateState } = useVenueMutation();

  const [files, setFiles] = useState<FileList | null>();

  const {
    data: uploadData,
    mutate: uploadImageMutation,
    isSuccess: isUploadSucess,
    isLoading: isUploading,
  } = useMutation({
    mutationKey: ['upload-images'],
    mutationFn: (files: FileList) => uploadImages(files),
  });

  const handleDelete = (image: VenueImage) => {
    if (venue) {
      const newImageList = venue.imageList.filter((item) => item !== image);

      updateVenueMutation({
        id: venue._id,
        data: {
          imageList: newImageList,
        },
      });
    }
  };

  useEffect(() => {
    if (files) {
      uploadImageMutation(files);
      setFiles(null);
    }
  }, [files, uploadImageMutation]);

  useEffect(() => {
    if (venue && isUploadSucess) {
      updateVenueMutation({
        id: venue._id,
        data: {
          imageList: [
            ...venue.imageList,
            ...uploadData.map((item) => {
              return {
                imagePath: item.url,
              };
            }),
          ],
        },
      });
      resetUpdateState();
    }
  }, [isUploadSucess, resetUpdateState, updateVenueMutation, uploadData, venue]);

  return (
    venue && (
      <Grid container spacing={4}>
        {venue.imageList &&
          venue.imageList.map((item) => (
            <Grid item xs={3} key={item.imagePath}>
              <Box
                position='relative'
                sx={{
                  ':hover': {
                    div: {
                      display: 'block',
                    },
                  },
                  cursor: 'pointer',
                }}
                borderRadius={4}
                height={200}
                overflow='hidden'
                boxShadow={10}
              >
                <Box
                  component='img'
                  src={item.imagePath}
                  alt={item.imagePath}
                  width='100%'
                  sx={{ objectFit: 'cover' }}
                  height={200}
                  key={item.imagePath}
                />
                <Box
                  position='absolute'
                  display='none'
                  sx={{
                    inset: 0,
                    zIndex: 1,
                  }}
                  bgcolor='rgba(0, 0, 0, 0.4)'
                >
                  <IconButton
                    onClick={() => handleDelete(item)}
                    sx={{ display: 'flex', float: 'right', margin: 1, bgcolor: 'primary.contrastText' }}
                  >
                    <Delete sx={{ color: 'error.main' }} fontSize='medium' />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        <Grid item xs={3}>
          <ImageUpload onChange={(files) => setFiles(files)} />
        </Grid>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isUploading}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    )
  );
};
