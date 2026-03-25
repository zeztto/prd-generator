// ── 모호 표현 감지 패턴 ──

export interface AmbiguityPattern {
  id: string;
  pattern: RegExp;
  label: string;
  feedback: string;
  suggestion: string;
}

export const AMBIGUITY_PATTERNS: AmbiguityPattern[] = [
  {
    id: 'fast',
    pattern: /빠르게|신속하게|빠른/g,
    label: '빠르게',
    feedback: '"빠르게"는 모호한 표현입니다. 구체적인 수치로 대체하세요.',
    suggestion: '예: "페이지 로딩 시간 2초 이내", "API 응답 시간 200ms 이하"',
  },
  {
    id: 'many',
    pattern: /많은|다수의|대량의/g,
    label: '많은',
    feedback: '"많은"은 모호한 표현입니다. 구체적인 수량을 명시하세요.',
    suggestion: '예: "월간 활성 사용자 10만 명", "일일 처리 건수 5,000건"',
  },
  {
    id: 'good',
    pattern: /좋은|우수한|뛰어난|훌륭한/g,
    label: '좋은',
    feedback: '"좋은"은 주관적인 표현입니다. 측정 가능한 기준을 제시하세요.',
    suggestion: '예: "사용자 만족도 NPS 70점 이상", "에러율 0.1% 이하"',
  },
  {
    id: 'easy',
    pattern: /쉬운|쉽게|간편하게|편리하게/g,
    label: '쉬운',
    feedback: '"쉬운"은 모호한 표현입니다. UX 지표로 대체하세요.',
    suggestion: '예: "3단계 이내로 완료", "신규 사용자 5분 내 첫 작업 완료"',
  },
  {
    id: 'etc',
    pattern: /\s등\s|등등|기타/g,
    label: '등',
    feedback: '"등"은 범위를 불명확하게 합니다. 가능하면 모든 항목을 나열하세요.',
    suggestion: '범위가 넓은 경우 "포함하되 이에 한정되지 않음" 형태로 명시하세요.',
  },
  {
    id: 'appropriate',
    pattern: /적절한|적절히|적합한|알맞은/g,
    label: '적절한',
    feedback: '"적절한"은 기준이 불명확합니다. 구체적인 조건을 명시하세요.',
    suggestion: '예: "화면 너비 360px~1440px 범위에서 정상 표시"',
  },
  {
    id: 'maximum',
    pattern: /최대한|가능한\s*한|되도록/g,
    label: '최대한',
    feedback: '"최대한"은 목표가 불명확합니다. 최소 기준값을 명시하세요.',
    suggestion: '예: "최소 99.9% 가동률 보장", "최소 1,000 TPS 처리"',
  },
  {
    id: 'maybe',
    pattern: /~?할\s*수도|수도\s*있|일\s*수도|것\s*같/g,
    label: '~할 수도',
    feedback: '불확실한 표현은 피하세요. 명확한 결정을 내리거나 조건을 명시하세요.',
    suggestion: '예: "A 조건일 때 B 기능을 제공한다", "MVP에서는 제외하고 Phase 2에서 검토"',
  },
];

// ── 일관성 검사 항목 ──

export interface ConsistencyRule {
  id: string;
  name: string;
  description: string;
  check: 'term_consistency' | 'scope_alignment' | 'kpi_coverage' | 'feature_priority' | 'timeline_feasibility' | 'persona_alignment' | 'goal_feature_mapping';
}

export const CONSISTENCY_RULES: ConsistencyRule[] = [
  {
    id: 'term-consistency',
    name: '용어 일관성',
    description: '문서 전체에서 동일한 개념에 동일한 용어를 사용하는지 검사합니다.',
    check: 'term_consistency',
  },
  {
    id: 'scope-alignment',
    name: '범위 정합성',
    description: '기능 목록과 범위 정의가 서로 일치하는지 검사합니다.',
    check: 'scope_alignment',
  },
  {
    id: 'kpi-coverage',
    name: 'KPI 커버리지',
    description: '모든 비즈니스 목표에 대응하는 KPI가 있는지 검사합니다.',
    check: 'kpi_coverage',
  },
  {
    id: 'feature-priority',
    name: '기능 우선순위 균형',
    description: 'Must/Should/Could/Won\'t 비율이 적절한지 검사합니다.',
    check: 'feature_priority',
  },
  {
    id: 'timeline-feasibility',
    name: '일정 실현 가능성',
    description: '마일스톤 일정이 기능 수와 복잡도에 비해 현실적인지 검사합니다.',
    check: 'timeline_feasibility',
  },
  {
    id: 'persona-alignment',
    name: '페르소나 정합성',
    description: '페르소나의 니즈가 기능 목록에 반영되어 있는지 검사합니다.',
    check: 'persona_alignment',
  },
  {
    id: 'goal-feature-mapping',
    name: '목표-기능 매핑',
    description: '각 비즈니스 목표가 하나 이상의 기능과 연결되는지 검사합니다.',
    check: 'goal_feature_mapping',
  },
];
