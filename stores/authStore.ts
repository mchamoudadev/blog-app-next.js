// stores/auth.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/lib/api/types";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      reset: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);