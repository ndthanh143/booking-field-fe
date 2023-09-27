import { Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Seo } from '../components';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

export const Layout = () => {
  const { pathname } = useLocation();

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    onTop();
  }, [pathname]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Seo title='Go2Play' description='Football venue booking app' />
      <Header />
      <Container maxWidth='xl' sx={{ py: 2 }}>
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};
