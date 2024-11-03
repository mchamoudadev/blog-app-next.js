import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostsSkeleton() {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2 w-full">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function PostDetailSkeleton() {
  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 