'use client';

import { useEffect, useMemo, useState } from 'react';
import { prdService } from '@/lib/services/prd.service';
import { usePRDStore } from '@/stores/prd.store';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { PRDCardGrid } from '@/components/dashboard/PRDCardGrid';
import { EmptyState } from '@/components/dashboard/EmptyState';

export default function DashboardPage() {
  const prdList = usePRDStore((s) => s.prdList);
  const isListLoading = usePRDStore((s) => s.isListLoading);
  const setPRDList = usePRDStore((s) => s.setPRDList);
  const setListLoading = usePRDStore((s) => s.setListLoading);

  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    const loadPRDs = async () => {
      setListLoading(true);
      try {
        const prds = await prdService.list();
        if (isMounted) {
          setPRDList(prds);
        }
      } finally {
        if (isMounted) {
          setListLoading(false);
        }
      }
    };

    void loadPRDs();

    return () => {
      isMounted = false;
    };
  }, [setListLoading, setPRDList]);

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
