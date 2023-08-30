import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { LocationPicker } from '../LocationPicker';
import { MapPlace } from '../MapPlace';
import { useVenueByUserQuery, useVenueMutation } from '@/hooks';
import { LocationMap } from '@/services/venue/venue.dto';

export const LocationManagement = () => {
  const { data: venue } = useVenueByUserQuery();

  const { updateVenueMutation, isUpdating } = useVenueMutation();
  const [selectedLatLng, setSelectedLatLng] = useState<LocationMap | null>();

  const handleSaveLocation = () => {
    if (venue && selectedLatLng) {
      const { lat, lng } = selectedLatLng;
      updateVenueMutation({
        id: venue.id,
        data: {
          location: {
            lat,
            lng,
          },
        },
      });
    }
  };

  return (
    venue && (
      <>
        <Box display='flex' justifyContent='space-between' gap={2}>
          <MapPlace onChange={(locationValue) => setSelectedLatLng(locationValue)} />
          <Button variant='contained' onClick={handleSaveLocation} disabled={!selectedLatLng}>
            Lưu địa chỉ
          </Button>
        </Box>
        <LocationPicker location={selectedLatLng || venue.location} onChange={(value) => setSelectedLatLng(value)} />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isUpdating}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    )
  );
};
