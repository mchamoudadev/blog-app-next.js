import { cookies } from 'next/headers';
import { API_URL } from '../api/constants';
import { User } from '../api/types';

interface AuthError extends Error {
  statusCode?: number;
  code?: string;
}

export async function getUser() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token');
  const accessToken = cookieStore.get('access_token');
  
  // If no tokens at all, return null instead of throwing
  if (!refreshToken?.value && !accessToken?.value) {
    return null;
  }
  
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Cookie: cookieStore.toString(),
        'x-client-type': 'web',
      },
      credentials: 'include',
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401 && refreshToken?.value) {
        try {
          const refreshResponse = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              Cookie: cookieStore.toString(),
              'x-client-type': 'web',
            },
            credentials: 'include',
          });

          // If refresh fails, return null instead of throwing
          if (!refreshResponse.ok) {
            return null;
          }

          // Retry the original request
          const retryResponse = await fetch(`${API_URL}/auth/me`, {
            headers: {
              Cookie: cookieStore.toString(),
              'x-client-type': 'web',
            },
            credentials: 'include',
            cache: 'no-store',
          });

          if (!retryResponse.ok) {
            return null;
          }

          const data = await retryResponse.json();
          return data.data as User;
        } catch (error) {
          return null;
        }
      }
      return null;
    }

    const data = await response.json();
    return data.data as User;
  } catch (error) {
    return null;
  }
} 