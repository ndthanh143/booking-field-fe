import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { createContext, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as io from 'socket.io-client';
import { NotificationContainer } from './components';
import { MainLayout, SecondaryLayout } from './components/Layout';
import { VenueManagementLayout } from './components/VenueManagementLayout';
import {
  AccountBooking,
  AccountPassword,
  AccountProfile,
  BookingComplete,
  BookingManagement,
  Booking,
  Dashboard,
  ForgottenPassword,
  Home,
  Login,
  Register,
  ResetPassword,
  Search,
  VenueDetail,
  VenueManagement,
  AccountNotification,
  CreateTournament,
} from './pages';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';
import '@mui/lab/themeAugmentation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import './App.css';
import 'nprogress/nprogress.css';
import { TournamentDetail } from './pages/TournamentDetail';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        children: [
          {
            path: 'login',
            element: <Login />,
          },
          {
            path: 'register',
            element: <Register />,
          },
          {
            path: 'forgotten-password',
            element: <ForgottenPassword />,
          },
          {
            path: 'reset-password',
            children: [
              {
                path: ':resetToken',
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },
      {
        path: 'search',
        element: <SecondaryLayout />,
        children: [
          {
            index: true,
            element: <Search />,
          },
        ],
      },
      {
        path: 'league',
        element: <MainLayout />,
        children: [
          {
            path: ':id',
            element: <TournamentDetail />,
          },
        ],
      },
      {
        path: 'venue',
        element: <MainLayout />,
        children: [
          {
            path: 'create-tournament',
            element: <CreateTournament />,
          },
          {
            path: ':slug',
            element: <VenueDetail />,
          },
        ],
      },

      {
        path: 'booking',
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: ':slug',
                element: <Booking />,
              },
            ],
          },
          {
            path: 'success',
            element: <BookingComplete />,
          },
        ],
      },
      {
        path: 'venue-management',
        element: <VenueManagementLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'your-venue',
            element: <VenueManagement />,
          },
          {
            path: 'bookings',
            element: <BookingManagement />,
          },
        ],
      },
      {
        path: 'account',
        element: <SecondaryLayout />,
        children: [
          {
            path: 'profile',
            element: <AccountProfile />,
          },
          {
            path: 'my-booking',
            element: <AccountBooking />,
          },
          {
            path: 'notification',
            element: <AccountNotification />,
          },
          {
            path: 'change-password',
            element: <AccountPassword />,
          },
        ],
      },
    ],
  },
]);

const accessToken = Cookies.get('access_token');

const socket = io.connect('ws://localhost:3002', {
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const SocketContext = createContext(socket);

function App() {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <SocketContext.Provider value={socket}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastContainer />
        <QueryClientProvider client={queryClient}>
          <NotificationContainer />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </LocalizationProvider>
    </SocketContext.Provider>
  );
}

export default App;
