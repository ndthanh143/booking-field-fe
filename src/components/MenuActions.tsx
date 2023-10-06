import {
  LogoutOutlined,
  Menu as MenuIcon,
  HouseOutlined,
  HistoryOutlined,
  Person,
  EmojiEvents,
} from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth, useMenu } from '@/hooks';
import { useLocale } from '@/locales';
import { RoleEnum } from '@/services/user/user.dto';
import { venueKeys } from '@/services/venue/venue.query';

export const MenuActions = () => {
  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const { profile, logout } = useAuth();

  const venueInstance = venueKeys.currentUser();
  const { data: venue } = useQuery({
    ...venueInstance,
    enabled: Boolean(profile?.role === RoleEnum.Owner),
  });

  const { anchorEl: anchorMenu, isOpen: isOpenMenu, onClose: closeMenu, onOpen: openMenu } = useMenu();

  return (
    <>
      {profile ? (
        <Tooltip title='Account settings'>
          <IconButton onClick={openMenu}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
              }}
            >
              {profile.lastName.charAt(0)}
            </Avatar>
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
              onClick={() => {
                closeMenu();
                navigate('/account/profile');
              }}
            >
              <Avatar />
              <Box marginLeft={2}>
                <Typography fontWeight={500}>{`${profile.firstName} ${profile.lastName}`}</Typography>
                <Typography>{formatMessage({ id: 'app.home.header.account.view-profile' })}</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              sx={{ paddingY: 1.5 }}
              onClick={() => {
                closeMenu();
                navigate('/account/my-booking');
              }}
            >
              <HistoryOutlined sx={{ marginRight: 2 }} />
              {formatMessage({
                id: 'app.home.header.account.my-booking',
              })}
            </MenuItem>
            <MenuItem
              sx={{ paddingY: 1.5 }}
              onClick={() => {
                closeMenu();
                navigate('/league/create-tournament');
              }}
            >
              <EmojiEvents sx={{ marginRight: 2 }} />
              {formatMessage({
                id: 'app.home.header.account.create-tournament',
              })}
            </MenuItem>
            {venue && (
              <MenuItem
                sx={{ paddingY: 1.5, fontWeight: 700 }}
                onClick={() => {
                  closeMenu();
                  navigate('/venue-management/dashboard');
                }}
              >
                <HouseOutlined sx={{ marginRight: 2 }} />
                {formatMessage({
                  id: 'app.home.header.account.venue-management',
                })}
              </MenuItem>
            )}
            <MenuItem
              sx={{ paddingY: 1.5 }}
              onClick={() => {
                closeMenu();
                {
                  closeMenu();
                  logout();
                }
              }}
            >
              <LogoutOutlined sx={{ marginRight: 2 }} />
              {formatMessage({
                id: 'app.home.header.account.sign-out',
              })}
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              onClick={() => {
                closeMenu();
                navigate('/login');
              }}
              sx={{ paddingY: 1.5 }}
              disableRipple
            >
              {formatMessage({
                id: 'app.home.header.account.sign-in',
              })}
            </MenuItem>
            <MenuItem
              onClick={() => {
                closeMenu();
                navigate('/register');
              }}
              sx={{ paddingY: 1.5 }}
            >
              {formatMessage({
                id: 'app.home.header.account.sign-up',
              })}
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
};
