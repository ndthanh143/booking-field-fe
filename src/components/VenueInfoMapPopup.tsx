import { AccessTime, LocationOn } from '@mui/icons-material';
import { Box, Divider, Rating, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { SearchVenueData } from '@/services/venue/venue.dto';

export type VenueInfoMapPopupProps = {
  data: SearchVenueData;
};
export const VenueInfoMapPopup = ({ data }: VenueInfoMapPopupProps) => {
  const [mapTabIndex, setMapTabIndex] = useState(0);

  return (
    <Box borderColor='secondary.light'>
      <Box component='img' src={data.imageList[0].imagePath} width='100%' height={200} />
      <Box paddingX={2} mt={2}>
        <Typography fontWeight={500} fontSize={20}>
          {data.name}
        </Typography>
        <Typography>{data.description}</Typography>
        <Box display='flex' gap={1} alignItems='center'>
          <Typography>{data.averageRate}</Typography>
          <Rating value={data.averageRate} readOnly size='small' />
          <Typography>({data.totalReview})</Typography>
        </Box>
        <Box display='flex' justifyContent='center' marginTop={2}>
          <Tabs value={mapTabIndex} onChange={(_, value) => setMapTabIndex(value)} sx={{ display: 'flex', gap: 2 }}>
            <Tab label='Overview' />
            <Tab label='Reviews' />
            <Tab label='About' />
          </Tabs>
        </Box>
      </Box>
      <Divider />
      <Box>
        {mapTabIndex === 0 && (
          <Box p={2}>
            <Box display='flex' alignItems='center' gap={2} marginY={1}>
              <LocationOn color='primary' />
              <Typography>{`${data.address}, ${data.district}, ${data.province}`}</Typography>
            </Box>
            <Box display='flex' alignItems='center' gap={2} marginY={1}>
              <AccessTime color='primary' />
              <Typography>{`${data.openAt} - ${data.closeAt}`}</Typography>
            </Box>
          </Box>
        )}
        {mapTabIndex === 2 && (
          <Box>
            <Typography p={2}>{data.description}</Typography>
            <Divider />
            <Box></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
