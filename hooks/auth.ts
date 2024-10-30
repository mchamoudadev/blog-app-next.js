// hooks/auth.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import type { LoginCredentials, RegisterCredentials } from "@/lib/api/types";

// Get current user
export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: authApi.getUser,
    retry: false,
    staleTime: Infinity,
  });
}

// Login
export function useLogin() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Register
export function useRegister() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
    },
  });
}

// Logout
export function useLogout() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear(); // Clear all queries from cache
      queryClient.removeQueries(); // Remove all queries
    },
  });
}