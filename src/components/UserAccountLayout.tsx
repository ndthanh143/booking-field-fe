import { AccountBoxOutlined, FavoriteOutlined, LogoutOutlined, RestoreOutlined } from '@mui/icons-material';
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
import { useAuth } from '@/hooks';

export const UserAccountLayout = ({ children }: PropsWithChildren) => {
  const { profile } = useAuth();

  return (
    profile && (
      <Container sx={{ marginY: 4 }}>
        <Grid container>
          <Grid item xs={5} borderRadius={4} border={1} borderColor='secondary.light' padding={4}>
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
                <Avatar sx={{ width: 80, height: 80 }} />
              </Box>
            </Box>
            <Typography fontWeight={500} textAlign='center' paddingY={2} fontSize={20}>
              {profile.phone}
            </Typography>
            <List sx={{ fontSize: 20 }}>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxOutlined />
                </ListItemIcon>
                <ListItemText primary='Hồ sơ của tôi' />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <RestoreOutlined />
                </ListItemIcon>
                <ListItemText primary='Đặt sân của tôi' />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <FavoriteOutlined />
                </ListItemIcon>
                <ListItemText primary='Danh sách yêu thích' />
              </ListItemButton>
              <Divider sx={{ marginY: 2 }} />
              <ListItemButton>
                <ListItemIcon>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary='Đăng xuất' />
              </ListItemButton>
            </List>
          </Grid>
          <Grid item xs={7}>
            {children}
          </Grid>
        </Grid>
      </Container>
    )
  );
};
