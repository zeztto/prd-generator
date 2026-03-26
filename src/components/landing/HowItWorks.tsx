import { Settings, Sparkles, FileCheck, Clock } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Settings,
    title: "프로젝트 설정",
    description:
      "프로젝트 이름, 유형, 플랫폼을 선택하세요. 30초면 충분합니다. 신규 제품, 기능 개선, API 등 다양한 유형을 지원합니다.",
  },
  {
    number: 2,
    icon: Sparkles,
    title: "AI와 함께 작성",
    description:
      "AI가 안내하는 6단계 질문에 차근차근 답하세요. 배경, 목표, 사용자, 기능, 솔루션, 범위까지 자동 구성됩니다.",
  },
  {
    number: 3,
    icon: FileCheck,
    title: "검토 & 내보내기",
    description:
      "AI가 완성도를 100점 만점으로 평가하고 개선 포인트를 제안합니다. Markdown, PDF 등으로 바로 내보내세요.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-muted/30 py-20 md:py-28"
    >
      {/* 도트 패턴 배경 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            3단계면 충분해요
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            복잡한 문서 작성은 잊으세요. 간단한 3단계로 완성됩니다.
          </p>
        </div>

        {/* 스텝 카드 */}
        <div className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {/* ── 커넥터 라인 (데스크톱: 가로 점선) ── */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden md:block">
            <div className="mx-auto" style={{ width: "60%", margin: "0 auto" }}>
              <div className="h-px border-t-2 border-dashed border-brand/25" />
            </div>
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col items-center">
              {/* ── 커넥터 라인 (모바일: 세로 점선) ── */}
              {i < steps.length - 1 && (
                <div className="absolute -bottom-10 left-1/2 h-10 -translate-x-1/2 border-l-2 border-dashed border-brand/25 md:hidden" />
              )}

              {/* 숫자 원 */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg font-bold text-brand-foreground shadow-lg shadow-brand/25">
                {step.number}
              </div>

              {/* 카드 */}
              <div className="mt-6 w-full rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm transition-all duration-300 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 md:mx-4">
                {/* 아이콘 */}
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10">
                  <step.icon className="h-5 w-5 text-brand" />
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 태그 */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-medium text-brand">
            <Clock className="h-4 w-4" />
            평균 작성 시간: 30분
          </div>
        </div>
      </div>
    </section>
  );
}
