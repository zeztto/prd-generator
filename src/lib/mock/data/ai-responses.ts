// ── 각 섹션별 AI 보강 응답 예시 ──

export const AI_ENHANCE_RESPONSES: Record<string, string> = {
  // 배경 보강
  background_problem: `현재 모바일 주문 시스템에서 다음과 같은 핵심 문제가 확인되었습니다:

1. **높은 주문 이탈률**: 최근 3개월간 모바일 주문 이탈률이 45%에서 62%로 17%p 증가했습니다. 이는 업계 평균(35%)을 크게 상회하는 수치입니다.

2. **복잡한 주문 프로세스**: 현재 주문 완료까지 7단계가 필요하며, 사용자 인터뷰(n=50) 결과 76%가 "과정이 복잡하다"고 응답했습니다.

3. **그룹 주문 미지원**: 직장인 사용자의 68%가 동료와 함께 주문하는데, 현재 시스템은 개별 주문만 지원하여 불편을 초래하고 있습니다.

4. **경쟁사 대비 열위**: 주요 경쟁사 3개 중 2개가 이미 그룹 주문 기능을 제공하고 있으며, 평균 주문 단계는 3-4단계입니다.`,

  background_situation: `현재 상황을 정리하면 다음과 같습니다:

- **시스템 현황**: 2022년 출시된 v1.0 기반으로 운영 중이며, 모놀리식 아키텍처로 인해 기능 추가에 평균 4주 이상 소요
- **사용자 규모**: MAU 15만 명, DAU 4.2만 명 (전년 동기 대비 -8%)
- **매출 영향**: 모바일 주문 매출 비중 42%이나, 이탈률 증가로 월 평균 2.3억 원의 잠재 매출 손실 추정
- **기술 부채**: 레거시 결제 모듈의 에러율 2.1%로, 업계 평균(0.5%) 대비 4배 이상`,

  // 목표 보강
  goals_business: `비즈니스 목표를 SMART 원칙에 맞게 구체화합니다:

**주요 목표 (Primary Goals)**
1. 모바일 주문 전환율 38% → 53% 달성 (6개월 내, +15%p)
2. 그룹 주문 도입을 통한 건당 평균 객단가 20% 증가 (현 18,500원 → 22,200원)
3. 주문 프로세스 간소화로 평균 주문 소요 시간 50% 단축 (180초 → 90초)

**부차 목표 (Secondary Goals)**
4. 모바일 앱 NPS 점수 현재 32점 → 55점 이상
5. CS 문의 중 주문 관련 비율 현재 45% → 25% 이하`,

  // 기능 보강
  features_core: `기능 정의를 보다 구체적으로 보강합니다:

**그룹 주문 생성 [Must]**
- 고유 주문 링크(UUID 기반) 생성 및 딥링크/URL 공유
- 최대 20명 동시 참여, 참여자 실시간 현황 표시
- 마감 시간 설정 기능 (기본 30분, 최대 24시간)
- 호스트 권한: 주문 마감, 참여자 관리, 전체 주문 확인

**인수 조건 보강**
- 링크 생성 후 3초 이내 공유 가능 상태
- 참여자 입장 시 1초 이내 현재 주문 현황 로딩
- 네트워크 불안정 시 로컬 캐시 기반 오프라인 주문 작성 후 복구 시 동기화`,

  // 솔루션 보강
  solution_proposed: `제안 솔루션의 기술적 세부 사항을 보강합니다:

**아키텍처**
- 마이크로서비스 기반: 주문 서비스, 결제 서비스, 알림 서비스 분리
- 이벤트 드리븐: Kafka를 활용한 서비스 간 비동기 통신
- 실시간 통신: Socket.IO 기반 양방향 통신 (Fallback: Server-Sent Events)

**기술 스택**
- Frontend: React Native 0.73+ (Expo)
- Backend: Node.js 20 LTS + Fastify
- DB: PostgreSQL 16 (주문/사용자) + Redis 7 (캐싱/세션)
- Infra: AWS ECS Fargate + CloudFront CDN

**확장성 고려**
- 동시 접속 1,000명 기준 설계 (향후 10,000명까지 수평 확장)
- DB 읽기 부하 분산을 위한 Read Replica 구성`,
};

