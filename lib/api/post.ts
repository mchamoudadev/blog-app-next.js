import api from "./client";
import type { ApiResponse, Post, CreatePostInput } from "./types";

export const postApi = {
  create: async (data: CreatePostInput): Promise<Post> => {
    const response = await api.post<ApiResponse<Post>>("/posts", data);
    return response.data.data;
  },

  getAll: async (): Promise<Post[]> => {
    const response = await api.get<ApiResponse<Post[]>>("/posts");
    return response.data.data;
  },

  getById: async (id: string): Promise<Post> => {
    const response = await api.get<ApiResponse<Post>>(`/posts/${id}`);
    return response.data.data;
  },
};