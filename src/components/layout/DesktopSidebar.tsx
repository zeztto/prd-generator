'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Plus,
  BookTemplate,
  Settings,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function DesktopSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    {
      href: ROUTES.DASHBOARD,
      label: '대시보드',
      icon: LayoutDashboard,
      active: pathname === ROUTES.DASHBOARD,
    },
    {
      href: ROUTES.TEMPLATES,
      label: '템플릿',
      icon: BookTemplate,
      active: pathname === ROUTES.TEMPLATES,
    },
  ];

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* 로고 + 워크스페이스 */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href={ROUTES.DASHBOARD}
          className="mb-3 flex items-center gap-1.5 px-2"
        >
          <span className="text-base font-bold tracking-tight">
            prd<span className="text-brand">.ai</span>
          </span>
        </Link>
        <WorkspaceSwitcher />
      </div>

      <Separator className="mx-3" />

      {/* 새 PRD 작성 CTA */}
      <div className="px-3 pt-3">
        <Button
          nativeButton={false}
          render={<Link href={ROUTES.PRD_NEW} />}
          className="w-full gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Plus className="size-4" />
          새 PRD 작성
        </Button>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pt-3">
        {navItems.map((item) => (
          <Button
            key={item.href}
            nativeButton={false}
            render={<Link href={item.href} />}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2.5 px-2.5 font-normal',
              item.active && 'bg-brand/10 text-brand font-medium',
              !item.active && 'text-sidebar-foreground',
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Button>
        ))}
      </nav>

      <Separator className="mx-3" />

      {/* 사용자 프로필 */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="w-full justify-start gap-2.5 px-2 h-auto py-2"
              />
            }
          >
            <Avatar size="sm">
              {user?.profileImage && (
                <AvatarImage src={user.profileImage} alt={user.name} />
              )}
              <AvatarFallback className="bg-brand/10 text-brand text-xs font-medium">
                {user?.name?.charAt(0) ?? '?'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col items-start overflow-hidden">
              <span className="w-full truncate text-sm font-medium">
                {user?.name ?? '사용자'}
              </span>
              <span className="w-full truncate text-xs text-muted-foreground">
                {user?.email ?? ''}
              </span>
            </div>
            <Settings className="size-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="top" className="w-52">
            <DropdownMenuItem
              render={<Link href={ROUTES.SETTINGS} />}
              className="gap-2"
            >
              <Settings className="size-4" />
              설정
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2"
              variant="destructive"
              onSelect={logout}
            >
              <LogOut className="size-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
