'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Plus, BookTemplate, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

const navItems = [
  {
    href: ROUTES.DASHBOARD,
    label: '대시보드',
    icon: LayoutDashboard,
    matchExact: true,
  },
  {
    href: ROUTES.PRD_NEW,
    label: '새 PRD',
    icon: Plus,
    matchExact: true,
  },
  {
    href: '#templates',
    label: '템플릿',
    icon: BookTemplate,
    disabled: true,
    matchExact: false,
  },
  {
    href: ROUTES.SETTINGS,
    label: '설정',
    icon: Settings,
    matchExact: false,
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md pb-[env(safe-area-inset-bottom)] xl:hidden">
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.matchExact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex flex-1 flex-col items-center gap-0.5 py-1 text-muted-foreground/40"
              >
                <item.icon className="size-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 py-1 transition-colors',
                isActive
                  ? 'text-brand'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className={cn('size-5', isActive && 'stroke-[2.5]')} />
              <span className={cn('text-[10px]', isActive ? 'font-semibold' : 'font-medium')}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
