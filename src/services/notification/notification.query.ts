import { getNotificationsQuery } from './notification.dto';
import notificationService from './notification.service';
import { defineQuery } from '@/utils/defineQuery';

export const notificationKeys = {
  all: ['notification'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (query: getNotificationsQuery) =>
    defineQuery([...notificationKeys.lists()], () => notificationService.getAll(query)),
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...notificationKeys.details(), id], () => notificationService.getOne(id)),
};
