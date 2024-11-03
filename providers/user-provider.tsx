'use client';

import { User } from "@/lib/api/types";
import { useAuthStore } from "@/stores/authStore";
import { useEffect, useState } from "react";

export default function UserProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  const { setUser } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Set user after hydration
  useEffect(() => {
    if (isHydrated) {
      setUser(user);
    }
  }, [user, setUser, isHydrated]);

  // Show children only after hydration
  if (!isHydrated) {
    return null;
  }

  return children;
} 