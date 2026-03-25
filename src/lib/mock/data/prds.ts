import {
  DocStatus,
  FeaturePriority,
  Platform,
  ProjectType,
  TargetMarket,
} from '@/types/prd.types';
import type { PRDDocument, PRDSummary } from '@/types/prd.types';

// ── 대시보드용 PRD 요약 목록 ──

export const MOCK_PRD_LIST: PRDSummary[] = [
  {
    id: 'prd-001',
    title: '모바일 주문 시스템 v2.0 리뉴얼',
    description: '기존 모바일 주문 시스템의 UX를 개선하고 그룹 주문 기능을 추가하여 전환율 향상',
    status: DocStatus.DRAFT,
    qualityScore: 45,
    projectType: ProjectType.FEATURE_IMPROVEMENT,
    createdAt: '2025-03-15T09:00:00.000Z',
    updatedAt: '2025-03-20T14:30:00.000Z',
  },
  {
    id: 'prd-002',
    title: '사내 대시보드 통합 플랫폼',
    description: '분산된 데이터 대시보드를 하나의 통합 플랫폼으로 구축',
    status: DocStatus.DRAFT,
    qualityScore: 30,
    projectType: ProjectType.NEW_PRODUCT,
    createdAt: '2025-03-10T10:00:00.000Z',
    updatedAt: '2025-03-18T11:00:00.000Z',
  },
  {
    id: 'prd-003',
    title: 'API 게이트웨이 마이그레이션',
    description: '레거시 API 게이트웨이를 클라우드 네이티브 솔루션으로 마이그레이션',
    status: DocStatus.IN_REVIEW,
    qualityScore: 72,
    projectType: ProjectType.TECH_INFRA,
    createdAt: '2025-02-20T08:00:00.000Z',
    updatedAt: '2025-03-19T16:00:00.000Z',
  },
  {
    id: 'prd-004',
    title: '개인화 추천 엔진 A/B 테스트',
    description: '협업 필터링 기반 추천 알고리즘의 효과를 검증하는 실험',
    status: DocStatus.FINALIZED,
    qualityScore: 88,
    projectType: ProjectType.EXPERIMENT,
    createdAt: '2025-01-15T09:00:00.000Z',
    updatedAt: '2025-03-01T10:00:00.000Z',
  },
  {
    id: 'prd-005',
    title: '결제 모듈 안정화',
    description: '결제 실패율 감소 및 재시도 로직 개선',
    status: DocStatus.ARCHIVED,
    qualityScore: 91,
    projectType: ProjectType.BUG_FIX,
    createdAt: '2024-12-01T09:00:00.000Z',
    updatedAt: '2025-02-15T17:00:00.000Z',
  },
];

// ── 상세 PRD 문서 (대표 1건) ──

