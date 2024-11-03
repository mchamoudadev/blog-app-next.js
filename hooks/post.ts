import { useMutation, useSuspenseQuery, useQueryClient } from '@tanstack/react-query';
import { postApi } from '@/lib/api/post';
import type { CreatePostInput } from '@/lib/api/types';

export function usePosts() {
  return useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: postApi.getAll,
  });
}

export function usePost(id: string) {
  return useSuspenseQuery({
    queryKey: ['posts', id],
    queryFn: () => postApi.getById(id),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePostInput) => postApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}