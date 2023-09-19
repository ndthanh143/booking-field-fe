import { NotificationsOutlined } from '@mui/icons-material';
import { Badge, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noResultImage } from '@/assets/images/common';
import { DEFAULT_NOTIFICATION_LIMIT, DEFAULT_NOTIFICATION_PAGE } from '@/common/constants';
import { OrderEnum } from '@/common/enums/order.enum';
import { useAuth, useMenu } from '@/hooks';
import { useLocale } from '@/locales';
import { notificationKeys } from '@/services/notification/notification.query';
import { getRelativeTimeFromNow } from '@/utils';

export type MenuNotificationProps = {
  variant: 'primary' | 'secondary';
};

export const MenuNotification = ({ variant }: MenuNotificationProps) => {
  const { profile } = useAuth();

  const navigate = useNavigate();

  const { formatMessage } = useLocale();

  const {
    anchorEl: anchorNotification,
    isOpen: isOpenNotification,
    onClose: closeNotification,
    onOpen: openNotification,
  } = useMenu();

  const notificationInstance = notificationKeys.list({
    page: DEFAULT_NOTIFICATION_PAGE,
    limit: DEFAULT_NOTIFICATION_LIMIT,
    sorts: [
      {
        field: 'createdAt',
        order: OrderEnum.Desc,
      },
    ],
  });
  const { data: notifications, refetch: notificationRefetch } = useQuery({
    ...notificationInstance,
    enabled: !!profile,
  });

  useEffect(() => {
    notificationRefetch();
  }, [profile, notificationRefetch]);

  return profile && notifications ? (
    <>
      <Tooltip title='Notifications'>
        <IconButton color={'secondary'} onClick={openNotification}>
          <Badge badgeContent={notifications?.data.length} color={variant}>
            <NotificationsOutlined />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id='notifications-menu'
        anchorEl={anchorNotification}
        open={isOpenNotification}
        onClose={closeNotification}
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
        <Box width={400}>
          <Box
            maxHeight={500}
            sx={{
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                width: '0',
              },
            }}
          >
            {notifications.data.length > 0 ? (
              notifications?.data.map((notification) => (
                <MenuItem key={notification.id}>
                  <Box display='flex' gap={2}>
                    <Box component='img' src='/logo.png' alt={notification.title} width='20%' height={40} />
                    <Box width='80%' paddingX={2}>
                      <Typography variant='body1' fontWeight={500}>
                        {notification.title}
                      </Typography>
                      <Typography variant='body2' sx={{ whiteSpace: 'pre-wrap' }}>
                        {notification.message}
                      </Typography>
                      <Typography variant='caption'>{getRelativeTimeFromNow(notification.createdAt)}</Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <Box display='flex' justifyContent='center' paddingY={4}>
                <Box>
                  <Box component='img' src={noResultImage.src} alt={noResultImage.name} width={100} height={100} />
                  <Typography variant='body2' paddingY={1}>
                    Chưa có thông báo nào
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          <Divider sx={{ marginY: 1 }} />
          <Typography
            textAlign='center'
            width='100%'
            color='secondary.main'
            sx={{
              cursor: 'pointer',
              ':hover': {
                color: 'secondary.dark',
              },
            }}
            onClick={() => navigate('/account/notification')}
          >
            {formatMessage({
              id: 'app.home.header.notification.view-all',
            })}
          </Typography>
        </Box>
      </Menu>
    </>
  ) : null;
};
