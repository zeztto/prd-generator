import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    emoji: "\u{1F4DD}",
    title: "단계별 가이드",
    description: "빈 페이지가 아닌 질문에 답하는 방식으로 작성해요",
  },
  {
    emoji: "\u{1F916}",
    title: "AI 보강",
    description: "키워드만 입력하면 AI가 전문적인 문장으로 확장해요",
  },
  {
    emoji: "\u{1F4CA}",
    title: "품질 자동 평가",
    description: "모호한 표현, 누락 항목을 자동으로 감지해요",
  },
  {
    emoji: "\u{1F4DA}",
    title: "배우면서 작성",
    description: "각 섹션별 가이드와 좋은 예시를 제공해요",
  },
];

export default function FeatureHighlights() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-2xl font-bold tracking-tight md:text-3xl">
          왜 PRD 생성기인가요?
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="text-center transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="mx-auto mb-2 text-4xl" aria-hidden="true">
                  {feature.emoji}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="mt-1.5 text-sm">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
