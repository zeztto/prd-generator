'use client';

import { Button } from '@/components/ui/button';
import { SaveIndicator } from '@/components/common/SaveIndicator';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import type { SaveStatus } from '@/hooks/useAutoSave';
import { TOTAL_STEPS } from '@/constants/prd-steps';

interface StepNavigationProps {
  currentStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  onPrev: () => void;
  onNext: () => void;
  saveStatus: SaveStatus;
  lastSavedAt: string | null;
}

export function StepNavigation({
  currentStep,
  isFirstStep,
  isLastStep,
  onPrev,
  onNext,
  saveStatus,
  lastSavedAt,
}: StepNavigationProps) {
  return (
    <div className="sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur-sm px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isFirstStep}
          size="default"
        >
          <ChevronLeft className="size-4" data-icon="inline-start" />
          이전
        </Button>

        <SaveIndicator status={saveStatus} lastSavedAt={lastSavedAt} />

        <Button onClick={onNext}>
          {isLastStep ? (
            <>
              <Download className="size-4" data-icon="inline-start" />
              내보내기
            </>
          ) : currentStep === TOTAL_STEPS - 1 ? (
            '완료'
          ) : (
            <>
              다음
              <ChevronRight className="size-4" data-icon="inline-end" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
