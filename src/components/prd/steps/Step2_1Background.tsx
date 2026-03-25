'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePRDStore } from '@/stores/prd.store';
import { AIEnhanceButton } from '@/components/prd/AIEnhanceButton';
import { AIEnhanceModal } from '@/components/prd/AIEnhanceModal';
import { useMockAI } from '@/hooks/useMockAI';

export function Step2_1Background() {
  const background = usePRDStore((s) => s.background);
  const updateBackground = usePRDStore((s) => s.updateBackground);

  const ai = useMockAI();
  const [enhanceTarget, setEnhanceTarget] = useState<'currentSituation' | 'problemStatement' | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const handleEnhance = async (field: 'currentSituation' | 'problemStatement') => {
    const content = background[field];
    setEnhanceTarget(field);
    setOriginalText(content);
    setModalOpen(true);

    const sectionType = field === 'problemStatement' ? 'background_problem' : 'background_situation';
    await ai.enhance(sectionType, content);
  };

  const handleAccept = (text: string) => {
    if (enhanceTarget) {
      updateBackground({ [enhanceTarget]: text });
    }
    setModalOpen(false);
    ai.reset();
  };

  const handleReject = () => {
    setModalOpen(false);
    ai.reset();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">배경 및 문제 정의</h2>
        <p className="text-sm text-muted-foreground">
          프로젝트의 배경과 해결하려는 핵심 문제를 정의합니다.
        </p>
      </div>

      {/* 현재 상황 */}
      <div className="space-y-2">
        <Label>현재 상황</Label>
        <Textarea
          value={background.currentSituation}
          onChange={(e) => updateBackground({ currentSituation: e.target.value })}
          placeholder="현재 상황과 맥락을 설명하세요. 데이터나 수치를 포함하면 좋습니다."
          className="min-h-28"
        />
        <AIEnhanceButton
          onEnhance={() => handleEnhance('currentSituation')}
          isLoading={ai.isLoading && enhanceTarget === 'currentSituation'}
        />
      </div>

      {/* 핵심 문제 */}
      <div className="space-y-2">
        <Label>핵심 문제</Label>
        <Textarea
          value={background.problemStatement}
          onChange={(e) => updateBackground({ problemStatement: e.target.value })}
          placeholder="해결하려는 핵심 문제를 명확하게 기술하세요."
          className="min-h-28"
        />
        <AIEnhanceButton
          onEnhance={() => handleEnhance('problemStatement')}
          isLoading={ai.isLoading && enhanceTarget === 'problemStatement'}
        />
      </div>

      {/* AI 모달 */}
      <AIEnhanceModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        originalText={originalText}
        enhancedText={ai.result ?? ''}
        streamingText={ai.streamingText}
        isStreaming={!ai.result && ai.streamingText.length > 0}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
}
