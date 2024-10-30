"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/menuToggle";
import { PenLine } from "lucide-react";
import { useUser } from "@/hooks/auth";

export default function Navbar() {
  //   if (user.isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          BlogSpace
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/create">
            <Button variant="ghost" size="sm">
              <PenLine className="mr-2 h-4 w-4" />
              Write
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
