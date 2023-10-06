import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import {
  CustomTabPanel,
  ImagesManagement,
  InfoManagement,
  LoadingContainer,
  LocationManagement,
  PitchesManagement,
} from '@/components';
import { useVenueByCurrentUser } from '@/hooks';
import { useLocale } from '@/locales';

export const VenueManagement = () => {
  const { formatMessage } = useLocale();

  const { data: venue, isLoading: isVenueLoading } = useVenueByCurrentUser();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!venue || isVenueLoading) {
    return <LoadingContainer />;
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleChangeTab} aria-label='basic tabs example' variant='scrollable'>
          <Tab label={formatMessage({ id: 'app.your-venue.tabs.info' })} />
          <Tab label={formatMessage({ id: 'app.your-venue.tabs.images' })} />
          <Tab label={formatMessage({ id: 'app.your-venue.tabs.address' })} />
          <Tab label={formatMessage({ id: 'app.your-venue.tabs.pitch' })} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabIndex} index={0}>
        <InfoManagement />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={1}>
        <ImagesManagement />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={2}>
        <LocationManagement />
      </CustomTabPanel>
      <CustomTabPanel value={tabIndex} index={3}>
        <PitchesManagement />
      </CustomTabPanel>
    </Box>
  );
};
