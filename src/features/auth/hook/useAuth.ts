import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { loginClient, type LoginPayload } from "../services";

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginPayload) => loginClient(data),
    onSuccess: (res) => {
      const token = res?.accessToken ?? res?.token;

      if (token) {
        setAuth(token);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
