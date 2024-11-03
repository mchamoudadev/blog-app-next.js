"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePost } from "@/hooks/post";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostDetail({ id }: { id: string }) {
  const { data: post } = usePost(id);

  if (!post) return null;

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/dashboard">
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