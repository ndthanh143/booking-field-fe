import { Venue } from '../venue/venue.dto';
import { BaseData, BaseResponse } from '@/common/dtos/base.dto';

export type UpdateUserResponse = BaseResponse<User>;

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  venue: Venue;
  favorites?: Venue[];
  role: RoleEnum;
} & BaseData;

export type SignInPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};

export enum RoleEnum {
  Admin = 'admin',
  User = 'user',
  Owner = 'owner',
}

export type UpdateUserPayload = {
  id: number;
  data: UpdateUserData;
};

export type UpdateUserData = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  favorites?: Venue[];
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};
