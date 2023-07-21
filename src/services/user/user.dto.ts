export type User = {
  _id: number;
  username: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SignInPayload = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  password: string;
};
