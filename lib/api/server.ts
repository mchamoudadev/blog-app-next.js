import { cookies } from 'next/headers';
import { API_URL } from './constants';
import { Post, User } from './types';

async function fetchFromAPI(endpoint: string) {
  const cookieStore = cookies();
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Cookie: cookieStore.toString(),
      'x-client-type': 'web',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export async function getPosts() {
  const data = await fetchFromAPI('/posts');
  return data.data as Post[];
}

export async function getPost(id: string) {
  const data = await fetchFromAPI(`/posts/${id}`);
  return data.data as Post;
}

export async function getUser() {
  const data = await fetchFromAPI('/auth/me');
  return data.data as User;
} 