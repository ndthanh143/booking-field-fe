import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = () => {
  return (
    <Container maxWidth='xl'>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export const SecondaryLayout = () => {
  return (
    <Container maxWidth='xl'>
      <Header />
      <Outlet />
    </Container>
  );
};
