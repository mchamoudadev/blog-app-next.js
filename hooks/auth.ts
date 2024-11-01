// hooks/auth.ts
import { authApi } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useUser() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
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
