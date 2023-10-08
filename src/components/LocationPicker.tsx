import { Box, Input, Typography } from '@mui/material';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useCallback, useState } from 'react';
import { useLocale } from '@/locales';
import { LocationMap } from '@/services/venue/venue.dto';

const DEFAULT_ZOOM = 10;
export interface LocationPickerProps {
  location: LocationMap;
  onChange: (value: LocationMap) => void;
}

export const LocationPicker = ({ location, onChange }: LocationPickerProps) => {
  const { formatMessage } = useLocale();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [_, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(location);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Box component='div'>
      <Box display='flex' gap={4} marginY={2}>
        <Box>
          <Typography>{formatMessage({ id: 'app.map.latitute' })}:</Typography>
          <Input type='text' value={location.lat} disabled />
        </Box>
        <Box>
          <Typography>{formatMessage({ id: 'app.map.longitute' })}:</Typography>
          <Input type='text' value={location.lng} disabled />
        </Box>
      </Box>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            minHeight: 400,
            borderRadius: 10,
          }}
          center={location}
          zoom={DEFAULT_ZOOM}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => e.latLng && onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
        >
          <MarkerF position={location} />
        </GoogleMap>
      )}
    </Box>
  );
};
