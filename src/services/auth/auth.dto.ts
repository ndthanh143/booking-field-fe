import { User } from '../user/user.dto';
import { BaseResponse } from '@/common/dto/base.dto';

export type LoginInput = {
  username: string;
  password: string;
};

export type AuthResponseData = {
  accessToken: string;
  user: User;
};

export type AuthResponse = BaseResponse<AuthResponseData>;
