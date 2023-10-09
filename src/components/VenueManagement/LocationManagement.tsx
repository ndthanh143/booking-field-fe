import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { MapPlace } from '..';
import { LocationPicker } from '../LocationPicker';
import { useVenueByCurrentUser, useVenueMutation } from '@/hooks';
import { useLocale } from '@/locales';
import { LocationMap } from '@/services/venue/venue.dto';

export const LocationManagement = () => {
  const { formatMessage } = useLocale();

  const { data: venue } = useVenueByCurrentUser();

  const { updateVenueMutation, isUpdating } = useVenueMutation();
  const [selectedLatLng, setSelectedLatLng] = useState<LocationMap>(venue?.location || { lat: 10, lng: 106 });

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
        <Box display='flex' justifyContent='space-between' gap={2} mb={2}>
          <MapPlace onChange={(locationValue) => locationValue && setSelectedLatLng(locationValue)} />
          <Button variant='contained' size='small' onClick={handleSaveLocation} disabled={!selectedLatLng}>
            {formatMessage({ id: 'app.your-venue.tabs.address.save' })}
          </Button>
        </Box>
        <LocationPicker location={selectedLatLng} onChange={(value) => setSelectedLatLng(value)} />

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isUpdating}>
          <CircularProgress color='inherit' />
        </Backdrop>
      </>
    )
  );
};
