import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { CustomTabPanel, ImagesManagement, InfoManagement, LocationManagement } from '@/components';
import { PitchesManagement } from '@/components/VenueManagement/pitchesManagement';
import { useVenueByUserQuery } from '@/hooks';

export const VenueManagement = () => {
  const { profile, data: venue } = useVenueByUserQuery();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    profile &&
    venue && (
      <Box>
        <ToastContainer />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabIndex} onChange={handleChangeTab} aria-label='basic tabs example'>
            <Tab label='Thông tin' />
            <Tab label='Hình ảnh' />
            <Tab label='Địa chỉ' />
            <Tab label='Sân bóng' />
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
    )
  );
};
