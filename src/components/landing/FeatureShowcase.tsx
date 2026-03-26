import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";

/* ── Feature A: AI 보강 비주얼 ── */
function AIEnhanceVisual() {
  return (
    <div className="flex flex-col gap-4">
      {/* Before 카드 */}
      <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
          Before
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          &quot;로그인 기능 만들기&quot;
        </p>
      </div>

      {/* 화살표 + 레이블 */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          <Sparkles className="h-3.5 w-3.5" />
          AI 보강
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
      </div>

      {/* After 카드 */}
      <div className="rounded-xl border-2 border-brand/30 bg-brand/5 p-5 shadow-sm">
        <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
          <Sparkles className="h-3 w-3" />
          After
        </div>
        <p className="text-sm leading-relaxed text-foreground">
          &quot;사용자는 이메일/비밀번호 또는 소셜 로그인(Google, Kakao)을 통해
          인증할 수 있어야 한다. 비밀번호는 8자 이상, 영문+숫자+특수문자를
          포함해야 하며, 5회 실패 시 계정이 일시 잠금된다.&quot;
        </p>
      </div>
    </div>
  );
}

/* ── Feature B: 품질 대시보드 비주얼 ── */
function QualityDashboardVisual() {
  const checkItems = [
    { label: "문제 정의 완료", status: "done" as const },
    { label: "타겟 사용자 명확", status: "done" as const },
    { label: "성공 지표 보강 필요", status: "warn" as const },
    { label: "범위 정의 누락", status: "fail" as const },
  ];

  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      {/* 상단: 점수 + 등급 */}
      <div className="flex items-center gap-6">
        {/* 원형 차트 (SVG) */}
        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 120 120"
            fill="none"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="currentColor"
              strokeWidth="10"
              className="text-muted/60"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 52 * 0.85} ${2 * Math.PI * 52 * 0.15}`}
              strokeLinecap="round"
              className="text-emerald-500"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold">85</span>
            <span className="text-[10px] text-muted-foreground">/100</span>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">
            A등급
          </div>
          <p className="mt-1 text-xs text-muted-foreground">전문가 수준</p>
        </div>
      </div>

      {/* 구분선 */}
      <div className="my-4 h-px bg-border/60" />

      {/* 체크리스트 */}
      <div className="space-y-2.5">
        {checkItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2.5 text-sm">
            {item.status === "done" && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle className="h-3.5 w-3.5" />
              </span>
            )}
            {item.status === "warn" && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-xs text-amber-600">
                !
              </span>
            )}
            {item.status === "fail" && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-500">
                &times;
              </span>
            )}
            <span
              className={
                item.status === "done"
                  ? "text-foreground"
                  : item.status === "warn"
                    ? "text-amber-600"
                    : "text-red-500"
              }
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature C: 가이드 패널 비주얼 ── */
function GuidePanelVisual() {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
      {/* 헤더 */}
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-400/15 text-sm">
          💡
        </span>
        작성 가이드
      </div>

      <div className="space-y-3">
        {/* 좋은 예시 */}
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-50/50 p-4 dark:bg-emerald-500/5">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <CheckCircle className="h-3.5 w-3.5" />
            좋은 예시
          </div>
          <p className="text-xs leading-relaxed text-emerald-800/80 dark:text-emerald-300/80">
            &quot;월 활성 사용자(MAU) 10,000명 달성을 목표로 하며, 가입 후 7일
            이내 재방문율 40% 이상을 타겟으로 한다.&quot;
          </p>
        </div>

        {/* 나쁜 예시 */}
        <div className="rounded-lg border border-red-500/20 bg-red-50/50 p-4 dark:bg-red-500/5">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <span className="text-sm">&times;</span>
            나쁜 예시
          </div>
          <p className="text-xs leading-relaxed text-red-800/80 dark:text-red-300/80">
            &quot;사용자가 많아야 한다.&quot;
          </p>
        </div>

        {/* 팁 */}
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Tip: </span>
            성공 지표는 항상 측정 가능한 숫자로 정의하세요. 기간과 목표치를
            함께 명시하면 더 좋습니다.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── 포인트 목록 렌더러 ── */
function PointList({ points }: { points: string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {points.map((point) => (
        <li key={point} className="flex items-start gap-3 text-sm">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span className="text-muted-foreground">{point}</span>
        </li>
      ))}
    </ul>
  );
}

/* ━━━━━━━━━━━━━━━━━━ 메인 컴포넌트 ━━━━━━━━━━━━━━━━━━ */
export default function FeatureShowcase() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* ── Feature A ── */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* 텍스트 (좌) */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              AI Enhancement
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              키워드만 입력하면
              <br />
              AI가 전문가 수준으로 확장합니다
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              간단한 메모나 키워드를 입력하세요. AI가 문맥을 이해하고 구체적이고
              측정 가능한 PRD 문장으로 변환합니다.
            </p>
            <PointList
              points={[
                "모호한 표현을 구체적 문장으로 변환",
                "업계 표준 용어와 포맷 자동 적용",
                "원본 의도를 유지하면서 보강",
              ]}
            />
          </div>

          {/* 비주얼 (우) */}
          <div>
            <AIEnhanceVisual />
          </div>
        </div>

        {/* ── Feature B ── */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 md:mt-32 md:grid-cols-2 md:gap-16">
          {/* 비주얼 (좌 — 모바일에서는 텍스트가 먼저) */}
          <div className="order-2 md:order-1">
            <QualityDashboardVisual />
          </div>

          {/* 텍스트 (우) */}
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Quality Score
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              작성하면서 바로
              <br />
              품질을 확인하세요
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              PRD를 작성하는 동안 AI가 실시간으로 문서 품질을 분석합니다. 모호한
              표현, 누락된 섹션, 일관성 문제를 즉시 피드백합니다.
            </p>
            <PointList
              points={[
                "100점 만점 품질 점수 실시간 표시",
                "구체적 개선 제안과 수정 가이드",
                "업계 베스트 프랙티스 기준 평가",
              ]}
            />
          </div>
        </div>

        {/* ── Feature C ── */}
        <div className="mt-20 grid grid-cols-1 items-center gap-10 md:mt-32 md:grid-cols-2 md:gap-16">
          {/* 텍스트 (좌) */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Learning Guide
            </span>
            <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              PRD가 처음이어도
              <br />
              걱정하지 마세요
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              각 섹션마다 &apos;왜 이 섹션이 필요한지&apos;, &apos;어떻게
              작성하는지&apos; 상세 가이드를 제공합니다. 좋은 예시와 나쁜 예시를
              보면서 자연스럽게 PRD 작성법을 익힐 수 있습니다.
            </p>
            <PointList
              points={[
                "섹션별 작성 가이드와 체크리스트",
                "좋은 예시 vs 나쁜 예시 비교",
                "Google, Amazon 등 실제 기업 사례 참고",
              ]}
            />
          </div>

          {/* 비주얼 (우) */}
          <div>
            <GuidePanelVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
