// hooks/auth.ts
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
      }
    },
  });
}

export function useLogout() {
  const { reset } = useAuthStore();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
      reset();
      queryClient.clear();
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
      }
    },
  });
}
