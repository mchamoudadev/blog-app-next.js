"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { usePosts } from "@/hooks/post";

export default function PostList() {
  const { data: posts } = usePosts();

  if (posts?.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">
            No posts yet. Be the first to create one!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
} 