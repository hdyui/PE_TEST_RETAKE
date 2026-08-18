import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;

  setAuth: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setAuth: (accessToken: string) => {
        set({ accessToken });
      },

      logout: () => {
        set({ accessToken: null });
      },
    }),
    {
      name: "hihi",
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    },
  ),
);
