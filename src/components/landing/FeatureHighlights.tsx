import { FileText, Sparkles, BarChart3, BookOpen } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "단계별 가이드",
    description: "빈 페이지가 아닌 질문에 답하는 방식으로 작성해요",
  },
  {
    icon: Sparkles,
    title: "AI 보강",
    description: "키워드만 입력하면 AI가 전문적인 문장으로 확장해요",
  },
  {
    icon: BarChart3,
    title: "품질 자동 평가",
    description: "모호한 표현, 누락 항목을 자동으로 감지해요",
  },
  {
    icon: BookOpen,
    title: "배우면서 작성",
    description: "각 섹션별 가이드와 좋은 예시를 제공해요",
  },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            PRD 작성의 모든 것을
            <br className="hidden sm:block" />
            한 곳에서
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            복잡한 PRD 작성 과정을 단순하고 직관적으로 바꿔드립니다
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
                <feature.icon className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
