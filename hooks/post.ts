import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postApi } from "@/lib/api/post";
import type { CreatePostInput } from "@/lib/api/types";

export function useCreatePost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePostInput) => postApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postApi.getAll,
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => postApi.getById(id),
  });
}