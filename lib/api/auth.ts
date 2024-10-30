// lib/api/auth.ts
import api from "./client";
import type { 
  ApiResponse, 
  LoginCredentials, 
  RegisterCredentials, 
  User, 
  AuthResponse 
} from "./types";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      credentials
    );
    return response.data.data;
  },

  logout: async () => {
    const response = await api.post<ApiResponse<void>>("/auth/logout");
    return response.data;
  },

  getUser: async () => {
    const response = await api.get<ApiResponse<User>>("/auth/me");
    return response.data.data;
  },

  // This is called automatically by the axios interceptor
  refresh: async () => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/refresh");
    return response.data.data;
  },
};