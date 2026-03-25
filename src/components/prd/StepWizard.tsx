'use client';

import { useStepNavigation } from '@/hooks/useStepNavigation';
import { useAutoSave } from '@/hooks/useAutoSave';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { StepProgress } from '@/components/prd/StepProgress';
import { StepNavigation } from '@/components/prd/StepNavigation';
import { Step2_1Background } from '@/components/prd/steps/Step2_1Background';
import { Step2_2Goals } from '@/components/prd/steps/Step2_2Goals';
import { Step2_3TargetUsers } from '@/components/prd/steps/Step2_3TargetUsers';
import { Step2_4Features } from '@/components/prd/steps/Step2_4Features';
import { Step2_5Solution } from '@/components/prd/steps/Step2_5Solution';
import { Step2_6Scope } from '@/components/prd/steps/Step2_6Scope';
import { Step3AIReview } from '@/components/prd/steps/Step3AIReview';
import { Step4Preview } from '@/components/prd/steps/Step4Preview';
import { Step5Export } from '@/components/prd/steps/Step5Export';
import { ScrollArea } from '@/components/ui/scroll-area';

export function StepWizard() {
  const nav = useStepNavigation();
  const { saveStatus, lastSavedAt } = useAutoSave();
  useKeyboardShortcut();

  const renderStep = () => {
    switch (nav.currentStep) {
      // Step 1은 /prd/new 에서 처리
      // Step 2: 서브스텝
      case 2:
        return <Step2_1Background />;
      case 3:
        return <Step2_2Goals />;
      case 4:
        return <Step2_3TargetUsers />;
      case 5:
        return <Step2_4Features />;
      case 6:
        return <Step2_5Solution />;
      case 7:
        return <Step2_6Scope />;
      // Step 8: AI 검토
      case 8:
        return <Step3AIReview />;
      // Step 9: 미리보기
      case 9:
        return <Step4Preview />;
      // Step 10: 내보내기
      case 10:
        return <Step5Export />;
      default:
        return <Step2_1Background />;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <StepProgress
        currentStep={nav.currentStep}
        progress={nav.progress}
        onStepClick={(step) => nav.goToStep(step)}
      />

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          {renderStep()}
        </div>
      </ScrollArea>

      <StepNavigation
        currentStep={nav.currentStep}
        isFirstStep={nav.currentStep <= 2}
        isLastStep={nav.isLastStep}
        onPrev={nav.goPrev}
        onNext={nav.goNext}
        saveStatus={saveStatus}
        lastSavedAt={lastSavedAt}
      />
    </div>
  );
}