// ── AI 검토 결과 예시 ──

export const AI_REVIEW_RESPONSE = {
  items: [
    {
      id: 'review-001',
      section: 'background',
      type: 'suggestion' as const,
      message: '경쟁사 분석에 시장 점유율 데이터를 추가하면 설득력이 높아집니다.',
      suggestedText: '경쟁사 A (시장점유율 35%), 경쟁사 B (시장점유율 28%) 대비 우리 서비스의 현재 점유율은 15%입니다.',
    },
    {
      id: 'review-002',
      section: 'goals',
      type: 'warning' as const,
      message: 'KPI "주문 전환율 53%"의 달성 근거가 부족합니다. 벤치마크 데이터나 유사 프로젝트 사례를 추가하세요.',
    },
    {
      id: 'review-003',
      section: 'features',
      type: 'suggestion' as const,
      message: '에러 처리 시나리오(결제 실패, 네트워크 오류 등)에 대한 기능 정의가 필요합니다.',
    },
    {
      id: 'review-004',
      section: 'scope',
      type: 'warning' as const,
      message: '마일스톤 M1에서 M2까지의 기간이 3주로, 결제 연동 작업 대비 촉박할 수 있습니다. 버퍼를 고려하세요.',
    },
    {
      id: 'review-005',
      section: 'solution',
      type: 'error' as const,
      message: '보안 요구사항이 누락되어 있습니다. 결제 관련 기능이 있으므로 PCI DSS 준수 여부를 명시해야 합니다.',
    },
  ],
  qualityScore: {
    overall: 72,
    completeness: 78,
    clarity: 75,
    consistency: 68,
    specificity: 65,
  },
  summary: '전체적으로 잘 구성된 PRD입니다. 배경과 목표가 명확하며, 핵심 기능이 우선순위와 함께 정의되어 있습니다. 다만 보안 요구사항 누락, 일부 KPI 근거 부족, 에러 시나리오 미정의 등의 개선 사항이 있습니다. 마일스톤 일정의 실현 가능성 재검토를 권장합니다.',
  reviewedAt: new Date().toISOString(),
};

// ── AI 추천 KPI 예시 ──

export const AI_SUGGESTED_KPIS = [
  {
    id: 'kpi-suggested-001',
    name: '그룹 주문 전환율',
    targetValue: '65',
    unit: '%',
    description: '그룹 주문 링크 생성 후 실제 결제 완료 비율',
  },
  {
    id: 'kpi-suggested-002',
    name: '주문 완료 시간',
    targetValue: '90',
    unit: '초',
    description: '메뉴 선택부터 결제 완료까지 평균 소요 시간',
  },
  {
    id: 'kpi-suggested-003',
    name: '그룹 주문 참여율',
    targetValue: '80',
    unit: '%',
    description: '링크를 받은 사용자 중 실제 메뉴를 선택한 비율',
  },
];

// ── AI 생성 페르소나 예시 ──

export const AI_GENERATED_PERSONA = {
  id: 'persona-ai-001',
  name: '이수진',
  age: '28',
  occupation: '마케팅 매니저',
  painPoints: [
    '팀 회식 주문 시 10명 이상의 메뉴를 일일이 취합해야 함',
    '대표 결제 후 정산이 번거로움',
    '주문 변경 시 전체 주문을 다시 해야 하는 불편함',
  ],
  needs: [
    '간편한 그룹 주문 링크 공유',
    '각자 결제 기능',
    '주문 현황 실시간 확인',
    '자주 시키는 메뉴 저장',
  ],
  scenario: '금요일 팀 회식을 위해 오후 4시에 그룹 주문 링크를 생성하고 팀 메신저에 공유합니다. 팀원 8명이 각자 메뉴를 선택하고, 5시까지 마감 후 각자 결제를 진행합니다.',
};
