import { Box, Tab, Tabs } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomTabPanel, ImagesManagement, InfoManagement, LocationManagement, PitchesManagement } from '@/components';
import { useVenueByUser } from '@/hooks';

export const VenueManagement = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { profile, data: venue } = useVenueByUser();

  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTab = (_: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!profile?.username) {
    navigate('/login', {
      state: {
        redirect: pathname,
      },
    });
  }
  return (
    profile &&
    venue && (
      <Box>
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
