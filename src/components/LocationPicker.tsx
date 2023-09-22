import { Box, Button, Input, Typography } from '@mui/material';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';
import { LocationMap } from '@/services/venue/venue.dto';

const DefaultZoom = 5;

export interface LocationPickerProps {
  location: LocationMap;
  onChange: (value: LocationMap) => void;
}

export const LocationPicker = ({ location, onChange }: LocationPickerProps) => {
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleResetLocation() {
    // setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [_, setMap] = useState<google.maps.Map | null>(null);

  const center = useMemo(() => location, [location]);

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center],
  );

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <Box component='div'>
      <Box display='flex' gap={4} marginY={2}>
        <Button variant='outlined' color='secondary' onClick={handleResetLocation}>
          Reset Location
        </Button>
        <Box>
          <Typography>Latitute:</Typography>
          <Input type='text' value={location.lat} disabled />
        </Box>
        <Box>
          <Typography>Longitute:</Typography>
          <Input type='text' value={location.lng} disabled />
        </Box>
        <Box>
          <Typography>Zoom:</Typography>
          <Input type='text' value={zoom} disabled />
        </Box>
      </Box>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: 400,
            borderRadius: 10,
          }}
          center={center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(e) => e.latLng && onChange({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
        >
          <Marker position={location} />
        </GoogleMap>
      )}
    </Box>
  );
};
