import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthSession, User } from "./types";

interface AuthState {
  accessToken: string | null;
  user: User | null;

  setAuth: (session: AuthSession) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      setAuth: ({ accessToken, user }: AuthSession) => {
        set({ accessToken, user });
      },

      logout: () => {
        set({ accessToken: null, user: null });
      },
    }),
    {
      name: "hrm-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
