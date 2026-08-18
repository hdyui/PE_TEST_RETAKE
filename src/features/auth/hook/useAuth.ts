import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { loginClient, type LoginPayload } from "../services";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginPayload) => loginClient(data),
    onSuccess: (res) => {
      setAuth(res);
      navigate("/employees", { replace: true });
    },
  });
};

export const useLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return Promise.resolve();
    },
    onSuccess: () => {
      logout();
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      logout();
      navigate("/login", { replace: true });
    },
  });
};
