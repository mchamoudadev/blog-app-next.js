"use client";

import { useLogout, useUser } from "@/hooks/auth";

export default function Home() {
  const { data: user, isLoading, isError } = useUser();
  const logout = useLogout();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        {user ? (
          <>
            <p>Welcome, {user.email}</p>
            <button onClick={() => logout.mutate()}>Logout</button>
          </>
        ) : null}
      </div>
    </div>
  );
}
