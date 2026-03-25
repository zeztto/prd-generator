'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Loader2 } from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { FeatureCard } from '@/components/prd/cards/FeatureCard';
import { MoscowChart } from '@/components/prd/MoscowChart';
import { mockAIService } from '@/lib/mock/services/ai.service';
import { FeaturePriority, type Feature } from '@/types/prd.types';

export function Step2_4Features() {
  const features = usePRDStore((s) => s.features);
  const goals = usePRDStore((s) => s.goals);
  const targetUsers = usePRDStore((s) => s.targetUsers);
  const solution = usePRDStore((s) => s.solution);
  const updateFeatures = usePRDStore((s) => s.updateFeatures);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleAddFeature = () => {
    const newFeature: Feature = {
      id: `feat-${Date.now()}`,
      title: '',
      description: '',
      priority: FeaturePriority.SHOULD,
      acceptanceCriteria: [],
    };
    updateFeatures({
      coreFeatures: [...features.coreFeatures, newFeature],
    });
  };

  const handleUpdateFeature = (index: number, feature: Feature) => {
    const updated = [...features.coreFeatures];
    updated[index] = feature;
    updateFeatures({ coreFeatures: updated });
  };

  const handleDeleteFeature = (index: number) => {
    updateFeatures({
      coreFeatures: features.coreFeatures.filter((_, i) => i !== index),
    });
  };

  const handleSuggestFeatures = async () => {
    setIsSuggesting(true);
    try {
      const suggested = await mockAIService.suggestFeatures({
        goals,
        targetUsers,
        solution,
      });
      updateFeatures({
        coreFeatures: [...features.coreFeatures, ...suggested.coreFeatures],
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">핵심 기능</h2>
        <p className="text-sm text-muted-foreground">
          개발할 핵심 기능을 정의하고 MoSCoW 우선순위를 지정합니다.
        </p>
      </div>

      {/* MoSCoW 분포 */}
      <MoscowChart features={features.coreFeatures} />

      {/* 기능 카드 목록 */}
      <div className="space-y-3">
        <Label>기능 목록</Label>
        <div className="space-y-3">
          {features.coreFeatures.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onChange={(updated) => handleUpdateFeature(index, updated)}
              onDelete={() => handleDeleteFeature(index)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddFeature}>
            <Plus className="size-3.5" data-icon="inline-start" />
            기능 추가
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSuggestFeatures}
            disabled={isSuggesting}
          >
            {isSuggesting ? (
              <Loader2 className="size-3.5 animate-spin" data-icon="inline-start" />
            ) : (
              <Sparkles className="size-3.5 text-amber-500" data-icon="inline-start" />
            )}
            AI가 기능 제안
          </Button>
        </div>
      </div>
    </div>
  );
}
