import type { AIService } from '@/types/api.types';
import { FeaturePriority } from '@/types/prd.types';
import type {
  AIReviewResult,
  BackgroundData,
  FeaturesData,
  GoalsData,
  KPI,
  Persona,
  PRDDocument,
  ScopeData,
  SolutionData,
  TargetUsersData,
} from '@/types/prd.types';
import {
  AI_ENHANCE_RESPONSES,
  AI_REVIEW_RESPONSE,
  AI_SUGGESTED_KPIS,
  AI_GENERATED_PERSONA,
} from '@/lib/mock/data/ai-responses';
import { mockAIDelay } from '@/lib/mock/delay';

const mockAIServiceImpl: AIService = {
  async enhance(section: string, content: string): Promise<string> {
    await mockAIDelay();

    // 섹션에 맞는 AI 보강 응답 반환
    const key = section.replace('.', '_');
    const enhancedContent = AI_ENHANCE_RESPONSES[key];

    if (enhancedContent) {
      return enhancedContent;
    }

    // 기본 보강 응답
    return `${content}\n\n[AI 보강] 위 내용을 더 구체적이고 측정 가능하게 보강했습니다. 데이터 기반의 근거를 추가하고, 모호한 표현을 구체적인 수치로 대체했습니다.`;
  },

  async review(prd: PRDDocument): Promise<AIReviewResult> {
    await mockAIDelay();
    await mockAIDelay(); // AI 검토는 더 오래 걸림

    return {
      ...AI_REVIEW_RESPONSE,
      reviewedAt: new Date().toISOString(),
    };
  },

  async suggestKPIs(context: {
    background: BackgroundData;
    goals: GoalsData;
  }): Promise<KPI[]> {
    await mockAIDelay();

    return AI_SUGGESTED_KPIS.map((kpi) => ({
      ...kpi,
      id: `kpi-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    }));
  },

  async generatePersona(context: {
    targetUsers: TargetUsersData;
    background: BackgroundData;
  }): Promise<Persona> {
    await mockAIDelay();

    return {
      ...AI_GENERATED_PERSONA,
      id: `persona-${Date.now()}`,
    };
  },

  async suggestFeatures(context: {
    goals: GoalsData;
    targetUsers: TargetUsersData;
    solution: SolutionData;
  }): Promise<FeaturesData> {
    await mockAIDelay();

    return {
      coreFeatures: [
        {
          id: `feat-ai-${Date.now()}-1`,
          title: '실시간 공유 장바구니',
          description: 'WebSocket 기반으로 그룹 참여자의 메뉴 선택을 실시간 동기화하는 기능',
          priority: FeaturePriority.MUST,
          acceptanceCriteria: [
            '참여자의 메뉴 변경이 1초 이내에 다른 참여자에게 반영된다',
            '네트워크 끊김 시 로컬 큐에 저장 후 재연결 시 동기화된다',
          ],
          estimatedEffort: '2주',
        },
        {
          id: `feat-ai-${Date.now()}-2`,
          title: '주문 마감 타이머',
          description: '호스트가 설정한 마감 시간에 자동으로 주문을 마감하는 기능',
          priority: FeaturePriority.SHOULD,
          acceptanceCriteria: [
            '마감 5분 전 참여자에게 푸시 알림을 전송한다',
            '마감 후에는 메뉴 추가/변경이 불가능하다',
          ],
          estimatedEffort: '1주',
        },
      ],
      additionalNotes: 'AI가 프로젝트 목표와 타겟 사용자를 분석하여 제안한 기능입니다.',
    };
  },

  async suggestScope(context: {
    features: FeaturesData;
    scope: ScopeData;
  }): Promise<ScopeData> {
    await mockAIDelay();

    return {
      inScope: '그룹 주문 생성/공유/참여, 간소화된 주문 플로우 (3단계), 개별 결제, 주문 현황 실시간 대시보드, 주문 알림 (푸시/인앱)',
      outOfScope: '배달 추적 실시간 지도 (Phase 2), 리뷰/평점 시스템 (Phase 2), 포인트/쿠폰 적립 (Phase 3), 다국어 지원 (Phase 3)',
      milestones: [
        {
          id: `ms-ai-${Date.now()}-1`,
          title: 'M1: 기본 플로우 구현',
          description: '그룹 주문 생성, 공유, 메뉴 선택 기본 플로우 구현 및 내부 테스트',
          targetDate: '2025-04-21',
          deliverables: ['그룹 주문 API 구현', '공유 링크 시스템', '메뉴 선택 UI', '내부 QA'],
        },
        {
          id: `ms-ai-${Date.now()}-2`,
          title: 'M2: 결제 및 실시간 기능',
          description: 'PG사 연동, 개별 결제, WebSocket 실시간 동기화 구현',
          targetDate: '2025-05-19',
          deliverables: ['PG사 분할 결제 연동', '실시간 장바구니 동기화', '결제 UI 구현'],
        },
        {
          id: `ms-ai-${Date.now()}-3`,
          title: 'M3: QA 및 출시',
          description: '전체 QA, 성능 테스트, 스토어 심사 및 출시',
          targetDate: '2025-06-02',
          deliverables: ['QA 완료 리포트', '성능 테스트 결과', '앱 스토어 배포'],
        },
      ],
      risks: '결제 PG사 연동 일정 지연 가능성, WebSocket 대규모 동시 접속 성능 이슈',
      dependencies: 'PG사 API 문서 확보 (4월 1주차까지), 디자인 시안 확정 (3월 4주차까지)',
    };
  },
};

export const mockAIService = mockAIServiceImpl;
