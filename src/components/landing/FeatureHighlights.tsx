"use client";

import {
  ClipboardList,
  Sparkles,
  BarChart3,
  GraduationCap,
  LayoutTemplate,
  Download,
} from "lucide-react";

const features = [
  {
    icon: ClipboardList,
    title: "단계별 가이드",
    description:
      "빈 페이지 공포증? 걱정 마세요. 6단계 질문에 차근차근 답하기만 하면 PRD가 완성됩니다.",
  },
  {
    icon: Sparkles,
    title: "AI 자동 보강",
    description:
      "키워드만 입력하면 전문적인 문장으로 자동 확장합니다. 누구나 시니어 PM처럼 작성할 수 있어요.",
  },
  {
    icon: BarChart3,
    title: "실시간 품질 점수",
    description:
      "모호한 표현, 누락된 섹션을 실시간으로 감지하고 구체적인 개선 방법을 제안합니다.",
  },
  {
    icon: GraduationCap,
    title: "배우면서 작성",
    description:
      "각 섹션마다 작성 가이드와 좋은 예/나쁜 예를 제공해 PRD 작성 역량이 자연스럽게 성장합니다.",
  },
  {
    icon: LayoutTemplate,
    title: "다양한 템플릿",
    description:
      "신규 제품, 기능 개선, API 설계 등 프로젝트 유형별로 최적화된 템플릿을 제공합니다.",
  },
  {
    icon: Download,
    title: "원클릭 내보내기",
    description:
      "Markdown, PDF, Notion 등 원하는 형식으로 내보내기. 팀 협업 도구와 바로 연동하세요.",
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
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            PRD 작성의 모든 것을
            <br className="hidden sm:block" />
            한 곳에서
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground md:text-lg">
            복잡한 PRD 작성 과정을 단순하고 직관적으로 바꿔드립니다
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/5"
            >
              {/* 그라데이션 보더 호버 효과 */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-brand/20 via-transparent to-brand/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                  <feature.icon className="h-6 w-6 text-brand" />
                </div>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
