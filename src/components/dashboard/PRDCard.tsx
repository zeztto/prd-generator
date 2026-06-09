'use client';

import { useRouter } from 'next/navigation';
import { MoreHorizontal, Pencil, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { prdService } from '@/lib/services/prd.service';
import { usePRDStore } from '@/stores/prd.store';
import { DocStatus } from '@/types/prd.types';
import type { PRDSummary } from '@/types/prd.types';
import { formatRelativeTime } from '@/lib/utils/format';

const STATUS_CONFIG: Record<
  DocStatus,
  { label: string; className: string }
> = {
  [DocStatus.DRAFT]: {
    label: '초안',
    className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  },
  [DocStatus.IN_REVIEW]: {
    label: '검토중',
    className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  [DocStatus.FINALIZED]: {
    label: '확정',
    className: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  [DocStatus.ARCHIVED]: {
    label: '보관',
    className: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
};

function QualityScore({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
      : score >= 50
        ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';

  return (
    <span className={cn('inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold', color)}>
      {score}
    </span>
  );
}

interface PRDCardProps {
  prd: PRDSummary;
}

export function PRDCard({ prd }: PRDCardProps) {
  const router = useRouter();
  const prdList = usePRDStore((s) => s.prdList);
  const setPRDList = usePRDStore((s) => s.setPRDList);
  const statusConfig = STATUS_CONFIG[prd.status];

  const handleClick = () => {
    router.push(ROUTES.PRD_EDIT(prd.id));
  };

  const handleDuplicate = async () => {
    const duplicated = await prdService.duplicate(prd.id);
    setPRDList([
      {
        id: duplicated.id,
        title: duplicated.title,
        description: duplicated.description,
        status: duplicated.status,
        qualityScore: duplicated.qualityScore,
        projectType: duplicated.projectSetup.projectType,
        createdAt: duplicated.createdAt,
        updatedAt: duplicated.updatedAt,
      },
      ...prdList,
    ]);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('이 PRD를 삭제하시겠습니까?');
    if (!confirmed) {
      return;
    }

    await prdService.delete(prd.id);
    setPRDList(prdList.filter((item) => item.id !== prd.id));
  };

  return (
    <div
      onClick={handleClick}
      className="group relative flex cursor-pointer flex-col rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-brand/30 hover:shadow-md"
    >
      {/* 더보기 메뉴 */}
      <div className="absolute right-3 top-3 opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={(e) => e.stopPropagation()}
                className="size-7 rounded-md"
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
            <DropdownMenuItem className="gap-2" onSelect={() => void handleDuplicate()}>
              <Copy className="size-4" />
              복제
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" variant="destructive" onSelect={() => void handleDelete()}>
              <Trash2 className="size-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 제목 */}
      <h3 className="truncate pr-8 text-base font-semibold text-foreground">
        {prd.title}
      </h3>

      {/* 설명 */}
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {prd.description}
      </p>

      {/* 하단: 상태 + 날짜 + 점수 */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium', statusConfig.className)}>
            {statusConfig.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatRelativeTime(prd.updatedAt)}
          </span>
        </div>
        {prd.qualityScore > 0 && (
          <QualityScore score={prd.qualityScore} />
        )}
      </div>
    </div>
  );
}
