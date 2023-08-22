import {
  Person,
  Menu as MenuIcon,
  LogoutOutlined,
  HouseOutlined,
  HistoryOutlined,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, useMenu } from '@/hooks';

export const Header = () => {
  const navigate = useNavigate();

  const { profile, logout } = useAuth();

  const { anchorEl: anchorMenu, isOpen: isOpenMenu, onClose: closeMenu, onOpen: openMenu } = useMenu();
  const { anchorEl: anchorCategory, isOpen: isOpenCategory, onClose: closeCategory, onOpen: openCategory } = useMenu();
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      paddingY={2}
      borderBottom={1}
      borderColor='secondary.light'
    >
      <Grid item xs={6} md={4} alignItems='center' justifyContent='space-between'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box
            component='img'
            sx={{
              height: '50px',
              width: 200,
              cursor: 'pointer',
            }}
            alt='logo'
            src='/logo.png'
            onClick={() => navigate('/')}
          />
          <Button variant='text' onClick={openCategory} color='secondary'>
            Danh mục sân bóng
            <KeyboardArrowDown />
          </Button>
          <Menu
            id='category-menu'
            anchorEl={anchorCategory}
            open={isOpenCategory}
            onClose={closeCategory}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem>Sân 5</MenuItem>
            <MenuItem>Sân 7</MenuItem>
            <MenuItem>Sân 11</MenuItem>
            <MenuItem>Sân Futsal</MenuItem>
          </Menu>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box display='flex' justifyContent='end' alignItems='center' gap={2}>
          <Button variant='text' color='secondary'>
            Tiếng Việt
          </Button>
          <Button
            variant='outlined'
            href='https://docs.google.com/forms/d/e/1FAIpQLScCtwnRHg0BcfpQ_I2fKWAMY5CDwFytHWhx1oI8YlOA99wu2Q/viewform'
            color='secondary'
            target='_blank'
          >
            Dành cho đối tác
          </Button>
          <Button variant='contained' onClick={openMenu}>
            <Person sx={{ opacity: 0.5 }} />
            <MenuIcon />
          </Button>
          <Menu
            id='actions-menu'
            anchorEl={anchorMenu}
            open={isOpenMenu}
            onClose={closeMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {profile ? (
              <Box>
                <MenuItem
                  sx={{ borderBottom: 1, borderColor: '#ccc', padding: 2 }}
                  onClick={() => navigate('/account/profile')}
                >
                  <Avatar />
                  <Box marginLeft={2}>
                    <Typography fontWeight={500}>{`${profile.firstName} ${profile.lastName}`}</Typography>
                    <Typography>Xem hồ sơ</Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingY: 1.5 }} onClick={() => navigate('/account/my-booking')}>
                  <HistoryOutlined sx={{ marginRight: 2 }} />
                  Đặt sân của tôi
                </MenuItem>

                <MenuItem
                  sx={{ paddingY: 1.5, fontWeight: 700 }}
                  onClick={() => navigate('/venue-management/dashboard')}
                >
                  <HouseOutlined sx={{ marginRight: 2 }} />
                  Quản lý sân bóng
                </MenuItem>
                <MenuItem
                  sx={{ paddingY: 1.5 }}
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  <LogoutOutlined sx={{ marginRight: 2 }} />
                  Đăng xuất
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem onClick={() => navigate('/login')} sx={{ paddingY: 1.5 }} disableRipple>
                  Đăng nhập
                </MenuItem>
                <MenuItem onClick={() => navigate('/register')} sx={{ paddingY: 1.5 }}>
                  Đăng ký
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </Grid>
    </Grid>
  );
};
