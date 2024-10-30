// lib/api/constants.ts
export const API_URL = "http://localhost:8000/api";

export const AUTH_ENDPOINTS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/refresh",
  "/auth/logout",
  "/auth/me",
]);