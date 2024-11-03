// hooks/auth.ts
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

export function useLogin() {
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const router = useRouter();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.refresh();
      }
    },
  });
}

export function useLogout() {
  const { reset } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
      reset();
      queryClient.clear();
      router.refresh();
    },
  });
}

export function useRegister() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      if (data.user) {
        setUser(data.user);
        queryClient.invalidateQueries({ queryKey: ['user'] });
        router.refresh();
      }
    },
  });
}
