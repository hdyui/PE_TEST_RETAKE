export type AuthResponse = {
  id?: number | string;
  email?: string;
  role?: string;
  name?: string;
  accessToken?: string;
  token?: string;
  message?: string;
};

export type User = {
  id: number;
  name: string;
};
