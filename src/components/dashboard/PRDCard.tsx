'use client';

import { useRouter } from 'next/navigation';
import { MoreHorizontal, Pencil, Copy, Trash2 } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ROUTES } from '@/constants/routes';
import { DocStatus } from '@/types/prd.types';
import type { PRDSummary } from '@/types/prd.types';
import { formatRelativeTime } from '@/lib/utils/format';

const STATUS_CONFIG: Record<
  DocStatus,
  { label: string; variant: 'secondary' | 'outline' | 'default'; className: string }
> = {
  [DocStatus.DRAFT]: {
    label: '초안',
    variant: 'secondary',
    className: '',
  },
  [DocStatus.IN_REVIEW]: {
    label: '검토중',
    variant: 'outline',
    className: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
  },
  [DocStatus.FINALIZED]: {
    label: '확정',
    variant: 'default',
    className: 'bg-green-600 text-white',
  },
  [DocStatus.ARCHIVED]: {
    label: '보관',
    variant: 'secondary',
    className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  },
};

function QualityScoreIndicator({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'text-green-600 dark:text-green-400'
      : score >= 50
        ? 'text-yellow-600 dark:text-yellow-400'
        : 'text-muted-foreground';

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative size-7">
        <svg className="size-7 -rotate-90" viewBox="0 0 28 28">
          <circle
            cx="14"
            cy="14"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-muted/50"
          />
          <circle
            cx="14"
            cy="14"
            r="11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${(score / 100) * 69.1} 69.1`}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-semibold ${color}`}>
          {score}
        </span>
      </div>
    </div>
  );
}

interface PRDCardProps {
  prd: PRDSummary;
}

export function PRDCard({ prd }: PRDCardProps) {
  const router = useRouter();
  const statusConfig = STATUS_CONFIG[prd.status];

  const handleClick = () => {
    router.push(ROUTES.PRD_EDIT(prd.id));
  };

  return (
    <Card
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="truncate">{prd.title}</CardTitle>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={(e) => e.stopPropagation()}
                />
              }
            >
              <MoreHorizontal className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <DropdownMenuItem
                className="gap-2"
                onSelect={() => router.push(ROUTES.PRD_EDIT(prd.id))}
              >
                <Pencil className="size-4" />
                편집
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Copy className="size-4" />
                복제
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2" variant="destructive">
                <Trash2 className="size-4" />
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
        <CardDescription className="line-clamp-2">
          {prd.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge
              variant={statusConfig.variant}
              className={statusConfig.className}
            >
              {statusConfig.label}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(prd.updatedAt)}
            </span>
          </div>
          {prd.qualityScore > 0 && (
            <QualityScoreIndicator score={prd.qualityScore} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
