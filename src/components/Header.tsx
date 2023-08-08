import { Person, Menu as MenuIcon } from '@mui/icons-material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Avatar, Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, useMenu } from '@/hooks';

export const Header = () => {
  const navigate = useNavigate();

  const { profile, logout } = useAuth();

  const { anchorEl: anchorMenu, isOpen: isOpenMenu, onClose: closeMenu, onOpen: openMenu } = useMenu();
  const { anchorEl: anchorCategory, isOpen: isOpenCategory, onClose: closeCategory, onOpen: openCategory } = useMenu();
  return (
    <Grid container alignItems='center' justifyContent='space-between' marginY={1}>
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
          <Button variant='text' onClick={openCategory}>
            Danh mục sân bóng
            <KeyboardArrowDownIcon />
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
      <Grid item xs={6} md={3}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Button variant='text'>Tiếng Việt</Button>
          <Button variant='outlined'>Dành cho đối tác</Button>
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
                <MenuItem sx={{ borderBottom: 1, borderColor: '#ccc', padding: 2 }}>
                  <Avatar />
                  <Box marginLeft={2}>
                    <Typography fontWeight={500}>{`${profile.firstName} ${profile.lastName}`}</Typography>
                    <Typography>Xem hồ sơ</Typography>
                  </Box>
                </MenuItem>
                <MenuItem sx={{ paddingY: 1.5 }}>
                  <HistoryOutlinedIcon sx={{ marginRight: 2 }} />
                  Đặt sân của tôi
                </MenuItem>
                <MenuItem sx={{ paddingY: 1.5 }}>
                  <FavoriteBorderOutlinedIcon sx={{ marginRight: 2 }} />
                  Danh sách yêu thích
                </MenuItem>
                <MenuItem
                  sx={{ paddingY: 1.5 }}
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
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
