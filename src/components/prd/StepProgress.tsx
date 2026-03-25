'use client';

import { cn } from '@/lib/utils';
import { PRD_STEPS } from '@/constants/prd-steps';
import { Check } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface StepProgressProps {
  currentStep: number;
  progress: number;
  onStepClick: (step: number) => void;
}

export function StepProgress({ currentStep, progress, onStepClick }: StepProgressProps) {
  const { isMobile } = useMediaQuery();

  const currentStepData = PRD_STEPS.find((s) => s.step === currentStep);

  if (isMobile) {
    return (
      <div className="border-b bg-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            {currentStep}. {currentStepData?.title}
          </span>
          <span className="text-xs text-muted-foreground">{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-background px-6 py-4">
      <div className="flex items-center gap-1">
        {PRD_STEPS.map((step, index) => {
          const isCompleted = step.step < currentStep;
          const isCurrent = step.step === currentStep;
          const isClickable = true;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => isClickable && onStepClick(step.step)}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors',
                  isClickable && 'cursor-pointer hover:bg-muted',
                  isCurrent && 'bg-primary/10 text-primary font-medium',
                  isCompleted && 'text-muted-foreground',
                  !isCurrent && !isCompleted && 'text-muted-foreground/60',
                )}
              >
                <div
                  className={cn(
                    'flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium',
                    isCurrent && 'bg-primary text-primary-foreground',
                    isCompleted && 'bg-green-500 text-white',
                    !isCurrent && !isCompleted && 'bg-muted text-muted-foreground',
                  )}
                >
                  {isCompleted ? <Check className="size-3" /> : step.step}
                </div>
                <span className="hidden lg:inline whitespace-nowrap">{step.title}</span>
              </button>
              {index < PRD_STEPS.length - 1 && (
                <div
                  className={cn(
                    'mx-1 h-px flex-1',
                    isCompleted ? 'bg-green-500' : 'bg-border',
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground tabular-nums">{progress}%</span>
      </div>
    </div>
  );
}
