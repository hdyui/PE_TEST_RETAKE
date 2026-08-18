import { apiClient } from "../../lib/axios";

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginClient = async (payload: LoginPayload) => {
  try {
    const { data } = await apiClient.post("/login", payload);
    return data;
  } catch (error) {
    console.error("API call failed:", error);
    throw error;
  }
};
