import { apiClient } from "../../lib/axios";
import type { AuthResponse, AuthSession } from "./types";

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginClient = async (
  payload: LoginPayload,
): Promise<AuthSession> => {
  void payload;
  const { data } = await apiClient.get<AuthResponse>("/login/1");

  if (!data.accessToken) {
    throw new Error("API không trả về access token.");
  }

  return {
    accessToken: data.accessToken,
    message: data.message,
    user: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
  };
};
