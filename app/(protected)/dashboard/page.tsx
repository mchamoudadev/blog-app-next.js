import { Suspense } from 'react';
import PostList from '@/components/posts/PostList';
import CreatePostButton from '@/components/posts/CreatePostButton';
import { PostsSkeleton } from '@/components/skeletons';

export default function DashboardPage() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Posts</h1>
        <CreatePostButton />
      </div>
      <Suspense fallback={<PostsSkeleton />}>
        <PostList />
      </Suspense>
    </div>
  );
} 