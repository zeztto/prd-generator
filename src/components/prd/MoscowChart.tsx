'use client';

import { FeaturePriority, type Feature } from '@/types/prd.types';
import { cn } from '@/lib/utils';

interface MoscowChartProps {
  features: Feature[];
}

const CATEGORIES = [
  { value: FeaturePriority.MUST, label: 'Must', color: 'bg-red-500' },
  { value: FeaturePriority.SHOULD, label: 'Should', color: 'bg-orange-500' },
  { value: FeaturePriority.COULD, label: 'Could', color: 'bg-blue-500' },
  { value: FeaturePriority.WONT, label: "Won't", color: 'bg-gray-400' },
];

export function MoscowChart({ features }: MoscowChartProps) {
  const total = features.length;

  if (total === 0) {
    return (
      <div className="rounded-lg border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
        기능을 추가하면 MoSCoW 분포가 여기에 표시됩니다.
      </div>
    );
  }

  const counts = CATEGORIES.map((cat) => ({
    ...cat,
    count: features.filter((f) => f.priority === cat.value).length,
  }));

  return (
    <div className="rounded-lg border bg-background p-4">
      <h4 className="text-xs font-medium text-muted-foreground mb-3">MoSCoW 분포</h4>

      {/* 가로 바 */}
      <div className="h-6 w-full rounded-full overflow-hidden flex">
        {counts.map(
          (cat) =>
            cat.count > 0 && (
              <div
                key={cat.value}
                className={cn('h-full transition-all duration-300', cat.color)}
                style={{ width: `${(cat.count / total) * 100}%` }}
              />
            ),
        )}
      </div>

      {/* 범례 */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
        {counts.map((cat) => (
          <div key={cat.value} className="flex items-center gap-1.5">
            <div className={cn('size-2.5 rounded-full', cat.color)} />
            <span className="text-xs text-muted-foreground">
              {cat.label}: {cat.count}개 ({total > 0 ? Math.round((cat.count / total) * 100) : 0}
              %)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
