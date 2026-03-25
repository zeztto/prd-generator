'use client';

import { GuidePanel } from '@/components/prd/GuidePanel';
import { GuidePanelMobile } from '@/components/prd/GuidePanelMobile';
import { PreviewPanel } from '@/components/prd/PreviewPanel';
import { usePRDStore } from '@/stores/prd.store';

export default function PRDEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentStep = usePRDStore((s) => s.currentStep);

  return (
    <div className="flex h-full overflow-hidden">
      {/* 가이드 패널 - 데스크톱 */}
      <GuidePanel currentStep={currentStep} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </div>

      {/* 미리보기 패널 - 데스크톱 */}
      <PreviewPanel />

      {/* 모바일 가이드 바텀시트 */}
      <GuidePanelMobile currentStep={currentStep} />
    </div>
  );
}
