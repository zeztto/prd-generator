'use client';

import { useEffect, useState, useMemo } from 'react';
import { usePRDStore } from '@/stores/prd.store';
import { MOCK_PRD_LIST } from '@/lib/mock/data/prds';
import { DocStatus } from '@/types/prd.types';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PRDCardGrid } from '@/components/dashboard/PRDCardGrid';
import { EmptyState } from '@/components/dashboard/EmptyState';

export default function DashboardPage() {
  const prdList = usePRDStore((s) => s.prdList);
  const isListLoading = usePRDStore((s) => s.isListLoading);
  const setPRDList = usePRDStore((s) => s.setPRDList);
  const setListLoading = usePRDStore((s) => s.setListLoading);

  const [statusFilter, setStatusFilter] = useState('ALL');

  // 초기 mock 데이터 로딩
  useEffect(() => {
    if (prdList.length === 0) {
      setListLoading(true);
      const timer = setTimeout(() => {
        setPRDList(MOCK_PRD_LIST);
        setListLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 상태 필터 적용
  const filteredPrds = useMemo(() => {
    if (statusFilter === 'ALL') return prdList;
    return prdList.filter((prd) => prd.status === statusFilter);
  }, [prdList, statusFilter]);

  const isEmpty = !isListLoading && prdList.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
      <DashboardHeader
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        totalCount={filteredPrds.length}
      />

      <div className="mt-6">
        {isEmpty ? (
          <EmptyState />
        ) : (
          <PRDCardGrid prds={filteredPrds} isLoading={isListLoading} />
        )}
      </div>
    </div>
  );
}
