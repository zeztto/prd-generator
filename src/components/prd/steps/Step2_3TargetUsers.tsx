'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles, Loader2 } from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { PersonaCard } from '@/components/prd/cards/PersonaCard';
import { mockAIService } from '@/lib/mock/services/ai.service';
import type { Persona } from '@/types/prd.types';

export function Step2_3TargetUsers() {
  const targetUsers = usePRDStore((s) => s.targetUsers);
  const background = usePRDStore((s) => s.background);
  const updateTargetUsers = usePRDStore((s) => s.updateTargetUsers);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddPersona = () => {
    const newPersona: Persona = {
      id: `persona-${Date.now()}`,
      name: '',
      age: '',
      occupation: '',
      painPoints: [],
      needs: [],
      scenario: '',
    };
    updateTargetUsers({ personas: [...targetUsers.personas, newPersona] });
  };

  const handleUpdatePersona = (index: number, persona: Persona) => {
    const updated = [...targetUsers.personas];
    updated[index] = persona;
    updateTargetUsers({ personas: updated });
  };

  const handleDeletePersona = (index: number) => {
    updateTargetUsers({
      personas: targetUsers.personas.filter((_, i) => i !== index),
    });
  };

  const handleGeneratePersona = async () => {
    setIsGenerating(true);
    try {
      const persona = await mockAIService.generatePersona({
        targetUsers,
        background,
      });
      updateTargetUsers({ personas: [...targetUsers.personas, persona] });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">타겟 사용자</h2>
        <p className="text-sm text-muted-foreground">
          주요 타겟 사용자를 정의하고 대표 페르소나를 생성합니다.
        </p>
      </div>

      {/* 주요 사용자 */}
      <div className="space-y-2">
        <Label>주요 사용자</Label>
        <Textarea
          value={targetUsers.primaryUsers}
          onChange={(e) => updateTargetUsers({ primaryUsers: e.target.value })}
          placeholder="주요 타겟 사용자의 특성을 구체적으로 기술하세요. (나이, 직업, 행동 패턴 등)"
          className="min-h-24"
        />
      </div>

      {/* 페르소나 목록 */}
      <div className="space-y-3">
        <Label>페르소나</Label>
        <div className="space-y-3">
          {targetUsers.personas.map((persona, index) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onChange={(updated) => handleUpdatePersona(index, updated)}
              onDelete={() => handleDeletePersona(index)}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleAddPersona}>
            <Plus className="size-3.5" data-icon="inline-start" />
            페르소나 추가
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleGeneratePersona}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="size-3.5 animate-spin" data-icon="inline-start" />
            ) : (
              <Sparkles className="size-3.5 text-amber-500" data-icon="inline-start" />
            )}
            AI로 페르소나 생성
          </Button>
        </div>
      </div>

      {/* 사용자 시나리오 */}
      <div className="space-y-2">
        <Label>사용자 시나리오</Label>
        <Textarea
          value={targetUsers.userJourney ?? ''}
          onChange={(e) => updateTargetUsers({ userJourney: e.target.value })}
          placeholder="대표적인 사용자 시나리오를 작성하세요."
          className="min-h-20"
        />
      </div>
    </div>
  );
}
