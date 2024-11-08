export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
} & LoginData;

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export type User = {
  token: string;
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type AuthResponse = {
  token: string;
  user: User;
};
