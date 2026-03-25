'use client';

import { useCallback, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { usePRDStore } from '@/stores/prd.store';
import { PRD_STEPS, TOTAL_STEPS } from '@/constants/prd-steps';

export function useStepNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentStep = usePRDStore((s) => s.currentStep);
  const currentSubStep = usePRDStore((s) => s.currentSubStep);
  const setStep = usePRDStore((s) => s.setStep);
  const setSubStep = usePRDStore((s) => s.setSubStep);

  // URL -> 스토어 동기화
  useEffect(() => {
    const stepParam = searchParams.get('step');
    const subParam = searchParams.get('sub');

    if (stepParam) {
      const step = parseInt(stepParam, 10);
      if (step >= 1 && step <= TOTAL_STEPS && step !== currentStep) {
        setStep(step);
      }
    }
    if (subParam) {
      const sub = parseInt(subParam, 10);
      if (sub >= 0 && sub !== currentSubStep) {
        setSubStep(sub);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 스토어 -> URL 동기화
  const syncURL = useCallback(
    (step: number, sub: number) => {
      const params = new URLSearchParams();
      params.set('step', String(step));
      params.set('sub', String(sub));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname],
  );

  const currentStepData = PRD_STEPS.find((s) => s.step === currentStep);
  const totalSubSteps = currentStepData?.subSteps?.length ?? 0;

  const goNext = useCallback(() => {
    if (totalSubSteps > 0 && currentSubStep < totalSubSteps - 1) {
      const nextSub = currentSubStep + 1;
      setSubStep(nextSub);
      syncURL(currentStep, nextSub);
    } else if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setStep(nextStep);
      syncURL(nextStep, 0);
    }
  }, [currentStep, currentSubStep, totalSubSteps, setStep, setSubStep, syncURL]);

  const goPrev = useCallback(() => {
    if (currentSubStep > 0) {
      const prevSub = currentSubStep - 1;
      setSubStep(prevSub);
      syncURL(currentStep, prevSub);
    } else if (currentStep > 1) {
      const prevStep = currentStep - 1;
      const prevStepData = PRD_STEPS.find((s) => s.step === prevStep);
      const prevSubSteps = prevStepData?.subSteps?.length ?? 0;
      const lastSub = prevSubSteps > 0 ? prevSubSteps - 1 : 0;
      setStep(prevStep);
      setSubStep(lastSub);
      syncURL(prevStep, lastSub);
    }
  }, [currentStep, currentSubStep, setStep, setSubStep, syncURL]);

  const goToStep = useCallback(
    (step: number, subStep: number = 0) => {
      if (step >= 1 && step <= TOTAL_STEPS) {
        setStep(step);
        setSubStep(subStep);
        syncURL(step, subStep);
      }
    },
    [setStep, setSubStep, syncURL],
  );

  // 전체 진행률 계산
  const calculateProgress = useCallback(() => {
    let completedUnits = 0;
    let totalUnits = 0;

    for (const step of PRD_STEPS) {
      const subCount = step.subSteps?.length ?? 1;
      totalUnits += subCount;

      if (step.step < currentStep) {
        completedUnits += subCount;
      } else if (step.step === currentStep) {
        if (step.subSteps && step.subSteps.length > 0) {
          completedUnits += currentSubStep;
        }
      }
    }

    return totalUnits > 0 ? Math.round((completedUnits / totalUnits) * 100) : 0;
  }, [currentStep, currentSubStep]);

  const isFirstStep = currentStep === 1 && currentSubStep === 0;
  const isLastStep = currentStep === TOTAL_STEPS;

  return {
    currentStep,
    currentSubStep,
    currentStepData,
    totalSubSteps,
    goNext,
    goPrev,
    goToStep,
    isFirstStep,
    isLastStep,
    progress: calculateProgress(),
  };
}
