import { getUser } from '@/lib/server/auth';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { User } from '@/lib/api/types';

function StoreInitializer({ user }: { user: User }) {
  useAuthStore.getState().setUser(user);
  return null;
}

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const user = await getUser();
    if (!user) {
      redirect('/login');
    }

    return (
      <>
        <StoreInitializer user={user} />
        {children}
      </>
    );
  } catch (error) {
    redirect('/login');
  }
} 