'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, PlusCircle, LayoutTemplate, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';

const navItems = [
  {
    href: ROUTES.DASHBOARD,
    label: '내 PRD',
    icon: FileText,
    matchExact: true,
  },
  {
    href: ROUTES.PRD_NEW,
    label: '새 PRD',
    icon: PlusCircle,
    matchExact: true,
  },
  {
    href: '#templates',
    label: '템플릿',
    icon: LayoutTemplate,
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
    <nav className="fixed inset-x-0 bottom-0 z-40 h-14 border-t bg-card/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)] xl:hidden">
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.matchExact
            ? pathname === item.href
            : pathname.startsWith(item.href);

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex flex-1 flex-col items-center gap-0.5 py-1 text-muted-foreground/50"
              >
                <item.icon className="size-5" />
                <span className="text-[10px]">{item.label}</span>
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
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <item.icon className="size-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
