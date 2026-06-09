'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';
import { ResponsiveShell } from '@/components/layout/ResponsiveShell';
import { ROUTES } from '@/constants/routes';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isBootstrapping = useAuthStore((s) => s.isBootstrapping);
  const refreshSession = useAuthStore((s) => s.refreshSession);

  useEffect(() => {
    if (hasHydrated) {
      void refreshSession();
    }
  }, [hasHydrated, refreshSession]);

  useEffect(() => {
    if (hasHydrated && !isBootstrapping && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hasHydrated, isAuthenticated, isBootstrapping, router]);

  if (!hasHydrated || isBootstrapping || !isAuthenticated) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <ResponsiveShell>{children}</ResponsiveShell>;
}
