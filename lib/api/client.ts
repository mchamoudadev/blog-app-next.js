import axios, { AxiosError } from "axios";
import { 
  ExtendedAxiosRequestConfig, 
  ApiError, 
  ApiResponse,
  AuthResponse
} from "./types";
import { API_URL } from "./constants";
import { useAuthStore } from "@/stores/authStore";

// Auth endpoints that shouldn't trigger refresh
const AUTH_ENDPOINTS = ['/login', '/register', '/refresh', '/logout'];

// Create base API instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-client-type": "web",
  },
});

// Single refresh promise to prevent multiple calls
let refreshPromise: Promise<any> | null = null;

// Handle auth failure
const handleAuthFailure = () => {
  useAuthStore.getState().reset();
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

// Refresh token function
const refreshTokens = async () => {
  try {
    if (!refreshPromise) {
      refreshPromise = axios.post<ApiResponse<AuthResponse>>(
        `${API_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "x-client-type": "web",
          }
        }
      );
    }
    const { data } = await refreshPromise;
    return data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      handleAuthFailure();
    }
    throw error;
  } finally {
    refreshPromise = null;
  }
};

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Skip refresh for auth endpoints
    const isAuthEndpoint = AUTH_ENDPOINTS.some(endpoint => 
      originalRequest.url?.includes(endpoint)
    );

    if (isAuthEndpoint || originalRequest._isRetry || error.response?.status !== 401) {
      return Promise.reject(error);
    }

    try {
      originalRequest._isRetry = true;
      await refreshTokens();
      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

export default api;