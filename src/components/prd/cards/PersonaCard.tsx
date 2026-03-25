'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, User } from 'lucide-react';
import type { Persona } from '@/types/prd.types';

interface PersonaCardProps {
  persona: Persona;
  onChange: (persona: Persona) => void;
  onDelete: () => void;
}

export function PersonaCard({ persona, onChange, onDelete }: PersonaCardProps) {
  const update = (field: keyof Persona, value: string | string[]) => {
    onChange({ ...persona, [field]: value });
  };

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="size-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">페르소나</span>
          </div>
          <Button variant="ghost" size="icon-xs" onClick={onDelete}>
            <X className="size-3.5" />
          </Button>
        </div>

        <div className="grid gap-3">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-xs mb-1">이름</Label>
              <Input
                value={persona.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="김민수"
              />
            </div>
            <div>
              <Label className="text-xs mb-1">나이</Label>
              <Input
                value={persona.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="32"
              />
            </div>
            <div>
              <Label className="text-xs mb-1">직업</Label>
              <Input
                value={persona.occupation}
                onChange={(e) => update('occupation', e.target.value)}
                placeholder="개발팀 리드"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1">주요 특성 (페인포인트)</Label>
            <Textarea
              value={persona.painPoints.join('\n')}
              onChange={(e) => update('painPoints', e.target.value.split('\n').filter(Boolean))}
              placeholder="한 줄에 하나씩 입력하세요"
              className="min-h-16"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">핵심 니즈</Label>
            <Textarea
              value={persona.needs.join('\n')}
              onChange={(e) => update('needs', e.target.value.split('\n').filter(Boolean))}
              placeholder="한 줄에 하나씩 입력하세요"
              className="min-h-16"
            />
          </div>
          <div>
            <Label className="text-xs mb-1">시나리오</Label>
            <Input
              value={persona.scenario}
              onChange={(e) => update('scenario', e.target.value)}
              placeholder="사용자의 대표적인 사용 시나리오"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
