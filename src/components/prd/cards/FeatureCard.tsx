'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { X, GripVertical } from 'lucide-react';
import { FeaturePriority, type Feature } from '@/types/prd.types';

const PRIORITY_OPTIONS = [
  { value: FeaturePriority.MUST, label: 'Must-have', color: 'text-red-600' },
  { value: FeaturePriority.SHOULD, label: 'Should-have', color: 'text-orange-600' },
  { value: FeaturePriority.COULD, label: 'Could-have', color: 'text-blue-600' },
  { value: FeaturePriority.WONT, label: "Won't-have", color: 'text-gray-500' },
];

interface FeatureCardProps {
  feature: Feature;
  onChange: (feature: Feature) => void;
  onDelete: () => void;
}

export function FeatureCard({ feature, onChange, onDelete }: FeatureCardProps) {
  const update = (field: keyof Feature, value: string | string[] | FeaturePriority) => {
    onChange({ ...feature, [field]: value });
  };

  const priorityOption = PRIORITY_OPTIONS.find((o) => o.value === feature.priority);

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <GripVertical className="size-4 text-muted-foreground cursor-grab" />
            <span className={`text-xs font-medium ${priorityOption?.color ?? ''}`}>
              {priorityOption?.label ?? 'Must-have'}
            </span>
          </div>
          <Button variant="ghost" size="icon-xs" onClick={onDelete}>
            <X className="size-3.5" />
          </Button>
        </div>

        <div className="grid gap-3">
          <div>
            <Label className="text-xs mb-1">기능명</Label>
            <Input
              value={feature.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="기능 이름"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">설명</Label>
            <Textarea
              value={feature.description}
              onChange={(e) => update('description', e.target.value)}
              placeholder="기능에 대한 간단한 설명"
              className="min-h-12"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">우선순위</Label>
            <Select
              value={feature.priority}
              onValueChange={(val) => update('priority', val as FeaturePriority)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="우선순위 선택" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1">인수 조건</Label>
            <Textarea
              value={feature.acceptanceCriteria.join('\n')}
              onChange={(e) =>
                update('acceptanceCriteria', e.target.value.split('\n').filter(Boolean))
              }
              placeholder="한 줄에 하나씩 입력하세요"
              className="min-h-12"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
