'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePRDStore } from '@/stores/prd.store';
import { AIEnhanceButton } from '@/components/prd/AIEnhanceButton';
import { AIEnhanceModal } from '@/components/prd/AIEnhanceModal';
import { useMockAI } from '@/hooks/useMockAI';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Step2_5Solution() {
  const solution = usePRDStore((s) => s.solution);
  const updateSolution = usePRDStore((s) => s.updateSolution);

  const ai = useMockAI();
  const [modalOpen, setModalOpen] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [alternativesOpen, setAlternativesOpen] = useState(false);

  const handleEnhance = async () => {
    setOriginalText(solution.proposedSolution);
    setModalOpen(true);
    await ai.enhance('solution_proposed', solution.proposedSolution);
  };

  const handleAccept = (text: string) => {
    updateSolution({ proposedSolution: text });
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
        <h2 className="text-lg font-semibold mb-1">솔루션 개요</h2>
        <p className="text-sm text-muted-foreground">
          문제를 해결하기 위한 제안 솔루션을 기술합니다.
        </p>
      </div>

      {/* 제안 솔루션 */}
      <div className="space-y-2">
        <Label>제안 솔루션</Label>
        <Textarea
          value={solution.proposedSolution}
          onChange={(e) => updateSolution({ proposedSolution: e.target.value })}
          placeholder="제안하는 솔루션의 핵심 아이디어와 기술적 접근 방식을 기술하세요."
          className="min-h-40"
        />
        <AIEnhanceButton onEnhance={handleEnhance} isLoading={ai.isLoading} />
      </div>

      {/* 대안 검토 (접이식) */}
      <div className="rounded-lg border">
        <button
          type="button"
          onClick={() => setAlternativesOpen(!alternativesOpen)}
          className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-muted/50 transition-colors"
        >
          <span>대안 검토 (선택)</span>
          {alternativesOpen ? (
            <ChevronUp className="size-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="size-4 text-muted-foreground" />
          )}
        </button>
        {alternativesOpen && (
          <div className="border-t p-3">
            <Textarea
              value={solution.alternativesConsidered ?? ''}
              onChange={(e) => updateSolution({ alternativesConsidered: e.target.value })}
              placeholder="검토한 대안과 선택하지 않은 이유를 기록하세요."
              className="min-h-24"
            />
          </div>
        )}
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
