import { Box, Card, Pagination, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { noResultImage } from '@/assets/images/common';
import { DEFAULT_NOTIFICATION_PAGE } from '@/common/constants';
import { OrderEnum } from '@/common/enums/order.enum';
import { useAuth } from '@/hooks';
import { useLocale } from '@/locales';
import { notificationKeys } from '@/services/notification/notification.query';

const DEFAULT_NOTIFICATION_LIMIT = 10;
export const AccountNotification = () => {
  const { formatMessage } = useLocale();

  const { profile } = useAuth();

  const [page, setPage] = useState(DEFAULT_NOTIFICATION_PAGE);

  const notificationInstance = notificationKeys.list({
    page,
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
  }, [page, notificationRefetch]);

  return (
    <>
      <Box marginLeft={4} position='absolute' width='100%'>
        <Typography variant='h4' fontWeight={500} marginY={4}>
          {formatMessage({ id: 'app.account.menu.notification.title' })}
        </Typography>
        {notifications && notifications.data.length > 0 ? (
          notifications.data.map((notification) => (
            <Card sx={{ padding: 2, marginBottom: 2 }}>
              <Box paddingY={2}>
                <Typography fontWeight={500}>{notification.title}</Typography>
                <Typography>{notification.message}</Typography>
              </Box>
            </Card>
          ))
        ) : (
          <Box marginY={2}>
            <Box component='img' src={noResultImage.src} alt={noResultImage.name} />
            <Typography>{formatMessage({ id: 'app.account.menu.notification.no-result' })}</Typography>
          </Box>
        )}

        {notifications && notifications.pageInfo.pageCount > 1 && (
          <Pagination
            sx={{ display: 'flex', justifyContent: 'center', paddingY: 2 }}
            count={notifications.pageInfo.count}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        )}
      </Box>
    </>
  );
};
