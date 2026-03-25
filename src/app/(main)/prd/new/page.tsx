'use client';

import { useRouter } from 'next/navigation';
import { Step1ProjectSetup } from '@/components/prd/steps/Step1ProjectSetup';
import { usePRDStore } from '@/stores/prd.store';
import { mockPRDService } from '@/lib/mock/services/prd.service';
import { ROUTES } from '@/constants/routes';
import { useEffect } from 'react';

export default function NewPRDPage() {
  const router = useRouter();
  const resetPRD = usePRDStore((s) => s.resetPRD);
  const projectSetup = usePRDStore((s) => s.projectSetup);
  const setCurrentPRDId = usePRDStore((s) => s.setCurrentPRDId);
  const setStep = usePRDStore((s) => s.setStep);

  // 새 PRD 시작 시 스토어 초기화
  useEffect(() => {
    resetPRD();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = async () => {
    try {
      // Mock PRD 생성
      const prd = await mockPRDService.create({
        title: projectSetup.title,
        description: projectSetup.description,
        projectSetup,
      });

      setCurrentPRDId(prd.id);
      setStep(2);

      // 편집 페이지로 이동
      router.push(`${ROUTES.PRD_EDIT(prd.id)}?step=2&sub=0`);
    } catch (error) {
      console.error('PRD 생성 실패:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <Step1ProjectSetup onComplete={handleComplete} />
      </div>
    </div>
  );
}
