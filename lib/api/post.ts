import api from "./client";
import type { ApiResponse } from "./types";

// Post types
export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export type CreatePostInput = Pick<Post, "title" | "content">;
export type UpdatePostInput = Partial<CreatePostInput>;

export const postsApi = {
  getPosts: async () => {
    const response = await api.get<ApiResponse<Post[]>>("/posts");
    return response.data.data;
  },

  getPost: async (id: number) => {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data;
  },

  createPost: async (data: CreatePostInput) => {
    const response = await api.post<ApiResponse<Post>>("/posts", data);
    return response.data.data;
  },

  updatePost: async (id: number, data: UpdatePostInput) => {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}`, data);
    return response.data.data;
  },

  deletePost: async (id: number) => {
    const response = await api.delete<ApiResponse<void>>(`/posts/${id}`);
    return response.data;
  },

  togglePublish: async (id: number) => {
    const response = await api.patch<ApiResponse<Post>>(`/posts/${id}/publish`);
    return response.data.data;
  }
};