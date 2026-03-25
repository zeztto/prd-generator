'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIEnhanceButtonProps {
  onEnhance: () => void;
  isLoading?: boolean;
  label?: string;
}

export function AIEnhanceButton({
  onEnhance,
  isLoading = false,
  label = 'AI로 보강하기',
}: AIEnhanceButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onEnhance}
      disabled={isLoading}
      className="gap-1.5"
    >
      {isLoading ? (
        <Loader2 className="size-3.5 animate-spin" data-icon="inline-start" />
      ) : (
        <Sparkles className="size-3.5 text-amber-500" data-icon="inline-start" />
      )}
      {isLoading ? 'AI 분석 중...' : label}
    </Button>
  );
}
