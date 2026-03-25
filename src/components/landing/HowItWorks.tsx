const steps = [
  {
    number: "01",
    title: "프로젝트 설정",
    description: "이름, 유형, 플랫폼을 선택하세요. 30초면 충분합니다.",
  },
  {
    number: "02",
    title: "질문에 답하기",
    description: "AI가 안내하는 질문에 답하면 PRD가 자동으로 채워져요.",
  },
  {
    number: "03",
    title: "검토 & 내보내기",
    description: "AI가 품질을 점검하고, 원하는 형식으로 내보내세요.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            3단계면 충분해요
          </h2>
        </div>

        {/* 스텝 카드 */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border border-border/60 bg-card p-8 transition-all duration-300 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
            >
              {/* 큰 숫자 배경 */}
              <span className="text-6xl font-bold text-brand/10">
                {step.number}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
