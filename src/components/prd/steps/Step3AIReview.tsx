'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { mockAIService } from '@/lib/mock/services/ai.service';
import { QualityScoreChart } from '@/components/prd/QualityScoreChart';
import { ReviewCard } from '@/components/prd/cards/ReviewCard';
import type { PRDDocument, ReviewItem } from '@/types/prd.types';

export function Step3AIReview() {
  const reviewResult = usePRDStore((s) => s.reviewResult);
  const isReviewing = usePRDStore((s) => s.isReviewing);
  const setReviewResult = usePRDStore((s) => s.setReviewResult);
  const setIsReviewing = usePRDStore((s) => s.setIsReviewing);
  const getCurrentPRDData = usePRDStore((s) => s.getCurrentPRDData);
  const currentPRDId = usePRDStore((s) => s.currentPRDId);

  const [dismissedItems, setDismissedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!reviewResult && !isReviewing) {
      runReview();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runReview = async () => {
    setIsReviewing(true);
    try {
      const prdData = getCurrentPRDData();
      const fullPRD: PRDDocument = {
        ...prdData,
        id: currentPRDId ?? 'temp',
        authorId: 'user-001',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const result = await mockAIService.review(fullPRD);
      setReviewResult(result);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleDismiss = (itemId: string) => {
    setDismissedItems((prev) => new Set(prev).add(itemId));
  };

  if (isReviewing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <div className="text-center">
          <h3 className="text-lg font-medium mb-1">AI가 PRD를 분석하고 있습니다</h3>
          <p className="text-sm text-muted-foreground">
            완성도, 명확성, 일관성, 구체성을 검토합니다...
          </p>
        </div>
      </div>
    );
  }

  if (!reviewResult) {
    return null;
  }

  const visibleItems = reviewResult.items.filter(
    (item) => !dismissedItems.has(item.id),
  );

  const errorItems = visibleItems.filter((item) => item.type === 'error');
  const warningItems = visibleItems.filter((item) => item.type === 'warning');
  const suggestionItems = visibleItems.filter((item) => item.type === 'suggestion');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-1">AI 검토 결과</h2>
        <p className="text-sm text-muted-foreground">
          {reviewResult.summary}
        </p>
      </div>

      {/* 품질 점수 */}
      <div className="flex flex-col items-center py-4">
        <QualityScoreChart score={reviewResult.qualityScore.overall} />

        {/* 세부 점수 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-md">
          {[
            { label: '완성도', value: reviewResult.qualityScore.completeness },
            { label: '명확성', value: reviewResult.qualityScore.clarity },
            { label: '일관성', value: reviewResult.qualityScore.consistency },
            { label: '구체성', value: reviewResult.qualityScore.specificity },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-lg font-semibold tabular-nums">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 검토 결과 카드 */}
      <div className="space-y-6">
        {errorItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-red-600">
              중요 ({errorItems.length})
            </h3>
            {errorItems.map((item) => (
              <ReviewCard
                key={item.id}
                item={item}
                onFix={() => {}}
                onDismiss={() => handleDismiss(item.id)}
              />
            ))}
          </div>
        )}

        {warningItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-yellow-600">
              권장 ({warningItems.length})
            </h3>
            {warningItems.map((item) => (
              <ReviewCard
                key={item.id}
                item={item}
                onFix={() => {}}
                onDismiss={() => handleDismiss(item.id)}
              />
            ))}
          </div>
        )}

        {suggestionItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-blue-600">
              제안 ({suggestionItems.length})
            </h3>
            {suggestionItems.map((item) => (
              <ReviewCard
                key={item.id}
                item={item}
                onDismiss={() => handleDismiss(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
