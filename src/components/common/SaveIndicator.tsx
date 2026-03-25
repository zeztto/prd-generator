'use client';

import { Loader2, Check } from 'lucide-react';
import type { SaveStatus } from '@/hooks/useAutoSave';

interface SaveIndicatorProps {
  status: SaveStatus;
  lastSavedAt: string | null;
}

export function SaveIndicator({ status, lastSavedAt }: SaveIndicatorProps) {
  if (status === 'saving') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        <span>저장 중...</span>
      </div>
    );
  }

  if (status === 'saved') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="size-3 text-green-500" />
        <span>모든 변경사항 저장됨</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-1.5 text-xs text-destructive">
        <span>저장 실패</span>
      </div>
    );
  }

  if (lastSavedAt) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Check className="size-3" />
        <span>저장됨</span>
      </div>
    );
  }

  return null;
}
