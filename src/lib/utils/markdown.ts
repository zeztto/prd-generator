import type { PRDDocument, Feature, KPI, Persona, Milestone } from '@/types/prd.types';
import {
  PROJECT_TYPE_OPTIONS,
  PLATFORM_OPTIONS,
  TARGET_MARKET_OPTIONS,
} from '@/constants/project-types';

function getProjectTypeLabel(type: string | null): string {
  if (!type) return '-';
  return PROJECT_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}

function getPlatformLabels(platforms: string[]): string {
  return platforms
    .map((p) => PLATFORM_OPTIONS.find((o) => o.value === p)?.label ?? p)
    .join(', ') || '-';
}

function getTargetMarketLabel(market: string | null): string {
  if (!market) return '-';
  return TARGET_MARKET_OPTIONS.find((o) => o.value === market)?.label ?? market;
}

function formatKPI(kpi: KPI): string {
  const current = kpi.currentValue ? `현재: ${kpi.currentValue}${kpi.unit}` : '';
  const target = `목표: ${kpi.targetValue}${kpi.unit}`;
  return `- **${kpi.name}**: ${[current, target].filter(Boolean).join(' → ')}`;
}

function formatPersona(persona: Persona): string {
  const lines = [
    `#### ${persona.name} (${persona.age}세, ${persona.occupation})`,
    '',
  ];
  if (persona.painPoints.length > 0) {
    lines.push('**페인포인트:**');
    persona.painPoints.forEach((p) => lines.push(`- ${p}`));
    lines.push('');
  }
  if (persona.needs.length > 0) {
    lines.push('**핵심 니즈:**');
    persona.needs.forEach((n) => lines.push(`- ${n}`));
    lines.push('');
  }
  if (persona.scenario) {
    lines.push(`**시나리오:** ${persona.scenario}`);
    lines.push('');
  }
  return lines.join('\n');
}

function formatFeature(feature: Feature): string {
  const priorityMap: Record<string, string> = {
    must: 'Must-have',
    should: 'Should-have',
    could: 'Could-have',
    wont: "Won't-have",
  };
  const priority = priorityMap[feature.priority] ?? feature.priority;
  const lines = [
    `#### ${feature.title} [${priority}]`,
    '',
    feature.description,
    '',
  ];
  if (feature.acceptanceCriteria.length > 0) {
    lines.push('**인수 조건:**');
    feature.acceptanceCriteria.forEach((ac) => lines.push(`- ${ac}`));
    lines.push('');
  }
  return lines.join('\n');
}

function formatMilestone(milestone: Milestone): string {
  const lines = [
    `#### ${milestone.title}`,
    '',
    `- **예상 날짜:** ${milestone.targetDate || '-'}`,
  ];
  if (milestone.deliverables.length > 0) {
    lines.push(`- **산출물:** ${milestone.deliverables.join(', ')}`);
  }
  lines.push('');
  return lines.join('\n');
}

export function generatePRDMarkdown(prd: Omit<PRDDocument, 'id' | 'authorId' | 'createdAt' | 'updatedAt'> & { id?: string; authorId?: string; createdAt?: string; updatedAt?: string }): string {
  const sections: string[] = [];

  // 제목
  sections.push(`# ${prd.title || '(제목 없음)'}`);
  sections.push('');
  if (prd.description) {
    sections.push(`> ${prd.description}`);
    sections.push('');
  }

  // 프로젝트 정보
  sections.push('## 1. 프로젝트 개요');
  sections.push('');
  sections.push(`| 항목 | 내용 |`);
  sections.push(`| --- | --- |`);
  sections.push(`| 프로젝트 유형 | ${getProjectTypeLabel(prd.projectSetup.projectType)} |`);
  sections.push(`| 플랫폼 | ${getPlatformLabels(prd.projectSetup.platform)} |`);
  sections.push(`| 타겟 시장 | ${getTargetMarketLabel(prd.projectSetup.targetMarket)} |`);
  sections.push('');

  // 배경 및 문제
  sections.push('## 2. 배경 및 문제 정의');
  sections.push('');
  if (prd.background.currentSituation) {
    sections.push('### 현재 상황');
    sections.push('');
    sections.push(prd.background.currentSituation);
    sections.push('');
  }
  if (prd.background.problemStatement) {
    sections.push('### 핵심 문제');
    sections.push('');
    sections.push(prd.background.problemStatement);
    sections.push('');
  }

  // 목표
  sections.push('## 3. 목표 및 성공 지표');
  sections.push('');
  if (prd.goals.businessGoals) {
    sections.push('### 비즈니스 목표');
    sections.push('');
    sections.push(prd.goals.businessGoals);
    sections.push('');
  }
  if (prd.goals.userGoals) {
    sections.push('### 사용자 목표');
    sections.push('');
    sections.push(prd.goals.userGoals);
    sections.push('');
  }
  if (prd.goals.kpis.length > 0) {
    sections.push('### KPI');
    sections.push('');
    prd.goals.kpis.forEach((kpi) => sections.push(formatKPI(kpi)));
    sections.push('');
  }

  // 타겟 사용자
  sections.push('## 4. 타겟 사용자');
  sections.push('');
  if (prd.targetUsers.primaryUsers) {
    sections.push(prd.targetUsers.primaryUsers);
    sections.push('');
  }
  if (prd.targetUsers.personas.length > 0) {
    sections.push('### 페르소나');
    sections.push('');
    prd.targetUsers.personas.forEach((persona) => {
      sections.push(formatPersona(persona));
    });
  }

  // 핵심 기능
  sections.push('## 5. 핵심 기능');
  sections.push('');
  if (prd.features.coreFeatures.length > 0) {
    prd.features.coreFeatures.forEach((feature) => {
      sections.push(formatFeature(feature));
    });
  }

  // 솔루션
  sections.push('## 6. 솔루션 제안');
  sections.push('');
  if (prd.solution.proposedSolution) {
    sections.push(prd.solution.proposedSolution);
    sections.push('');
  }
  if (prd.solution.alternativesConsidered) {
    sections.push('### 대안 검토');
    sections.push('');
    sections.push(prd.solution.alternativesConsidered);
    sections.push('');
  }

  // 범위
  sections.push('## 7. 범위 및 마일스톤');
  sections.push('');
  if (prd.scope.inScope) {
    sections.push('### 포함 범위');
    sections.push('');
    sections.push(prd.scope.inScope);
    sections.push('');
  }
  if (prd.scope.outOfScope) {
    sections.push('### 미포함 범위');
    sections.push('');
    sections.push(prd.scope.outOfScope);
    sections.push('');
  }
  if (prd.scope.milestones.length > 0) {
    sections.push('### 마일스톤');
    sections.push('');
    prd.scope.milestones.forEach((ms) => {
      sections.push(formatMilestone(ms));
    });
  }

  sections.push('---');
  sections.push('');
  sections.push(`*이 문서는 prd.ai로 작성되었습니다.*`);

  return sections.join('\n');
}
