import { Theme, useMediaQuery } from '@mui/material';

export const useMediaBreakpoint = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return { isMobile, isTablet, isDesktop };
};
