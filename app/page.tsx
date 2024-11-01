"use client";

import { useLogout, useUser } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { data: user, isLoading, isError } = useUser();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push('/login');
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading user data. Please try logging in again.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-6 w-6" />
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user && (
            <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              {user.name && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg">{user.name}</p>
                </div>
              )}
              <Button 
                variant="destructive" 
                onClick={handleLogout}
                disabled={logout.isPending}
                className="mt-4"
              >
                {logout.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
