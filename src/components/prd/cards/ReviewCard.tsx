'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, AlertCircle, CheckCircle2, Pencil, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReviewItem } from '@/types/prd.types';

interface ReviewCardProps {
  item: ReviewItem;
  onFix?: () => void;
  onDismiss?: () => void;
}

const TYPE_CONFIG = {
  error: {
    icon: AlertCircle,
    label: '중요',
    borderColor: 'border-red-300 dark:border-red-800',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    iconColor: 'text-red-500',
    labelColor: 'text-red-700 dark:text-red-400',
  },
  warning: {
    icon: AlertTriangle,
    label: '권장',
    borderColor: 'border-yellow-300 dark:border-yellow-800',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/30',
    iconColor: 'text-yellow-500',
    labelColor: 'text-yellow-700 dark:text-yellow-400',
  },
  suggestion: {
    icon: CheckCircle2,
    label: '제안',
    borderColor: 'border-blue-300 dark:border-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    iconColor: 'text-blue-500',
    labelColor: 'text-blue-700 dark:text-blue-400',
  },
};

export function ReviewCard({ item, onFix, onDismiss }: ReviewCardProps) {
  const config = TYPE_CONFIG[item.type];
  const Icon = config.icon;

  return (
    <Card size="sm" className={cn('border', config.borderColor, config.bgColor)}>
      <CardContent>
        <div className="flex items-start gap-3">
          <Icon className={cn('size-5 shrink-0 mt-0.5', config.iconColor)} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('text-xs font-medium', config.labelColor)}>
                {config.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {item.section}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{item.message}</p>
            {item.suggestedText && (
              <div className="mt-2 rounded-md bg-background/80 p-2 text-xs text-muted-foreground">
                <span className="font-medium">제안: </span>
                {item.suggestedText}
              </div>
            )}
            <div className="flex items-center gap-2 mt-3">
              {onFix && item.type !== 'suggestion' && (
                <Button variant="outline" size="xs" onClick={onFix}>
                  <Pencil className="size-3" data-icon="inline-start" />
                  수정하기
                </Button>
              )}
              {onDismiss && (
                <Button variant="ghost" size="xs" onClick={onDismiss}>
                  <EyeOff className="size-3" data-icon="inline-start" />
                  무시
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
