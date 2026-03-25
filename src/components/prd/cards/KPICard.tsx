'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { KPI } from '@/types/prd.types';

interface KPICardProps {
  kpi: KPI;
  onChange: (kpi: KPI) => void;
  onDelete: () => void;
}

export function KPICard({ kpi, onChange, onDelete }: KPICardProps) {
  const update = (field: keyof KPI, value: string) => {
    onChange({ ...kpi, [field]: value });
  };

  return (
    <Card size="sm">
      <CardContent>
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground">KPI</span>
          <Button variant="ghost" size="icon-xs" onClick={onDelete}>
            <X className="size-3.5" />
          </Button>
        </div>

        <div className="grid gap-3">
          <div>
            <Label className="text-xs mb-1">지표명</Label>
            <Input
              value={kpi.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="예: 주문 전환율"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs mb-1">현재값</Label>
              <Input
                value={kpi.currentValue ?? ''}
                onChange={(e) => update('currentValue', e.target.value)}
                placeholder="38"
              />
            </div>
            <div>
              <Label className="text-xs mb-1">목표값</Label>
              <Input
                value={kpi.targetValue}
                onChange={(e) => update('targetValue', e.target.value)}
                placeholder="53"
              />
            </div>
          </div>
          <div>
            <Label className="text-xs mb-1">단위</Label>
            <Input
              value={kpi.unit}
              onChange={(e) => update('unit', e.target.value)}
              placeholder="%, 초, 명 등"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
