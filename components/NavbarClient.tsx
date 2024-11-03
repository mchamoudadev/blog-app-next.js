'use client';

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth";
import { Loader2, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

export default function NavbarClient() {
  const router = useRouter();
  const { user } = useAuthStore();
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

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            BlogSpace
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/dashboard" className="hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/create" className="hover:text-primary">
                  Write
                </Link>
                <span className="text-sm text-muted-foreground">
                  {user.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  disabled={logout.isPending}
                >
                  {logout.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </>
                  )}
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 