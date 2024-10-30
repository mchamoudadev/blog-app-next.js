import axios, { AxiosError } from "axios";
import { API_URL, AUTH_ENDPOINTS } from "./constants";
import { ApiError, ExtendedAxiosRequestConfig } from "./types";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-client-type": "web",
  },
});

// Separate refresh function
const refreshTokens = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "x-client-type": "web",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Clear any stored auth state
    processQueue(error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // If it's not a 401 or it's already been retried, reject immediately
    if (error.response?.status !== 401 || originalRequest._isRetry) {
      return Promise.reject(error);
    }

    // Don't retry auth endpoints except refresh
    const isAuthEndpoint = AUTH_ENDPOINTS.has(originalRequest.url || "");
    if (isAuthEndpoint && originalRequest.url !== "/auth/refresh") {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // If we're already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return api(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._isRetry = true;
    isRefreshing = true;

    try {
      await refreshTokens();
      processQueue();
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);
      // Clear any stored auth state here
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
