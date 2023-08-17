import { Box, Button, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import MapPicker from 'react-google-map-picker';
import { LocationMap } from '@/services/venue/venue.dto';

const DefaultLocation = { lat: 10, lng: 106 };
const DefaultZoom = 10;

export interface ILocationPickerProps {
  location: LocationMap;
  onChange: (value: LocationMap) => void;
}

export const LocationPicker = ({ location, onChange }: ILocationPickerProps) => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat: number, lng: number) {
    onChange({ lat, lng });
  }

  function handleChangeZoom(newZoom: number) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <>
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

      <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        // mapTypeId="roadmap"
        style={{ height: '700px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      />
    </>
  );
};
