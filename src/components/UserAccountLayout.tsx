import {
  AccountBoxOutlined,
  EmojiEvents,
  Lock,
  LogoutOutlined,
  Notifications,
  RestoreOutlined,
} from '@mui/icons-material';
import { Avatar, Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { useLocale } from '@/locales';

export const UserAccountLayout = ({ children }: PropsWithChildren) => {
  const { formatMessage } = useLocale();

  const { pathname } = useLocation();

  const { profile, logout } = useAuth();

  const navigate = useNavigate();

  if (!profile) {
    navigate('/login', {
      state: {
        redirect: pathname,
      },
    });
  }

  return (
    profile && (
      <Box sx={{ marginY: 8 }}>
        <Box display='flex' flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
          <Box
            flex={{ xs: 1, md: 5 }}
            borderRadius={4}
            border={1}
            borderColor='secondary.light'
            sx={{
              padding: {
                xs: 2,
                md: 4,
              },
            }}
          >
            <Box display='flex' justifyContent='center'>
              <Box
                display='inline-block'
                marginX='auto'
                justifyContent='center'
                border={1}
                padding={1}
                sx={{ borderStyle: 'dashed' }}
                borderColor='secondary.light'
                borderRadius='100%'
              >
                <Avatar
                  sx={{
                    width: {
                      xs: 60,
                      md: 80,
                    },
                    height: {
                      xs: 60,
                      md: 80,
                    },
                  }}
                />
              </Box>
            </Box>
            <Typography fontWeight={500} textAlign='center' paddingY={2} fontSize={20}>
              {profile.phone}
            </Typography>
            <List
              sx={{
                fontSize: {
                  xs: 14,
                  md: 20,
                },
              }}
            >
              <ListItemButton
                onClick={() => navigate('/account/profile')}
                sx={{
                  ...(pathname === '/account/profile' && { color: 'primary.main' }),
                  paddingX: { xs: 0, md: 1 },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountBoxOutlined />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.profile' })} />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/my-booking')}
                sx={{
                  ...(pathname === '/account/my-booking' && { color: 'primary.main' }),
                  paddingX: { xs: 0, md: 1 },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <RestoreOutlined />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.my-booking' })} />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/my-league')}
                sx={{
                  ...(pathname === '/account/my-league' && { color: 'primary.main' }),
                  paddingX: { xs: 0, md: 1 },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <EmojiEvents />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.tournament' })} />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/notification')}
                sx={{
                  ...(pathname === '/account/notification' && { color: 'primary.main' }),
                  paddingX: { xs: 0, md: 1 },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.notification' })} />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/change-password')}
                sx={{
                  ...(pathname === '/account/change-password' && { color: 'primary.main' }),
                  paddingX: { xs: 0, md: 1 },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Lock />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.change-password' })} />
              </ListItemButton>
              <Divider sx={{ marginY: 2 }} />
              <ListItemButton onClick={logout} sx={{ paddingX: { xs: 0, md: 1 } }}>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary={formatMessage({ id: 'app.account.menu.logout' })} />
              </ListItemButton>
            </List>
          </Box>
          <Box flex={{ xs: 1, md: 7 }}>{children}</Box>
        </Box>
      </Box>
    )
  );
};
