import { User } from '../user/user.dto';
import { BaseData, BasePaginationResponse, BaseQuery, BaseResponse } from '@/common/dtos/base.dto';

export type NotificationsResponse = BasePaginationResponse<Notification>;
export type NotificationResponse = BaseResponse<Notification>;

export type Notification = {
  title: string;
  message: string;
  user: User;
} & BaseData;

export type getNotificationsQuery = BaseQuery;
