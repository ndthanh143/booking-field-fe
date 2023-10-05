import { ChevronLeft, Dashboard, House, Menu as MenuIcon, ShoppingBag } from '@mui/icons-material';
import {
  IconButton,
  Toolbar,
  Typography,
  styled,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Container,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MenuNotification, MenuActions } from '../components';
import { useAuth } from '@/hooks';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const VenueManagementLayout = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const { profile } = useAuth();

  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  if (!profile?.id) {
    navigate('/login', {
      state: {
        redirect: pathname,
      },
    });
  }

  return (
    profile && (
      <>
        <Box display='flex'>
          <AppBar position='absolute' open={open}>
            <Toolbar
              sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge='start'
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
                {(pathname === '/venue-management/dashboard' && 'Trang chủ') ||
                  (pathname === '/venue-management/your-venue' && 'Sân của bạn') ||
                  (pathname === '/venue-management/bookings' && 'Đặt sân')}
              </Typography>
              <MenuNotification variant='secondary' />
              <MenuActions variant='secondary' />
            </Toolbar>
          </AppBar>
          <Drawer variant='permanent' open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeft />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component='nav'>
              <ListItemButton onClick={() => navigate('/venue-management/dashboard')}>
                <ListItemIcon>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary='Trang chủ' />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/venue-management/your-venue')}>
                <ListItemIcon>
                  <House />
                </ListItemIcon>
                <ListItemText primary='Sân của bạn' />
              </ListItemButton>
              <ListItemButton onClick={() => navigate('/venue-management/bookings')}>
                <ListItemIcon>
                  <ShoppingBag />
                </ListItemIcon>
                <ListItemText primary='Đặt sân' />
              </ListItemButton>
            </List>
          </Drawer>
          <Box
            component='main'
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container maxWidth='xl' sx={{ mt: 12, mb: 4 }}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </>
    )
  );
};
