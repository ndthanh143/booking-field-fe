import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Seo, TournamentLayout, UserAccountLayout } from './components';
import { MainLayout, SecondaryLayout } from './components/Layout';
import { VenueManagementLayout } from './components/VenueManagementLayout';
import { useLocalStorage } from './hooks';
import { Locale, localeConfig } from './locales';
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
  TournamentSchedule,
  TournamentStanding,
  TournamentTeamManagement,
  TournamentMatch,
  AccountTournament,
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

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: (
          <Seo title='Go2Play' description='Football venue booking app'>
            <MainLayout />
          </Seo>
        ),
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
            path: 'create-tournament',
            element: <CreateTournament />,
          },
          {
            path: ':id',
            element: <TournamentLayout />,
            children: [
              {
                path: 'schedule',
                element: <TournamentSchedule />,
              },
              {
                path: 'matches',
                element: <TournamentMatch />,
              },
              {
                path: 'team-management',
                element: <TournamentTeamManagement />,
              },
              {
                path: 'standing',
                element: <TournamentStanding />,
              },
            ],
          },
        ],
      },
      {
        path: 'venue',
        element: <MainLayout />,
        children: [
          {
            path: ':slug/create-tournament',
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
            element: (
              <UserAccountLayout>
                <AccountProfile />
              </UserAccountLayout>
            ),
          },
          {
            path: 'my-booking',
            element: (
              <UserAccountLayout>
                <AccountBooking />
              </UserAccountLayout>
            ),
          },
          {
            path: 'notification',
            element: (
              <UserAccountLayout>
                <AccountNotification />
              </UserAccountLayout>
            ),
          },
          {
            path: 'my-league',
            element: (
              <UserAccountLayout>
                <AccountTournament />
              </UserAccountLayout>
            ),
          },

          {
            path: 'change-password',
            element: (
              <UserAccountLayout>
                <AccountPassword />
              </UserAccountLayout>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  const [queryClient] = useState(() => new QueryClient({}));

  const { storedValue: locale } = useLocalStorage<Locale>('locale', 'vi');

  useEffect(() => {
    if (locale === 'en_US') {
      moment.locale('en');
    } else if (locale === 'vi') {
      moment.locale('vi');
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ToastContainer position='bottom-right' autoClose={1000} />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
}

export default App;
