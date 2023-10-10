import { getNotificationsQuery } from './notification.dto';
import notificationService from './notification.service';
import { defineQuery } from '@/utils/defineQuery';

export const notificationKeys = {
  all: ['notification'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (query: getNotificationsQuery) =>
    defineQuery([...notificationKeys.lists()], () => notificationService.getAll(query)),
  currentUsers: () => [...notificationKeys.all, 'list'] as const,
  currentUser: (query: getNotificationsQuery) =>
    defineQuery([...notificationKeys.currentUsers()], () => notificationService.getByCurrentUser(query)),
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...notificationKeys.details(), id], () => notificationService.getOne(id)),
  countNotSeens: () => [...notificationKeys.all, 'count-not-seen'] as const,
  countNotSeen: () => defineQuery([...notificationKeys.countNotSeens()], () => notificationService.getCountNotSeen()),
};
