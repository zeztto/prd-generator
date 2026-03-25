export interface PRDSubStep {
  id: string;
  title: string;
  description: string;
  isRequired: boolean;
}

export interface PRDStep {
  id: string;
  step: number;
  title: string;
  description: string;
  isRequired: boolean;
  subSteps?: PRDSubStep[];
}

export const PRD_STEPS: PRDStep[] = [
  {
    id: 'project-setup',
    step: 1,
    title: '프로젝트 설정',
    description: '프로젝트의 기본 정보를 입력합니다.',
    isRequired: true,
  },
  {
    id: 'background',
    step: 2,
    title: '배경 및 문제 정의',
    description: '프로젝트의 배경과 해결하려는 문제를 정의합니다.',
    isRequired: true,
    subSteps: [
      {
        id: 'background-problem',
        title: '문제 정의',
        description: '해결하려는 핵심 문제를 명확히 기술합니다.',
        isRequired: true,
      },
      {
        id: 'background-situation',
        title: '현재 상황',
        description: '현재 상황과 맥락을 설명합니다.',
        isRequired: true,
      },
    ],
  },
  {
    id: 'goals',
    step: 3,
    title: '목표 및 KPI',
    description: '비즈니스 목표와 측정 가능한 KPI를 설정합니다.',
    isRequired: true,
    subSteps: [
      {
        id: 'goals-business',
        title: '비즈니스 목표',
        description: '달성하고자 하는 비즈니스 목표를 정의합니다.',
        isRequired: true,
      },
      {
        id: 'goals-kpi',
        title: 'KPI 설정',
        description: '목표 달성을 측정할 수 있는 KPI를 설정합니다.',
        isRequired: true,
      },
    ],
  },
  {
    id: 'target-users',
    step: 4,
    title: '타겟 사용자',
    description: '주요 사용자와 페르소나를 정의합니다.',
    isRequired: true,
    subSteps: [
      {
        id: 'target-users-primary',
        title: '주요 사용자',
        description: '핵심 타겟 사용자를 정의합니다.',
        isRequired: true,
      },
      {
        id: 'target-users-persona',
        title: '페르소나',
        description: '대표 사용자 페르소나를 생성합니다.',
        isRequired: false,
      },
    ],
  },
  {
    id: 'features',
    step: 5,
    title: '핵심 기능',
    description: '개발할 핵심 기능과 우선순위를 정합니다.',
    isRequired: true,
    subSteps: [
      {
        id: 'features-core',
        title: '기능 정의',
        description: '핵심 기능을 정의하고 우선순위를 지정합니다.',
        isRequired: true,
      },
      {
        id: 'features-acceptance',
        title: '인수 조건',
        description: '각 기능의 인수 조건을 작성합니다.',
        isRequired: true,
      },
    ],
  },
  {
    id: 'solution',
    step: 6,
    title: '솔루션 제안',
    description: '제안하는 솔루션과 기술적 접근 방식을 기술합니다.',
    isRequired: true,
  },
  {
    id: 'scope',
    step: 7,
    title: '범위 및 마일스톤',
    description: '프로젝트 범위와 일정을 정합니다.',
    isRequired: true,
    subSteps: [
      {
        id: 'scope-definition',
        title: '범위 정의',
        description: '포함/미포함 범위를 명확히 합니다.',
        isRequired: true,
      },
      {
        id: 'scope-milestones',
        title: '마일스톤',
        description: '주요 마일스톤과 일정을 설정합니다.',
        isRequired: true,
      },
    ],
  },
  {
    id: 'ai-review',
    step: 8,
    title: 'AI 검토',
    description: 'AI가 PRD를 분석하고 개선 사항을 제안합니다.',
    isRequired: false,
  },
  {
    id: 'preview',
    step: 9,
    title: '미리보기',
    description: '완성된 PRD를 미리보기합니다.',
    isRequired: false,
  },
  {
    id: 'export',
    step: 10,
    title: '내보내기',
    description: 'PRD를 다양한 형식으로 내보냅니다.',
    isRequired: false,
  },
] as const;

export const TOTAL_STEPS = PRD_STEPS.length;

export const getStepById = (id: string): PRDStep | undefined =>
  PRD_STEPS.find((step) => step.id === id);

export const getStepByNumber = (step: number): PRDStep | undefined =>
  PRD_STEPS.find((s) => s.step === step);
