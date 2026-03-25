'use client';

import { ChevronDown, Check, Plus, Building2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export function WorkspaceSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="w-full justify-start gap-2.5 px-2 h-9"
          />
        }
      >
        <div className="flex size-6 items-center justify-center rounded-md bg-brand text-brand-foreground text-xs font-bold">
          P
        </div>
        <span className="flex-1 truncate text-left text-sm font-medium">
          개인 워크스페이스
        </span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem className="gap-2.5">
          <div className="flex size-5 items-center justify-center rounded bg-brand text-brand-foreground text-[10px] font-bold">
            P
          </div>
          <span className="flex-1 text-sm">개인 워크스페이스</span>
          <Check className="size-4 text-brand" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2.5 text-muted-foreground" disabled>
          <Plus className="size-4" />
          <span className="text-sm">새 팀 만들기</span>
          <span className="ml-auto text-[10px] opacity-60">곧 출시</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
