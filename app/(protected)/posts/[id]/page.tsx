import { Suspense } from 'react';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import PostDetail from '@/components/posts/PostDetail';
import { PostDetailSkeleton } from '@/components/skeletons';
import { getPost } from '@/lib/server/posts';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PostPage({
  params,
}: PageProps) {
  // Await the params
  const { id } = await params;
  
  const queryClient = new QueryClient();
  
  // Prefetch data
  const post = await getPost(id);
  await queryClient.prefetchQuery({
    queryKey: ['posts', id],
    queryFn: () => post,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail id={id} />
      </Suspense>
    </HydrationBoundary>
  );
} 