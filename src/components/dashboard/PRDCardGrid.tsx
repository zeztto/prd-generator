'use client';

import type { PRDSummary } from '@/types/prd.types';
import { PRDCard } from './PRDCard';
import { Skeleton } from '@/components/ui/skeleton';

function PRDCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-card p-4 ring-1 ring-foreground/10">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="size-7 rounded-full" />
      </div>
    </div>
  );
}

interface PRDCardGridProps {
  prds: PRDSummary[];
  isLoading: boolean;
}

export function PRDCardGrid({ prds, isLoading }: PRDCardGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <PRDCardSkeleton />
        <PRDCardSkeleton />
        <PRDCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {prds.map((prd) => (
        <PRDCard key={prd.id} prd={prd} />
      ))}
    </div>
  );
}
