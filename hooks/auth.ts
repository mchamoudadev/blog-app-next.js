// hooks/auth.ts
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

export function useUser() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();
  const isAuthPage = ['/login', '/register'].includes(pathname);

  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    enabled: isAuthenticated && !isAuthPage,
    retry: false,
    throwOnError: (error: any) => {
      if (error?.status === 401) {
        useAuthStore.getState().reset();
        queryClient.clear();
      }
      return false;
    }
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { setAuthenticated } = useAuthStore();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuthenticated(true);
      if (data.user) {
        queryClient.setQueryData(["user"], data.user);
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { reset } = useAuthStore();
  
  return useMutation({
    mutationFn: async () => {
      await authApi.logout();
      reset();
      queryClient.clear();
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  const { setAuthenticated } = useAuthStore();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuthenticated(true);
      if (data.user) {
        queryClient.setQueryData(["user"], data.user);
      }
    },
  });
}
