'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { usePRDStore } from '@/stores/prd.store';
import { mockPRDService } from '@/lib/mock/services/prd.service';
import { StepWizard } from '@/components/prd/StepWizard';
import { Loader2 } from 'lucide-react';

export default function PRDEditPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;

  const currentPRDId = usePRDStore((s) => s.currentPRDId);
  const loadPRD = usePRDStore((s) => s.loadPRD);
  const setCurrentPRDId = usePRDStore((s) => s.setCurrentPRDId);
  const setStep = usePRDStore((s) => s.setStep);
  const setSubStep = usePRDStore((s) => s.setSubStep);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      // 이미 같은 PRD가 로드되어 있으면 스킵
      if (currentPRDId === id) {
        // URL 파라미터에서 스텝 복원
        const stepParam = searchParams.get('step');
        const subParam = searchParams.get('sub');
        if (stepParam) setStep(parseInt(stepParam, 10));
        if (subParam) setSubStep(parseInt(subParam, 10));
        return;
      }

      setIsLoading(true);
      try {
        const prd = await mockPRDService.getById(id);
        loadPRD(prd);

        // URL 파라미터에서 스텝 복원
        const stepParam = searchParams.get('step');
        const subParam = searchParams.get('sub');
        if (stepParam) setStep(parseInt(stepParam, 10));
        if (subParam) setSubStep(parseInt(subParam, 10));
      } catch (err) {
        setError('PRD를 불러올 수 없습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-6 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">PRD를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return <StepWizard />;
}
