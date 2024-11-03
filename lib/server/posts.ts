import { cookies } from 'next/headers';
import { API_URL } from '../api/constants';
import { Post } from '../api/types';

export async function getPosts() {
  const cookieStore = cookies();
  
  const response = await fetch(`${API_URL}/posts`, {
    headers: {
      Cookie: cookieStore.toString(),
      'x-client-type': 'web',
    },
    credentials: 'include',
    next: { tags: ['posts'] },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.data as Post[];
}

export async function getPost(id: string) {
  const cookieStore = cookies();
  
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
      'x-client-type': 'web',
    },
    credentials: 'include',
    next: { tags: ['posts'] },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.data as Post;
} 