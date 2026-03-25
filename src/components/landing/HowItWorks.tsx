const steps = [
  {
    number: 1,
    title: "프로젝트 설정",
    description: "이름, 유형, 플랫폼을 선택하세요",
  },
  {
    number: 2,
    title: "질문에 답하기",
    description: "AI가 안내하는 질문에 답하면 PRD가 채워져요",
  },
  {
    number: 3,
    title: "검토 & 내보내기",
    description: "AI가 품질을 점검하고, 원하는 형식으로 내보내세요",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-muted/40 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          이렇게 사용해요
        </h2>

        <div className="mt-10 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center md:flex-col">
              {/* 스텝 콘텐츠 */}
              <div className="flex flex-col items-center text-center md:px-8">
                {/* 숫자 뱃지 */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  {step.number}
                </div>
                <h3 className="mt-4 text-base font-semibold md:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[200px] text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* 연결선: 모바일은 세로, 데스크톱은 가로 */}
              {index < steps.length - 1 && (
                <>
                  {/* 모바일 세로 연결선 */}
                  <div className="mx-auto my-4 hidden h-8 w-px border-l-2 border-dashed border-border max-md:block" />
                  {/* 데스크톱 가로 연결선 */}
                  <div className="hidden h-px w-16 border-t-2 border-dashed border-border md:block md:self-center lg:w-24" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
