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
            className="w-full justify-start gap-2 px-2 h-9"
          />
        }
      >
        <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Building2 className="size-3.5" />
        </div>
        <span className="flex-1 truncate text-left text-sm font-medium">
          개인 워크스페이스
        </span>
        <ChevronDown className="size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem className="gap-2">
          <div className="flex size-5 items-center justify-center rounded bg-primary text-primary-foreground">
            <Building2 className="size-3" />
          </div>
          <span className="flex-1">개인 워크스페이스</span>
          <Check className="size-4 text-primary" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-muted-foreground" disabled>
          <Plus className="size-4" />
          <span>새 팀 만들기</span>
          <span className="ml-auto text-xs">곧 출시</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
