import {
  AccountBoxOutlined,
  EmojiEvents,
  Lock,
  LogoutOutlined,
  Notifications,
  RestoreOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks';

export const UserAccountLayout = ({ children }: PropsWithChildren) => {
  const { profile, logout } = useAuth();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  if (!profile) {
    navigate('/');
  }

  return (
    profile && (
      <Container sx={{ marginY: 4 }}>
        <Grid container justifyContent='right' position='relative'>
          <Grid
            item
            xs={2}
            md={5}
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
                      xs: 40,
                      md: 80,
                    },
                    height: {
                      xs: 40,
                      md: 80,
                    },
                  }}
                />
              </Box>
            </Box>
            <Typography
              fontWeight={500}
              textAlign='center'
              paddingY={2}
              fontSize={20}
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
              }}
            >
              {profile.phone}
            </Typography>
            <List sx={{ fontSize: 20 }}>
              <ListItemButton
                onClick={() => navigate('/account/profile')}
                sx={{ ...(pathname === '/account/profile' && { color: 'primary.main' }), width: '100%' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <AccountBoxOutlined />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Hồ sơ của tôi'
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/my-booking')}
                sx={{ color: pathname === '/account/my-booking' ? 'primary.main' : '' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <RestoreOutlined />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Đặt sân của tôi'
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/my-league')}
                sx={{ color: pathname === '/account/my-league' ? 'primary.main' : '' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <EmojiEvents />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Danh sách giải đấu'
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/notification')}
                sx={{ color: pathname === '/account/notification' ? 'primary.main' : '' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Notifications />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Thông báo'
                />
              </ListItemButton>
              <ListItemButton
                onClick={() => navigate('/account/change-password')}
                sx={{ color: pathname === '/account/change-password' ? 'primary.main' : '' }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <Lock />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Đổi mật khẩu'
                />
              </ListItemButton>
              <Divider sx={{ marginY: 2 }} />
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: {
                      xs: 'none',
                      md: 'block',
                    },
                  }}
                  primary='Đăng xuất'
                />
              </ListItemButton>
            </List>
          </Grid>
          <Grid item xs={10} md={7} position='relative'>
            {children}
          </Grid>
        </Grid>
      </Container>
    )
  );
};
