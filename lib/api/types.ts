// lib/api/types.ts


// lib/api/types.ts
import { AxiosRequestConfig, AxiosResponse } from "axios";

// Extended config to include our custom properties
export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;        // Flag to track if request has been retried
  _retryCount?: number;      // Track number of retries
  _originalRequest?: ExtendedAxiosRequestConfig;  // Store original request for retries
  headers?: {
    [key: string]: string | number | boolean;
  };
}

// Additional types that might be useful
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// Type for handling queued requests during refresh
export interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  config: ExtendedAxiosRequestConfig;
}

// Type for tracking refresh token state
export interface RefreshTokenState {
  isRefreshing: boolean;
  failedQueue: QueueItem[];
}


export interface User {
  id: string;
  email: string;
  name?: string;
  // ... any other user fields
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;  // Only for mobile clients
  refreshToken?: string; // Only for mobile clients
}

// Add these interfaces to your existing types
export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
}