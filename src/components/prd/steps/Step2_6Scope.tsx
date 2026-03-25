'use client';

import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { MilestoneCard } from '@/components/prd/cards/MilestoneCard';
import type { Milestone } from '@/types/prd.types';

interface TagListProps {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}

function TagList({ label, tags, onAdd, onRemove, placeholder }: TagListProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button variant="outline" size="default" onClick={handleAdd} disabled={!input.trim()}>
          <Plus className="size-4" />
        </Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                onClick={() => onRemove(index)}
                className="rounded-sm hover:bg-muted p-0.5"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export function Step2_6Scope() {
  const scope = usePRDStore((s) => s.scope);
  const updateScope = usePRDStore((s) => s.updateScope);

  // inScope와 outOfScope를 태그 리스트로 관리
  const inScopeTags = scope.inScope ? scope.inScope.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const outScopeTags = scope.outOfScope ? scope.outOfScope.split(',').map((s) => s.trim()).filter(Boolean) : [];

  const handleAddInScope = useCallback(
    (tag: string) => {
      const updated = [...inScopeTags, tag];
      updateScope({ inScope: updated.join(', ') });
    },
    [inScopeTags, updateScope],
  );

  const handleRemoveInScope = useCallback(
    (index: number) => {
      const updated = inScopeTags.filter((_, i) => i !== index);
      updateScope({ inScope: updated.join(', ') });
    },
    [inScopeTags, updateScope],
  );

  const handleAddOutScope = useCallback(
    (tag: string) => {
      const updated = [...outScopeTags, tag];
      updateScope({ outOfScope: updated.join(', ') });
    },
    [outScopeTags, updateScope],
  );

  const handleRemoveOutScope = useCallback(
    (index: number) => {
      const updated = outScopeTags.filter((_, i) => i !== index);
      updateScope({ outOfScope: updated.join(', ') });
    },
    [outScopeTags, updateScope],
  );

  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: `ms-${Date.now()}`,
      title: '',
      description: '',
      targetDate: '',
      deliverables: [],
    };
    updateScope({ milestones: [...scope.milestones, newMilestone] });
  };

  const handleUpdateMilestone = (index: number, milestone: Milestone) => {
    const updated = [...scope.milestones];
    updated[index] = milestone;
    updateScope({ milestones: updated });
  };

  const handleDeleteMilestone = (index: number) => {
    updateScope({
      milestones: scope.milestones.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-1">범위 및 일정</h2>
        <p className="text-sm text-muted-foreground">
          프로젝트의 포함/미포함 범위를 명확히 하고 마일스톤을 설정합니다.
        </p>
      </div>

      {/* In Scope */}
      <TagList
        label="포함 범위 (In Scope)"
        tags={inScopeTags}
        onAdd={handleAddInScope}
        onRemove={handleRemoveInScope}
        placeholder="포함할 항목을 입력 후 Enter"
      />

      {/* Out of Scope */}
      <TagList
        label="미포함 범위 (Out of Scope)"
        tags={outScopeTags}
        onAdd={handleAddOutScope}
        onRemove={handleRemoveOutScope}
        placeholder="미포함 항목을 입력 후 Enter"
      />

      {/* 마일스톤 */}
      <div className="space-y-3">
        <Label>마일스톤</Label>
        <div className="space-y-3">
          {scope.milestones.map((milestone, index) => (
            <MilestoneCard
              key={milestone.id}
              milestone={milestone}
              onChange={(updated) => handleUpdateMilestone(index, updated)}
              onDelete={() => handleDeleteMilestone(index)}
            />
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={handleAddMilestone}>
          <Plus className="size-3.5" data-icon="inline-start" />
          마일스톤 추가
        </Button>
      </div>
    </div>
  );
}
