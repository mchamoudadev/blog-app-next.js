// lib/api/types.ts
export interface User {
    id: number;
    email: string;
    name: string;
    createdAt?: string;
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
  
  export interface ApiResponse<T = any> {
    data: T;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    status: number;
  }
  
  export interface AuthResponse {
    user: User;
    accessToken?: string;  // Only for mobile clients
    refreshToken?: string; // Only for mobile clients
  }