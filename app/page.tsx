"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePosts } from "@/hooks/post";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  const { isAuthenticated } = useAuthStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        {isAuthenticated && (
          <Link href="/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </Link>
        )}
      </div>

      {posts?.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              No posts yet. Be the first to create one!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts?.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2">
                      <CardTitle>{post.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {post.user?.email} • {formatDate(post.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {post.content}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