export const MOCK_PRD_DETAIL: PRDDocument = {
  id: 'prd-001',
  title: '모바일 주문 시스템 v2.0 리뉴얼',
  description: '기존 모바일 주문 시스템의 UX를 개선하고 그룹 주문 기능을 추가하여 전환율 향상',
  status: DocStatus.DRAFT,
  qualityScore: 45,
  authorId: 'user-001',
  projectSetup: {
    title: '모바일 주문 시스템 v2.0 리뉴얼',
    description: '기존 모바일 주문 시스템의 UX를 개선하고 그룹 주문 기능을 추가하여 주문 전환율을 15% 향상시키는 프로젝트',
    projectType: ProjectType.FEATURE_IMPROVEMENT,
    platform: [Platform.MOBILE, Platform.WEB],
    targetMarket: TargetMarket.B2C,
    startDate: '2025-04-01',
    endDate: '2025-07-31',
  },
  background: {
    problemStatement: '최근 3개월간 모바일 주문 이탈률이 45%에서 62%로 증가했습니다. 사용자 인터뷰 결과, 주문 과정이 7단계로 복잡하고 그룹 주문 시 개별 결제가 불가능한 점이 주요 불만으로 확인되었습니다.',
    currentSituation: '현재 모바일 주문 시스템은 2022년에 출시된 v1.0을 사용 중이며, 단일 사용자 주문만 지원합니다. 경쟁사 대비 주문 단계가 2배 이상 길고, 그룹 주문 기능이 없어 시장 경쟁력이 저하되고 있습니다.',
    competitorAnalysis: '주요 경쟁사 A는 3단계 주문과 그룹 주문 기능을 제공하며, 경쟁사 B는 AI 기반 메뉴 추천을 통해 주문 시간을 40% 단축했습니다.',
  },
  goals: {
    businessGoals: '모바일 주문 전환율을 현재 38%에서 53%로 향상시키고, 그룹 주문을 통해 객단가를 20% 증가시킵니다.',
    userGoals: '사용자가 3단계 이내로 주문을 완료할 수 있도록 하고, 그룹 주문 시 개별 결제가 가능하도록 합니다.',
    kpis: [
      {
        id: 'kpi-001',
        name: '주문 전환율',
        targetValue: '53',
        currentValue: '38',
        unit: '%',
        description: '장바구니 진입 후 결제 완료 비율',
      },
      {
        id: 'kpi-002',
        name: '평균 주문 소요 시간',
        targetValue: '90',
        currentValue: '180',
        unit: '초',
        description: '메뉴 선택부터 결제 완료까지의 시간',
      },
    ],
    successCriteria: '출시 3개월 후 주문 전환율 53% 달성 및 그룹 주문 월간 활성 사용자 5,000명 확보',
  },
  targetUsers: {
    primaryUsers: '25-35세 직장인으로, 점심시간에 동료 5-10명과 함께 음식을 주문하는 그룹',
    personas: [
      {
        id: 'persona-001',
        name: '김민수',
        age: '32',
        occupation: '개발팀 리드',
        painPoints: [
          '매일 점심 메뉴 취합에 평균 15분 소요',
          '개별 결제가 불가능해 한 명이 대표 결제 후 정산',
          '주문 수정 시 처음부터 다시 시작해야 함',
        ],
        needs: [
          '빠른 그룹 주문 생성 및 공유',
          '개별 메뉴 선택 및 결제',
          '이전 주문 기반 빠른 재주문',
        ],
        scenario: '점심시간 30분 전, 팀 Slack 채널에 주문 링크를 공유하고 각자 메뉴를 선택한 뒤 개별 결제하는 플로우',
      },
    ],
  },
  features: {
    coreFeatures: [
      {
        id: 'feat-001',
        title: '그룹 주문 생성',
        description: '주문 링크를 생성하여 그룹원에게 공유하고, 각자 메뉴를 선택할 수 있는 기능',
        priority: FeaturePriority.MUST,
        acceptanceCriteria: [
          '주문 링크 생성 시 고유 URL이 발급된다',
          '최대 20명까지 참여 가능하다',
          '각 참여자는 자신의 메뉴만 수정/삭제할 수 있다',
        ],
        estimatedEffort: '3주',
      },
      {
        id: 'feat-002',
        title: '간소화된 주문 플로우',
        description: '기존 7단계 주문을 3단계로 축소',
        priority: FeaturePriority.MUST,
        acceptanceCriteria: [
          '메뉴 선택 → 옵션 설정 → 결제 3단계로 완료',
          '이전 주문 기반 원클릭 재주문 지원',
        ],
        estimatedEffort: '2주',
      },
      {
        id: 'feat-003',
        title: '개별 결제',
        description: '그룹 주문에서 각 참여자가 자신의 금액만 결제',
        priority: FeaturePriority.SHOULD,
        acceptanceCriteria: [
          '참여자별 결제 금액이 자동 분리된다',
          '카드, 간편결제 등 다양한 결제 수단 지원',
        ],
        estimatedEffort: '2주',
      },
    ],
  },
  solution: {
    proposedSolution: '실시간 공유 장바구니 기반의 그룹 주문 시스템을 구축합니다. WebSocket을 활용하여 참여자 간 실시간 동기화를 구현하고, PG사 분할 결제 API를 연동합니다.',
    technicalApproach: 'React Native 기반 크로스 플랫폼 개발, WebSocket(Socket.IO) 실시간 통신, PostgreSQL + Redis 캐싱',
    alternativesConsidered: '폴링 방식 vs WebSocket - 실시간성 요구사항으로 WebSocket 선택, Native 개발 vs 크로스 플랫폼 - 개발 속도 우선으로 React Native 선택',
  },
  scope: {
    inScope: '그룹 주문 생성/공유/참여, 간소화된 주문 플로우, 개별 결제, 주문 현황 대시보드',
    outOfScope: '배달 추적 실시간 지도 (Phase 2), 리뷰 시스템 (Phase 2), 포인트 적립 (Phase 3)',
    milestones: [
      {
        id: 'ms-001',
        title: 'M1: 기본 플로우 구현',
        description: '그룹 주문 생성, 공유, 메뉴 선택 기본 플로우',
        targetDate: '2025-04-21',
        deliverables: ['그룹 주문 생성 API', '공유 링크 생성', '메뉴 선택 UI'],
      },
      {
        id: 'ms-002',
        title: 'M2: 결제 연동',
        description: '개별 결제 및 PG사 연동',
        targetDate: '2025-05-12',
        deliverables: ['PG사 분할 결제 연동', '결제 UI', '결제 완료 알림'],
      },
      {
        id: 'ms-003',
        title: 'M3: QA 및 출시',
        description: 'QA, 버그 수정, 스토어 출시',
        targetDate: '2025-05-26',
        deliverables: ['QA 리포트', '버그 수정', '앱 스토어 배포'],
      },
    ],
  },
  createdAt: '2025-03-15T09:00:00.000Z',
  updatedAt: '2025-03-20T14:30:00.000Z',
};

// ── ID로 PRD 조회 헬퍼 ──

export const getMockPRDById = (id: string): PRDDocument | undefined => {
  if (id === MOCK_PRD_DETAIL.id) return MOCK_PRD_DETAIL;
  // 다른 PRD는 기본 구조로 생성
  const summary = MOCK_PRD_LIST.find((p) => p.id === id);
  if (!summary) return undefined;

  return {
    ...MOCK_PRD_DETAIL,
    id: summary.id,
    title: summary.title,
    description: summary.description,
    status: summary.status,
    qualityScore: summary.qualityScore,
    projectSetup: {
      ...MOCK_PRD_DETAIL.projectSetup,
      title: summary.title,
      description: summary.description,
      projectType: summary.projectType,
    },
    createdAt: summary.createdAt,
    updatedAt: summary.updatedAt,
  };
};
