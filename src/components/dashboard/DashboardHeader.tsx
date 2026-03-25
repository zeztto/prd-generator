'use client';

import Link from 'next/link';
import { PlusCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
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
  const currentFilterLabel =
    STATUS_FILTER_OPTIONS.find((o) => o.value === statusFilter)?.label ?? '전체';

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold md:text-2xl">내 PRD</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          총 {totalCount}개의 문서
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* 상태 필터 */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1.5" />
            }
          >
            <Filter className="size-3.5" />
            <span className="hidden sm:inline">{currentFilterLabel}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>상태 필터</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={statusFilter}
              onValueChange={onStatusFilterChange}
            >
              {STATUS_FILTER_OPTIONS.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 새 PRD 작성 (데스크톱만 표시) */}
        <Button
          nativeButton={false}
          render={<Link href={ROUTES.PRD_NEW} />}
          size="sm"
          className="hidden gap-1.5 md:inline-flex"
        >
          <PlusCircle className="size-3.5" />
          새 PRD 작성
        </Button>
      </div>
    </div>
  );
}
