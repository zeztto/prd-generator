'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { DocStatus } from '@/types/prd.types';

const STATUS_FILTER_OPTIONS = [
  { value: 'ALL', label: '전체' },
  { value: DocStatus.DRAFT, label: '초안' },
  { value: DocStatus.IN_REVIEW, label: '검토중' },
  { value: DocStatus.FINALIZED, label: '확정' },
  { value: DocStatus.ARCHIVED, label: '보관' },
];

interface DashboardHeaderProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  totalCount: number;
}

export function DashboardHeader({
  statusFilter,
  onStatusFilterChange,
  totalCount,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-4">
      {/* 제목 + 새 PRD 버튼 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">내 PRD</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            총 {totalCount}개의 문서
          </p>
        </div>

        <Button
          nativeButton={false}
          render={<Link href={ROUTES.PRD_NEW} />}
          className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">새 PRD 작성</span>
          <span className="sm:hidden">새 PRD</span>
        </Button>
      </div>

      {/* 필터 탭/칩 */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {STATUS_FILTER_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onStatusFilterChange(option.value)}
            className={cn(
              'inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap',
              statusFilter === option.value
                ? 'bg-foreground text-background shadow-sm'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
