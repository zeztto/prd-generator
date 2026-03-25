export interface SectionGuideContent {
  sectionId: string;
  goodExamples: string[];
  badExamples: string[];
  writingTips: string[];
}

export const GUIDE_CONTENT: SectionGuideContent[] = [
  {
    sectionId: 'project-setup',
    goodExamples: [
      '프로젝트명: "B2B SaaS 고객 포털 MVP" - 대상과 범위가 명확합니다.',
      '설명: "기존 이메일 기반 고객 지원을 셀프서비스 포털로 전환하여 CS 응대 시간을 50% 절감" - 목적과 기대 효과가 구체적입니다.',
    ],
    badExamples: [
      '프로젝트명: "새로운 기능" - 어떤 기능인지 알 수 없습니다.',
      '설명: "서비스 개선" - 무엇을 어떻게 개선하는지 불명확합니다.',
    ],
    writingTips: [
      '프로젝트명에 버전, 대상, 핵심 키워드를 포함하세요.',
      '설명은 "누구를 위해, 무엇을, 왜 하는지"를 한 문장으로 작성하세요.',
      '연관 프로젝트가 있다면 관계를 명시하세요.',
    ],
  },
  {
    sectionId: 'background',
    goodExamples: [
      '"지난 분기 고객 이탈률이 12%에서 18%로 증가했으며, 이탈 설문 응답자의 63%가 고객 지원 불만을 이유로 꼽았습니다." - 데이터와 원인을 함께 제시합니다.',
      '"현재 평균 CS 응대 시간은 24시간이며, 업계 평균(4시간) 대비 6배 느립니다." - 벤치마크 비교가 설득력을 높입니다.',
    ],
    badExamples: [
      '"고객들이 불만이 많습니다." - 얼마나, 어떤 불만인지 구체적이지 않습니다.',
      '"경쟁사가 더 좋은 서비스를 제공합니다." - 어떤 면에서 어떻게 좋은지 불명확합니다.',
    ],
    writingTips: [
      '구체적인 데이터(수치, 기간, 비율)를 포함하세요.',
      '문제의 영향 범위와 심각도를 명시하세요.',
      '경쟁사와의 비교는 객관적 지표를 사용하세요.',
      '내부 데이터(이탈률, NPS, 매출)를 활용하면 설득력이 높아집니다.',
    ],
  },
  {
    sectionId: 'goals',
    goodExamples: [
      '"출시 6개월 내 MAU 5만 명 달성" - 기한과 수치가 명확합니다.',
      '"CS 응대 시간을 현재 24시간에서 4시간으로 단축 (83% 개선)" - 현재값과 목표값이 함께 있습니다.',
    ],
    badExamples: [
      '"최대한 많은 사용자 확보" - 수치 목표가 없습니다.',
      '"서비스 품질 향상" - 측정 기준이 없습니다.',
    ],
    writingTips: [
      'SMART 원칙: 구체적(Specific), 측정 가능(Measurable), 달성 가능(Achievable), 관련성(Relevant), 시한(Time-bound)',
      '반드시 baseline(현재값)을 함께 기록하세요.',
      'KPI는 3-5개가 적정합니다. 너무 많으면 집중력이 떨어집니다.',
      'Non-goal(하지 않을 것)을 정의하면 범위를 명확히 할 수 있습니다.',
    ],
  },
  {
    sectionId: 'target-users',
    goodExamples: [
      '"25-40세 스타트업 CTO/개발 리드로, 팀 규모 5-20명인 조직에서 프로젝트 관리 도구를 찾고 있는 사용자" - 인구통계, 역할, 니즈가 명확합니다.',
    ],
    badExamples: [
      '"개발자" - 범위가 너무 넓고 구체적이지 않습니다.',
      '"모든 사용자" - 타겟이 없는 것과 같습니다.',
    ],
    writingTips: [
      '페르소나에는 이름, 나이, 직업, 목표, 불만, 시나리오를 포함하세요.',
      '주요 사용자(Primary)와 부수적 사용자(Secondary)를 구분하세요.',
      '사용자 여정(User Journey)을 함께 그리면 기능 도출에 도움이 됩니다.',
    ],
  },
  {
    sectionId: 'features',
    goodExamples: [
      '"[Must] 이메일 로그인 - 이메일/비밀번호로 로그인할 수 있다. 비밀번호는 8자 이상, 영문+숫자+특수문자 조합. 5회 실패 시 30분 잠금." - 우선순위, 설명, 인수 조건이 모두 있습니다.',
    ],
    badExamples: [
      '"로그인 기능 만들기" - 어떤 방식인지, 조건이 무엇인지 불명확합니다.',
    ],
    writingTips: [
      'MoSCoW 분류: Must(필수) / Should(권장) / Could(선택) / Won\'t(미포함)',
      'Must가 전체의 60%를 넘지 않도록 하세요.',
      '각 기능에 인수 조건(Acceptance Criteria)을 반드시 작성하세요.',
      '기능 간 의존성이 있다면 명시하세요.',
    ],
  },
  {
    sectionId: 'solution',
    goodExamples: [
      '"Next.js 14 + Supabase 기반 풀스택 구현. 선택 이유: 빠른 프로토타이핑, 인증/DB 통합 제공, 팀 내 기술 숙련도 높음" - 기술 스택과 선택 근거가 있습니다.',
    ],
    badExamples: [
      '"최신 기술을 사용하여 개발" - 어떤 기술인지, 왜 그 기술인지 알 수 없습니다.',
    ],
    writingTips: [
      '기술 스택 선택의 이유를 명시하세요.',
      '검토했지만 선택하지 않은 대안과 그 이유를 기록하세요.',
      '제약 조건(시간, 예산, 인력)을 반영하세요.',
      '기술적 리스크와 완화 전략을 포함하세요.',
    ],
  },
  {
    sectionId: 'scope',
    goodExamples: [
      '"포함: 사용자 인증(이메일, OAuth), 대시보드, 리포트 생성\n미포함: 모바일 앱 (Phase 2), 다국어 지원 (Phase 3), 실시간 알림 (별도 프로젝트)" - 포함/미포함이 명확합니다.',
    ],
    badExamples: [
      '"가능한 모든 기능을 포함" - 범위가 정의되지 않았습니다.',
      '"일정: 빠르게" - 구체적인 일정이 없습니다.',
    ],
    writingTips: [
      '미포함 범위를 명시하여 범위 확장(scope creep)을 방지하세요.',
      '마일스톤마다 구체적인 산출물(deliverable)을 정의하세요.',
      '각 마일스톤 사이에 1-2주 버퍼를 포함하세요.',
      '리스크와 의존성(외부 API, 디자인 확정 등)을 일정에 반영하세요.',
    ],
  },
];

export const getGuideContent = (sectionId: string): SectionGuideContent | undefined =>
  GUIDE_CONTENT.find((g) => g.sectionId === sectionId);
