import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi, type CreatePostInput, type UpdatePostInput } from "@/lib/api/post";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => postsApi.getPost(id),
    enabled: !!id, // Only fetch when id is provided
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.createPost,
    onSuccess: () => {
      // Invalidate posts list after creating new post
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostInput }) => 
      postsApi.updatePost(id, data),
    onSuccess: (updatedPost) => {
      // Update both posts list and individual post cache
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["posts", updatedPost.id], updatedPost);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.deletePost,
    onSuccess: (_data, deletedId) => {
      // Remove post from cache and update list
      queryClient.removeQueries({ queryKey: ["posts", deletedId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useTogglePublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postsApi.togglePublish,
    onSuccess: (updatedPost) => {
      // Update both posts list and individual post cache
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.setQueryData(["posts", updatedPost.id], updatedPost);
    },
  });
}