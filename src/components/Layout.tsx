import { Container } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth='xl'>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export const SecondaryLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth='xl'>
      <Header />
      {children}
    </Container>
  );
};
