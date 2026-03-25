'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, FileText } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUIStore } from '@/stores/ui.store';
import { useAuth } from '@/hooks/useAuth';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ROUTES } from '@/constants/routes';

export function ResponsiveShell({ children }: { children: React.ReactNode }) {
  const { isMobile, isDesktop } = useMediaQuery();
  const { user } = useAuth();
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setMobileMenuOpen);
  const pathname = usePathname();

  // 데스크톱 (xl: 이상) - 고정 사이드바 + 메인
  if (isDesktop) {
    return (
      <div className="flex h-dvh">
        <DesktopSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    );
  }

  // 태블릿 + 모바일 - 상단 헤더 + Sheet 사이드바 + 바텀 네비(모바일만)
  return (
    <div className="flex h-dvh flex-col">
      {/* 상단 헤더 */}
      <header className="flex h-14 items-center justify-between border-b bg-card px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-1.5 font-semibold"
          >
            <FileText className="size-5 text-primary" />
            <span className="text-sm"><span className="font-bold">prd</span><span className="text-primary">.ai</span></span>
          </Link>
        </div>

        <Link href={ROUTES.SETTINGS}>
          <Avatar size="sm">
            {user?.profileImage && (
              <AvatarImage src={user.profileImage} alt={user.name} />
            )}
            <AvatarFallback>
              {user?.name?.charAt(0) ?? '?'}
            </AvatarFallback>
          </Avatar>
        </Link>
      </header>

      {/* Sheet 사이드바 오버레이 */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72 p-0" showCloseButton>
          <SheetHeader className="sr-only">
            <SheetTitle>메뉴</SheetTitle>
          </SheetHeader>
          {/* DesktopSidebar 재활용, 클릭 시 Sheet 닫기 */}
          <div onClick={() => setMobileMenuOpen(false)} className="h-full">
            <DesktopSidebar />
          </div>
        </SheetContent>
      </Sheet>

      {/* 메인 콘텐츠 */}
      <main className={`flex-1 overflow-y-auto ${isMobile ? 'pb-14' : ''}`}>
        {children}
      </main>

      {/* 모바일 바텀 네비 */}
      {isMobile && <MobileBottomNav />}
    </div>
  );
}
