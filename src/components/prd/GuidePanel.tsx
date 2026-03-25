'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getGuideText } from '@/constants/guide-texts';
import { getGuideContent } from '@/lib/mock/data/guide-content';
import { PRD_STEPS } from '@/constants/prd-steps';
import { ChevronRight, Lightbulb, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUIStore } from '@/stores/ui.store';

interface GuidePanelProps {
  currentStep: number;
}

export function GuidePanel({ currentStep }: GuidePanelProps) {
  const guidePanelOpen = useUIStore((s) => s.guidePanelOpen);
  const toggleGuidePanel = useUIStore((s) => s.toggleGuidePanel);

  const stepData = PRD_STEPS.find((s) => s.step === currentStep);
  const sectionId = stepData?.id ?? 'project-setup';

  const guideText = getGuideText(sectionId);
  const guideContent = getGuideContent(sectionId);

  if (!guidePanelOpen) {
    return (
      <div className="hidden lg:flex flex-col items-center pt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleGuidePanel}
          className="rotate-0"
        >
          <Lightbulb className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex w-80 shrink-0 flex-col border-l bg-muted/30">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-amber-500" />
          <span className="text-sm font-medium">작성 가이드</span>
        </div>
        <Button variant="ghost" size="icon-xs" onClick={toggleGuidePanel}>
          <X className="size-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="space-y-4 p-4">
          {/* 섹션 설명 */}
          {guideText && (
            <div>
              <h3 className="text-sm font-medium mb-1.5">{guideText.sectionName}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {guideText.description}
              </p>
            </div>
          )}

          {/* 좋은 예시 */}
          {guideContent && guideContent.goodExamples.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsUp className="size-3.5 text-green-600" />
                <span className="text-xs font-medium text-green-700">좋은 예시</span>
              </div>
              <div className="space-y-2">
                {guideContent.goodExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-md bg-green-50 border border-green-200 p-2.5 text-xs text-green-800 leading-relaxed dark:bg-green-950/30 dark:border-green-900 dark:text-green-300"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 나쁜 예시 */}
          {guideContent && guideContent.badExamples.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <ThumbsDown className="size-3.5 text-red-600" />
                <span className="text-xs font-medium text-red-700">피해야 할 예시</span>
              </div>
              <div className="space-y-2">
                {guideContent.badExamples.map((ex, i) => (
                  <div
                    key={i}
                    className="rounded-md bg-red-50 border border-red-200 p-2.5 text-xs text-red-800 leading-relaxed dark:bg-red-950/30 dark:border-red-900 dark:text-red-300"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 작성 팁 */}
          {guideContent && guideContent.writingTips.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Lightbulb className="size-3.5 text-amber-500" />
                <span className="text-xs font-medium">작성 팁</span>
              </div>
              <ul className="space-y-1.5">
                {guideContent.writingTips.map((tip, i) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                    <ChevronRight className="size-3 shrink-0 mt-0.5 text-amber-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
