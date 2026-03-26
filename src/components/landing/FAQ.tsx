"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "PRD가 뭔가요?",
    answer:
      "PRD(Product Requirements Document)는 제품이 무엇을, 왜 만들어야 하는지를 정의하는 문서입니다. 개발팀, 디자인팀, 경영진 등 모든 이해관계자가 같은 방향을 보도록 돕는 핵심 문서입니다.",
  },
  {
    question: "PRD를 작성해본 적이 없어도 사용할 수 있나요?",
    answer:
      "네! prd.ai는 PRD 작성이 처음인 분들을 위해 설계되었습니다. 각 섹션마다 상세한 가이드, 좋은 예시/나쁜 예시를 제공하며, AI가 단계별로 안내합니다.",
  },
  {
    question: "AI가 작성한 내용을 수정할 수 있나요?",
    answer:
      "물론입니다. AI는 초안을 제안할 뿐이며, 모든 내용을 자유롭게 수정, 보강, 삭제할 수 있습니다. AI 보강 결과도 '수락', '수정 후 수락', '원본 유지' 중 선택할 수 있습니다.",
  },
  {
    question: "어떤 AI 모델을 사용하나요?",
    answer:
      "DeepSeek의 최신 모델을 사용합니다. 한국어 PRD 작성에 최적화된 프롬프트와 함께 높은 품질의 결과를 제공합니다.",
  },
  {
    question: "무료 플랜으로 충분한가요?",
    answer:
      "개인 PM이 기본적인 PRD를 작성하기에 충분합니다. 월 3개 PRD, AI 보강, 품질 점수, Markdown 내보내기를 무료로 제공합니다. 더 많은 기능이 필요하면 Pro 플랜을 추천합니다.",
  },
  {
    question: "팀에서 함께 사용할 수 있나요?",
    answer:
      "Team 플랜에서 팀 워크스페이스, 공유 & 협업, 팀 템플릿, 관리자 대시보드를 제공합니다. 팀원 모두가 일관된 품질의 PRD를 작성할 수 있습니다.",
  },
  {
    question: "내보내기 형식은 뭐가 있나요?",
    answer:
      "현재 Markdown, 클립보드 복사를 지원하며, PDF와 Notion 직접 연동은 곧 추가될 예정입니다.",
  },
  {
    question: "데이터는 안전한가요?",
    answer:
      "모든 데이터는 암호화되어 저장되며, 사용자의 PRD 내용은 AI 학습에 사용되지 않습니다. 개인정보보호법을 준수합니다.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            자주 묻는 질문
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            궁금한 점이 있으신가요? 아래에서 답을 찾아보세요
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div className="mt-14">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border/60">
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand"
              >
                <span className="text-base font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
