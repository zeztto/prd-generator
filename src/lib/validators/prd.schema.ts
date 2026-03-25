import { z } from 'zod';

// ── 프로젝트 설정 스키마 ──

export const projectSetupSchema = z.object({
  title: z
    .string()
    .min(2, '프로젝트명은 2자 이상이어야 합니다.')
    .max(100, '프로젝트명은 100자 이하여야 합니다.'),
  description: z
    .string()
    .min(10, '설명은 10자 이상이어야 합니다.')
    .max(500, '설명은 500자 이하여야 합니다.'),
  projectType: z
    .string()
    .min(1, '프로젝트 유형을 선택해주세요.'),
  platform: z
    .array(z.string())
    .min(1, '플랫폼을 하나 이상 선택해주세요.'),
  targetMarket: z
    .string()
    .min(1, '타겟 시장을 선택해주세요.'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
});

export type ProjectSetupFormData = z.infer<typeof projectSetupSchema>;

// ── 배경 스키마 ──

export const backgroundSchema = z.object({
  problemStatement: z
    .string()
    .min(20, '문제 정의는 20자 이상으로 구체적으로 작성해주세요.')
    .max(2000, '문제 정의는 2000자 이하여야 합니다.'),
  currentSituation: z
    .string()
    .min(20, '현재 상황은 20자 이상으로 구체적으로 작성해주세요.')
    .max(2000, '현재 상황은 2000자 이하여야 합니다.'),
  marketResearch: z.string().max(2000).optional(),
  competitorAnalysis: z.string().max(2000).optional(),
  dataInsights: z.string().max(2000).optional(),
});

export type BackgroundFormData = z.infer<typeof backgroundSchema>;

// ── KPI 스키마 ──

export const kpiSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(2, 'KPI 이름은 2자 이상이어야 합니다.'),
  targetValue: z
    .string()
    .min(1, '목표 값을 입력해주세요.'),
  currentValue: z.string().optional(),
  unit: z
    .string()
    .min(1, '단위를 입력해주세요.'),
  description: z.string().optional(),
});

// ── 목표 스키마 ──

export const goalsSchema = z.object({
  businessGoals: z
    .string()
    .min(10, '비즈니스 목표는 10자 이상으로 작성해주세요.')
    .max(2000, '비즈니스 목표는 2000자 이하여야 합니다.'),
  userGoals: z
    .string()
    .min(10, '사용자 목표는 10자 이상으로 작성해주세요.')
    .max(2000, '사용자 목표는 2000자 이하여야 합니다.'),
  kpis: z
    .array(kpiSchema)
    .min(1, 'KPI를 하나 이상 추가해주세요.'),
  successCriteria: z
    .string()
    .min(10, '성공 기준은 10자 이상으로 작성해주세요.')
    .max(2000, '성공 기준은 2000자 이하여야 합니다.'),
  nonGoals: z.string().max(2000).optional(),
});

export type GoalsFormData = z.infer<typeof goalsSchema>;

// ── 페르소나 스키마 ──

export const personaSchema = z.object({
  id: z.string(),
  name: z.string().min(1, '페르소나 이름을 입력해주세요.'),
  age: z.string().min(1, '나이를 입력해주세요.'),
  occupation: z.string().min(1, '직업을 입력해주세요.'),
  painPoints: z.array(z.string().min(1)).min(1, '페인포인트를 하나 이상 입력해주세요.'),
  needs: z.array(z.string().min(1)).min(1, '니즈를 하나 이상 입력해주세요.'),
  scenario: z.string().min(10, '시나리오는 10자 이상으로 작성해주세요.'),
});

// ── 타겟 사용자 스키마 ──

export const targetUsersSchema = z.object({
  primaryUsers: z
    .string()
    .min(10, '주요 사용자 설명은 10자 이상으로 작성해주세요.')
    .max(2000, '주요 사용자 설명은 2000자 이하여야 합니다.'),
  personas: z.array(personaSchema),
  userSegments: z.string().max(2000).optional(),
  userJourney: z.string().max(3000).optional(),
});

export type TargetUsersFormData = z.infer<typeof targetUsersSchema>;

// ── 기능 스키마 ──

export const featureSchema = z.object({
  id: z.string(),
  title: z.string().min(2, '기능명은 2자 이상이어야 합니다.'),
  description: z.string().min(10, '기능 설명은 10자 이상으로 작성해주세요.'),
  priority: z.enum(['must', 'should', 'could', 'wont']),
  acceptanceCriteria: z
    .array(z.string().min(1))
    .min(1, '인수 조건을 하나 이상 작성해주세요.'),
  estimatedEffort: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
});

export const featuresSchema = z.object({
  coreFeatures: z
    .array(featureSchema)
    .min(1, '핵심 기능을 하나 이상 추가해주세요.'),
  additionalNotes: z.string().max(2000).optional(),
});

export type FeaturesFormData = z.infer<typeof featuresSchema>;

// ── 솔루션 스키마 ──

export const solutionSchema = z.object({
  proposedSolution: z
    .string()
    .min(20, '솔루션 제안은 20자 이상으로 구체적으로 작성해주세요.')
    .max(3000, '솔루션 제안은 3000자 이하여야 합니다.'),
  technicalApproach: z.string().max(3000).optional(),
  alternativesConsidered: z.string().max(3000).optional(),
  constraints: z.string().max(2000).optional(),
  assumptions: z.string().max(2000).optional(),
});

export type SolutionFormData = z.infer<typeof solutionSchema>;

// ── 마일스톤 스키마 ──

export const milestoneSchema = z.object({
  id: z.string(),
  title: z.string().min(2, '마일스톤명은 2자 이상이어야 합니다.'),
  description: z.string().min(5, '마일스톤 설명은 5자 이상으로 작성해주세요.'),
  targetDate: z.string().min(1, '목표 날짜를 입력해주세요.'),
  deliverables: z
    .array(z.string().min(1))
    .min(1, '산출물을 하나 이상 입력해주세요.'),
});

// ── 범위 스키마 ──

export const scopeSchema = z.object({
  inScope: z
    .string()
    .min(10, '포함 범위는 10자 이상으로 작성해주세요.')
    .max(2000, '포함 범위는 2000자 이하여야 합니다.'),
  outOfScope: z
    .string()
    .min(10, '미포함 범위는 10자 이상으로 작성해주세요.')
    .max(2000, '미포함 범위는 2000자 이하여야 합니다.'),
  milestones: z
    .array(milestoneSchema)
    .min(1, '마일스톤을 하나 이상 추가해주세요.'),
  risks: z.string().max(2000).optional(),
  dependencies: z.string().max(2000).optional(),
});

export type ScopeFormData = z.infer<typeof scopeSchema>;
