import { Venue } from '../venue/venue.dto';

export type User = {
  _id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  venue: Venue;
};

export type SignInPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};
