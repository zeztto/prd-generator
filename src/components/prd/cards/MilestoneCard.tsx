'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Milestone as MilestoneIcon } from 'lucide-react';
import type { Milestone } from '@/types/prd.types';

interface MilestoneCardProps {
  milestone: Milestone;
  onChange: (milestone: Milestone) => void;
  onDelete: () => void;
}

export function MilestoneCard({ milestone, onChange, onDelete }: MilestoneCardProps) {
  const update = (field: keyof Milestone, value: string | string[]) => {
    onChange({ ...milestone, [field]: value });
  };

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <MilestoneIcon className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">마일스톤</span>
          </div>
          <Button variant="ghost" size="icon-xs" onClick={onDelete}>
            <X className="size-3.5" />
          </Button>
        </div>

        <div className="grid gap-3">
          <div>
            <Label className="text-xs mb-1">마일스톤명</Label>
            <Input
              value={milestone.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="M1: 기본 기능 구현"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">예상 날짜</Label>
            <Input
              type="date"
              value={milestone.targetDate}
              onChange={(e) => update('targetDate', e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs mb-1">산출물</Label>
            <Input
              value={milestone.deliverables.join(', ')}
              onChange={(e) =>
                update('deliverables', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))
              }
              placeholder="쉼표로 구분 (예: API 구현, UI 개발)"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
