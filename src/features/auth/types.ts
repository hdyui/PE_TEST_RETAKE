export type AuthResponse = {
  id: string;
  email: string;
  role: string;
  name: string;
  accessToken: string;
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthSession = {
  accessToken: string;
  user: User;
  message: string;
};
