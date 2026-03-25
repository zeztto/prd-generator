'use client';

import { useEffect, useState } from 'react';
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
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [hydrated, setHydrated] = useState(false);

  // Zustand persist 하이드레이션 대기
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hydrated, isAuthenticated, router]);

  // 하이드레이션 전이나 미인증 시 빈 화면 (깜빡임 방지)
  if (!hydrated || !isAuthenticated) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <ResponsiveShell>{children}</ResponsiveShell>;
}
