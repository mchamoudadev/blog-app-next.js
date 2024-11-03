"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePost } from "@/hooks/post";
import { formatDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostPage() {
  const { id } = useParams();
  const { data: post, isLoading, isError } = usePost(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="container max-w-4xl py-6">
        <Card>
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                Post not found or an error occurred.
              </p>
              <Link href="/">
                <Button variant="outline">Back to Posts</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Posts
                </Button>
              </Link>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{post.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Posted by {post.user?.email} • {formatDate(post.createdAt)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 