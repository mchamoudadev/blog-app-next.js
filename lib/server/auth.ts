import { cookies } from 'next/headers';
import { API_URL } from '../api/constants';
import { User } from '../api/types';
import { cache } from 'react';

// Cache the fetch function to dedupe requests
const fetchFromAPI = cache(async (endpoint: string) => {
  const cookieStore = await cookies();
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Cookie: cookieStore.toString(),
      'x-client-type': 'web',
    },
    credentials: 'include',
    // Disable caching for auth requests
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
});

// Cache the getUser function
export const getUser = cache(async () => {
  try {
    const data = await fetchFromAPI('/auth/me');
    return data?.data as User | null;
  } catch (error) {
    return null;
  }
}); 