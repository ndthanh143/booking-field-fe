import { LogoutOutlined, Menu as MenuIcon, HouseOutlined, HistoryOutlined, Person } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth, useMenu } from '@/hooks';

export type MenuActionsProps = {
  variant: 'primary' | 'secondary';
};

export const MenuActions = ({ variant }: MenuActionsProps) => {
  const navigate = useNavigate();

  const { profile, logout } = useAuth();

  const { anchorEl: anchorMenu, isOpen: isOpenMenu, onClose: closeMenu, onOpen: openMenu } = useMenu();

  return (
    <>
      {profile ? (
        <Tooltip title='Account settings'>
          <IconButton onClick={openMenu}>
            <Avatar sx={{ bgcolor: `${variant}.main` }}>{profile.lastName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>
      ) : (
        <Button variant='contained' onClick={openMenu}>
          <Person sx={{ opacity: 0.5 }} />
          <MenuIcon />
        </Button>
      )}
      <Menu
        id='actions-menu'
        anchorEl={anchorMenu}
        open={isOpenMenu}
        onClose={closeMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
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

            {profile.venue && (
              <MenuItem sx={{ paddingY: 1.5, fontWeight: 700 }} onClick={() => navigate('/venue-management/dashboard')}>
                <HouseOutlined sx={{ marginRight: 2 }} />
                Quản lý sân bóng
              </MenuItem>
            )}
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
    </>
  );
};
