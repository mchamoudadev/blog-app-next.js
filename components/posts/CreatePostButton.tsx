"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CreatePostButton() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  return (
    <Link href="/create">
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Post
      </Button>
    </Link>
  );
} 