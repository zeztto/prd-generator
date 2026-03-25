'use client';

import { useState } from 'react';
import { Lightbulb, ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getGuideText } from '@/constants/guide-texts';
import { getGuideContent } from '@/lib/mock/data/guide-content';
import { PRD_STEPS } from '@/constants/prd-steps';

interface GuidePanelMobileProps {
  currentStep: number;
}

export function GuidePanelMobile({ currentStep }: GuidePanelMobileProps) {
  const [open, setOpen] = useState(false);

  const stepData = PRD_STEPS.find((s) => s.step === currentStep);
  const sectionId = stepData?.id ?? 'project-setup';

  const guideText = getGuideText(sectionId);
  const guideContent = getGuideContent(sectionId);

  return (
    <>
      {/* 플로팅 버튼 */}
      <Button
        variant="default"
        size="sm"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-20 rounded-full shadow-lg lg:hidden"
      >
        <Lightbulb className="size-4" data-icon="inline-start" />
        가이드
      </Button>

      {/* 바텀시트 */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-xl p-0">
          <SheetHeader className="border-b">
            <SheetTitle className="flex items-center gap-2">
              <Lightbulb className="size-4 text-amber-500" />
              작성 가이드
            </SheetTitle>
            <SheetDescription>
              {guideText?.sectionName ?? stepData?.title}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 h-[calc(70vh-80px)] overflow-y-auto">
            <div className="space-y-4 p-4">
              {guideText && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {guideText.description}
                </p>
              )}

              {guideContent && guideContent.goodExamples.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ThumbsUp className="size-3.5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">좋은 예시</span>
                  </div>
                  <div className="space-y-2">
                    {guideContent.goodExamples.map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-green-50 border border-green-200 p-3 text-sm text-green-800 leading-relaxed dark:bg-green-950/30 dark:border-green-900 dark:text-green-300"
                      >
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guideContent && guideContent.badExamples.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ThumbsDown className="size-3.5 text-red-600" />
                    <span className="text-sm font-medium text-red-700">피해야 할 예시</span>
                  </div>
                  <div className="space-y-2">
                    {guideContent.badExamples.map((ex, i) => (
                      <div
                        key={i}
                        className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800 leading-relaxed dark:bg-red-950/30 dark:border-red-900 dark:text-red-300"
                      >
                        {ex}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {guideContent && guideContent.writingTips.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Lightbulb className="size-3.5 text-amber-500" />
                    <span className="text-sm font-medium">작성 팁</span>
                  </div>
                  <ul className="space-y-2">
                    {guideContent.writingTips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                        <ChevronRight className="size-3.5 shrink-0 mt-0.5 text-amber-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
