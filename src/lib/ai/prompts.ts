export const SYSTEM_PROMPT = `당신은 경험 많은 한국 IT 기업의 시니어 프로덕트 매니저입니다.
PRD(제품 요구사항 문서) 작성을 돕는 것이 임무입니다.

출력 규칙:
- 모든 출력은 한국어로 작성합니다
- 비즈니스/기술 용어는 적절히 한국어와 영어를 혼용합니다 (예: "사용자 스토리(User Story)")
- 구체적이고 측정 가능한 표현을 사용합니다
- "적절한", "다양한", "많은" 같은 모호한 표현을 피합니다
- 통계나 수치를 포함할 때는 "예시 수치"임을 명시합니다

포맷 규칙:
- Markdown 형식으로 출력합니다
- 구조적이고 읽기 쉽게 작성합니다`;

export function getEnhancePrompt(section: string, content: string): string {
  const sectionNames: Record<string, string> = {
    background_currentSituation: '배경 - 현재 상황',
    background_problem: '배경 - 핵심 문제',
    goals_business: '목표 - 비즈니스 목표',
    goals_user: '목표 - 사용자 목표',
    solution_proposed: '솔루션 개요',
    solution_alternatives: '대안 검토',
  };

  const sectionName = sectionNames[section] || section;

  return `사용자가 PRD의 "${sectionName}" 섹션에 다음과 같이 작성했습니다:

---
${content}
---

위 내용을 전문적인 PRD 수준으로 개선해주세요.
- 원래 의도와 핵심 내용을 유지하면서 구조화하고 구체화하세요
- 모호한 표현이 있으면 구체적인 수치나 기준으로 대체를 제안하세요 (예시 수치임을 표시)
- 300-500자 분량으로 작성하세요
- 마크다운 형식 없이 순수 텍스트로 작성하세요`;
}

export function getKPISuggestPrompt(background: string, goals: string): string {
  return `다음 프로젝트의 배경과 목표를 기반으로 핵심 성공 지표(KPI) 3-4개를 제안해주세요.

배경:
${background}

목표:
${goals}

각 KPI는 다음 JSON 형식으로 작성하세요:
[
  {
    "name": "지표명",
    "currentValue": "현재 추정값 (예시)",
    "targetValue": "목표값",
    "method": "측정 방법"
  }
]

JSON만 출력하세요. 다른 텍스트는 포함하지 마세요.`;
}

export function getPersonaPrompt(context: string): string {
  return `다음 프로젝트 정보를 기반으로 핵심 사용자 페르소나 1명을 생성해주세요.

${context}

다음 JSON 형식으로 작성하세요:
{
  "userType": "사용자 유형",
  "characteristics": "주요 특성 (2-3문장)",
  "needs": "핵심 니즈 (2-3문장)",
  "currentSolution": "현재 해결 방법",
  "scenario": "사용 시나리오 (3-4문장)"
}

JSON만 출력하세요. 다른 텍스트는 포함하지 마세요.`;
}

export function getReviewPrompt(prdContent: string): string {
  return `다음 PRD 문서를 검토하고 품질 피드백을 제공해주세요.

${prdContent}

다음 JSON 형식으로 검토 결과를 작성하세요:
{
  "score": 0-100 사이의 품질 점수,
  "items": [
    {
      "type": "error" | "warning" | "suggestion" | "positive",
      "title": "피드백 제목",
      "description": "상세 설명",
      "section": "관련 섹션명"
    }
  ]
}

평가 기준:
- 완성도 (필수 섹션 작성 여부) 40%
- 구체성 (모호한 표현 없음) 20%
- 측정 가능성 (KPI, 수치 포함) 20%
- 일관성 (섹션 간 정합성) 20%

JSON만 출력하세요. 다른 텍스트는 포함하지 마세요.`;
}
