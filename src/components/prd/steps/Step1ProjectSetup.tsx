'use client';

import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Rocket,
  Wrench,
  Server,
  FlaskConical,
  Bug,
  Globe,
  Smartphone,
  Code,
  Monitor,
} from 'lucide-react';
import { usePRDStore } from '@/stores/prd.store';
import { ProjectType, Platform, TargetMarket } from '@/types/prd.types';
import {
  PROJECT_TYPE_OPTIONS,
  PLATFORM_OPTIONS,
  TARGET_MARKET_OPTIONS,
} from '@/constants/project-types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Rocket,
  Wrench,
  Server,
  FlaskConical,
  Bug,
  Globe,
  Smartphone,
  Code,
  Monitor,
};

interface Step1ProjectSetupProps {
  onComplete: () => void;
}

export function Step1ProjectSetup({ onComplete }: Step1ProjectSetupProps) {
  const projectSetup = usePRDStore((s) => s.projectSetup);
  const updateProjectSetup = usePRDStore((s) => s.updateProjectSetup);

  const isValid =
    projectSetup.title.trim() !== '' &&
    projectSetup.description.trim() !== '' &&
    projectSetup.projectType !== null;

  const handlePlatformToggle = useCallback(
    (platform: Platform) => {
      const current = projectSetup.platform;
      const updated = current.includes(platform)
        ? current.filter((p) => p !== platform)
        : [...current, platform];
      updateProjectSetup({ platform: updated });
    },
    [projectSetup.platform, updateProjectSetup],
  );

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">프로젝트 설정</h2>
        <p className="text-sm text-muted-foreground">
          프로젝트의 기본 정보를 입력하세요. PRD 작성의 첫 단계입니다.
        </p>
      </div>

      {/* 프로젝트 이름 */}
      <div className="space-y-2">
        <Label>
          프로젝트 이름 <span className="text-destructive">*</span>
        </Label>
        <Input
          value={projectSetup.title}
          onChange={(e) => updateProjectSetup({ title: e.target.value })}
          placeholder="예: 모바일 주문 시스템 v2.0 리뉴얼"
        />
      </div>

      {/* 한 줄 설명 */}
      <div className="space-y-2">
        <Label>
          한 줄 설명 <span className="text-destructive">*</span>
        </Label>
        <Textarea
          value={projectSetup.description}
          onChange={(e) => updateProjectSetup({ description: e.target.value })}
          placeholder="예: 기존 모바일 주문 시스템의 UX를 개선하고 그룹 주문 기능을 추가하여 전환율을 향상시키는 프로젝트"
          className="min-h-16"
        />
      </div>

      {/* 프로젝트 유형 */}
      <div className="space-y-3">
        <Label>
          프로젝트 유형 <span className="text-destructive">*</span>
        </Label>
        <RadioGroup
          value={projectSetup.projectType ?? ''}
          onValueChange={(val) => updateProjectSetup({ projectType: val as ProjectType })}
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {PROJECT_TYPE_OPTIONS.map((opt) => {
              const Icon = ICON_MAP[opt.icon];
              const isSelected = projectSetup.projectType === opt.value;
              return (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <RadioGroupItem value={opt.value} className="mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="size-4 text-muted-foreground" />}
                      <span className="text-sm font-medium">{opt.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </RadioGroup>
      </div>

      {/* 플랫폼 */}
      <div className="space-y-3">
        <Label>플랫폼 (복수 선택)</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {PLATFORM_OPTIONS.map((opt) => {
            const Icon = ICON_MAP[opt.icon];
            const isChecked = projectSetup.platform.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  isChecked ? 'border-primary bg-primary/5' : 'border-border'
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handlePlatformToggle(opt.value)}
                />
                <div className="flex items-center gap-1.5">
                  {Icon && <Icon className="size-4 text-muted-foreground" />}
                  <span className="text-sm">{opt.label}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* 타겟 시장 */}
      <div className="space-y-2">
        <Label>타겟 시장</Label>
        <Select
          value={projectSetup.targetMarket ?? ''}
          onValueChange={(val) => updateProjectSetup({ targetMarket: val as TargetMarket })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="타겟 시장 선택" />
          </SelectTrigger>
          <SelectContent>
            {TARGET_MARKET_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label} - {opt.description}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* CTA */}
      <Button onClick={onComplete} disabled={!isValid} size="lg" className="w-full">
        PRD 작성 시작
      </Button>
    </div>
  );
}
