'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  PlusCircle,
  LayoutTemplate,
  Settings,
  LogOut,
  ChevronsUpDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { usePRDStore } from '@/stores/prd.store';
import { DocStatus } from '@/types/prd.types';
import { formatRelativeTime } from '@/lib/utils/format';
import { WorkspaceSwitcher } from './WorkspaceSwitcher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const STATUS_LABEL: Record<DocStatus, string> = {
  [DocStatus.DRAFT]: '초안',
  [DocStatus.IN_REVIEW]: '검토중',
  [DocStatus.FINALIZED]: '확정',
  [DocStatus.ARCHIVED]: '보관',
};

const STATUS_VARIANT: Record<DocStatus, 'secondary' | 'outline' | 'default'> = {
  [DocStatus.DRAFT]: 'secondary',
  [DocStatus.IN_REVIEW]: 'outline',
  [DocStatus.FINALIZED]: 'default',
  [DocStatus.ARCHIVED]: 'secondary',
};

export function DesktopSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const prdList = usePRDStore((s) => s.prdList);
  const recentPrds = prdList.slice(0, 5);

  const navItems = [
    {
      href: ROUTES.DASHBOARD,
      label: '내 PRD',
      icon: FileText,
      active: pathname === ROUTES.DASHBOARD,
    },
  ];

  return (
    <aside className="flex h-full w-60 flex-col border-r bg-card">
      {/* 워크스페이스 */}
      <div className="p-3">
        <WorkspaceSwitcher />
      </div>

      <Separator />

      {/* 메인 네비게이션 */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => (
          <Button
            key={item.href}
            render={<Link href={item.href} />}
            variant="ghost"
            className={cn(
              'w-full justify-start gap-2 px-2',
              item.active && 'bg-muted text-foreground',
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Button>
        ))}

        {/* 새 PRD 작성 CTA */}
        <Button
          render={<Link href={ROUTES.PRD_NEW} />}
          className="mt-2 w-full gap-2"
        >
          <PlusCircle className="size-4" />
          새 PRD 작성
        </Button>

        {/* 템플릿 (향후) */}
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-2 text-muted-foreground"
          disabled
        >
          <LayoutTemplate className="size-4" />
          템플릿
          <span className="ml-auto text-[10px]">곧 출시</span>
        </Button>

        <Separator className="my-3" />

        {/* 최근 PRD */}
        {recentPrds.length > 0 && (
          <div className="space-y-1">
            <p className="px-2 text-xs font-medium text-muted-foreground">
              최근 PRD
            </p>
            {recentPrds.map((prd) => (
              <Button
                key={prd.id}
                render={<Link href={ROUTES.PRD_EDIT(prd.id)} />}
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-2 px-2 h-auto py-1.5',
                  pathname === ROUTES.PRD_EDIT(prd.id) &&
                    'bg-muted text-foreground',
                )}
              >
                <div className="flex flex-1 flex-col items-start gap-0.5 overflow-hidden">
                  <span className="w-full truncate text-left text-sm">
                    {prd.title}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={STATUS_VARIANT[prd.status]}
                      className="h-4 px-1 text-[10px]"
                    >
                      {STATUS_LABEL[prd.status]}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {formatRelativeTime(prd.updatedAt)}
                    </span>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}

        <Separator className="my-3" />

        {/* 설정 */}
        <Button
          render={<Link href={ROUTES.SETTINGS} />}
          variant="ghost"
          className={cn(
            'w-full justify-start gap-2 px-2',
            pathname.startsWith('/settings') && 'bg-muted text-foreground',
          )}
        >
          <Settings className="size-4" />
          설정
        </Button>
      </nav>

      <Separator />

      {/* 사용자 프로필 */}
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 px-2 h-auto py-2"
              />
            }
          >
            <Avatar size="sm">
              {user?.profileImage && (
                <AvatarImage src={user.profileImage} alt={user.name} />
              )}
              <AvatarFallback>
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
            <ChevronsUpDown className="size-4 text-muted-foreground" />
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
