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
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
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

  getUser: async (): Promise<User> => {
    try {
      const response = await api.get<ApiResponse<User>>("/auth/me");
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  refresh: async (): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>("/auth/refresh");
    return response.data.data;
  },
};