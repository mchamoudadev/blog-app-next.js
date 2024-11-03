// stores/auth.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/api/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      reset: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => {
        // Only use localStorage on the client side
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);