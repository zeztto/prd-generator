"use client";

import { BookTemplate, Sparkles, FileText, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const comingSoonTemplates = [
  {
    icon: FileText,
    title: "신규 제품 PRD",
    description: "새로운 제품이나 서비스를 위한 종합 PRD 템플릿",
    tag: "인기",
  },
  {
    icon: Zap,
    title: "기능 개선 PRD",
    description: "기존 제품의 기능 추가/개선을 위한 간결한 템플릿",
    tag: "추천",
  },
  {
    icon: Sparkles,
    title: "Amazon PR/FAQ",
    description: "아마존 스타일의 역방향 사고 템플릿",
    tag: "고급",
  },
  {
    icon: BookTemplate,
    title: "1-Page PRD",
    description: "빠른 정렬을 위한 한 페이지 PRD 템플릿",
    tag: "빠른시작",
  },
];

export default function TemplatesPage() {
  return (
    <div className="px-4 py-8 md:px-8 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">템플릿</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          상황에 맞는 PRD 템플릿을 선택하여 빠르게 시작하세요
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {comingSoonTemplates.map((template) => (
          <div
            key={template.title}
            className="group relative flex flex-col rounded-xl border bg-card p-5 transition-all hover:border-brand/30 hover:shadow-md"
          >
            <div className="absolute right-4 top-4">
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                {template.tag}
              </span>
            </div>
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
              <template.icon className="h-5 w-5 text-brand" />
            </div>
            <h3 className="mb-1 font-semibold tracking-tight">{template.title}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{template.description}</p>
            <div className="mt-auto">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/60">
                곧 출시 예정
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand/10">
          <BookTemplate className="h-7 w-7 text-brand" />
        </div>
        <h2 className="mb-2 text-lg font-semibold tracking-tight">
          더 많은 템플릿이 준비 중이에요
        </h2>
        <p className="mb-6 max-w-sm text-sm text-muted-foreground">
          다양한 상황에 맞는 전문 PRD 템플릿을 곧 만나보실 수 있습니다.
          <br />
          지금은 빈 문서로 시작해보세요.
        </p>
        <Button
          nativeButton={false}
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          render={<Link href="/prd/new" />}
        >
          새 PRD 작성하기
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
