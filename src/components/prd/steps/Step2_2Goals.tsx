'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Loader2 } from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { AIEnhanceButton } from '@/components/prd/AIEnhanceButton';
import { AIEnhanceModal } from '@/components/prd/AIEnhanceModal';
import { KPICard } from '@/components/prd/cards/KPICard';
import { useMockAI } from '@/hooks/useMockAI';
import { mockAIService } from '@/lib/mock/services/ai.service';
import type { KPI } from '@/types/prd.types';

export function Step2_2Goals() {
  const goals = usePRDStore((s) => s.goals);
  const background = usePRDStore((s) => s.background);
  const updateGoals = usePRDStore((s) => s.updateGoals);

  const ai = useMockAI();
  const [enhanceTarget, setEnhanceTarget] = useState<'businessGoals' | 'userGoals' | null>(null);
  const [originalText, setOriginalText] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isSuggestingKPIs, setIsSuggestingKPIs] = useState(false);

  const handleEnhance = async (field: 'businessGoals' | 'userGoals') => {
    const content = goals[field];
    setEnhanceTarget(field);
    setOriginalText(content);
    setModalOpen(true);
    await ai.enhance('goals_business', content);
  };

  const handleAccept = (text: string) => {
    if (enhanceTarget) {
      updateGoals({ [enhanceTarget]: text });
    }
    setModalOpen(false);
    ai.reset();
  };

  const handleReject = () => {
    setModalOpen(false);
    ai.reset();
  };

  const handleAddKPI = () => {
    const newKPI: KPI = {
      id: `kpi-${Date.now()}`,
      name: '',
      targetValue: '',
      currentValue: '',
      unit: '',
    };
    updateGoals({ kpis: [...goals.kpis, newKPI] });
  };

  const handleUpdateKPI = (index: number, kpi: KPI) => {
    const updated = [...goals.kpis];
    updated[index] = kpi;
    updateGoals({ kpis: updated });
  };

  const handleDeleteKPI = (index: number) => {
    updateGoals({ kpis: goals.kpis.filter((_, i) => i !== index) });
  };

  const handleSuggestKPIs = async () => {
    setIsSuggestingKPIs(true);
    try {
      const suggested = await mockAIService.suggestKPIs({ background, goals });
      updateGoals({ kpis: [...goals.kpis, ...suggested] });
    } finally {
      setIsSuggestingKPIs(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">목표 및 성공 지표</h2>
        <p className="text-sm text-muted-foreground">
          비즈니스 목표와 측정 가능한 KPI를 설정합니다.
        </p>
      </div>

      {/* 비즈니스 목표 */}
      <div className="space-y-2">
        <Label>비즈니스 목표</Label>
        <Textarea
          value={goals.businessGoals}
          onChange={(e) => updateGoals({ businessGoals: e.target.value })}
          placeholder="달성하고자 하는 비즈니스 목표를 SMART 원칙에 맞게 작성하세요."
          className="min-h-24"
        />
        <AIEnhanceButton
          onEnhance={() => handleEnhance('businessGoals')}
          isLoading={ai.isLoading && enhanceTarget === 'businessGoals'}
        />
      </div>

      {/* 사용자 목표 */}
      <div className="space-y-2">
        <Label>사용자 목표</Label>
        <Textarea
          value={goals.userGoals}
          onChange={(e) => updateGoals({ userGoals: e.target.value })}
          placeholder="사용자가 달성할 수 있는 구체적인 목표를 작성하세요."
          className="min-h-24"
        />
        <AIEnhanceButton
          onEnhance={() => handleEnhance('userGoals')}
          isLoading={ai.isLoading && enhanceTarget === 'userGoals'}
        />
      </div>

      {/* KPI 목록 */}
      <div className="space-y-3">
        <Label>KPI (핵심 성과 지표)</Label>
        <div className="space-y-3">
          {goals.kpis.map((kpi, index) => (
            <KPICard
              key={kpi.id}
              kpi={kpi}
              onChange={(updated) => handleUpdateKPI(index, updated)}
              onDelete={() => handleDeleteKPI(index)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddKPI}>
            <Plus className="size-3.5" data-icon="inline-start" />
            KPI 추가
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSuggestKPIs}
            disabled={isSuggestingKPIs}
          >
            {isSuggestingKPIs ? (
              <Loader2 className="size-3.5 animate-spin" data-icon="inline-start" />
            ) : (
              <Sparkles className="size-3.5 text-amber-500" data-icon="inline-start" />
            )}
            AI가 지표 제안
          </Button>
        </div>
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
