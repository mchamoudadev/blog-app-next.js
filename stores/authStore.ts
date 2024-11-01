// stores/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      reset: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);