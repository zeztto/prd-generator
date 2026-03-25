"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-brand/8 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-36">
        <div className="flex flex-col items-center text-center">
          {/* 배지 */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-sm font-medium text-brand">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
            AI 기반 PRD 작성 도구
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl">
            질문에 답하면
            <br />
            <span className="bg-gradient-to-r from-brand via-brand/80 to-brand/60 bg-clip-text text-transparent">
              전문가 수준의 PRD가
            </span>
            <br />
            완성됩니다
          </h1>

          {/* 서브 헤드라인 */}
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg lg:text-xl">
            PRD 작성이 처음이어도 괜찮아요. AI가 안내하는 단계별 질문에
            답하기만 하면 됩니다.
          </p>

          {/* CTA 영역 */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              nativeButton={false}
              size="lg"
              className="h-12 gap-2 bg-brand px-8 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-all hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30"
              render={<Link href="/signup" />}
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base"
              render={<a href="#how-it-works" />}
            >
              사용 방법 보기
            </Button>
          </div>

          {/* 앱 목업 */}
          <div className="relative mt-16 w-full max-w-4xl md:mt-20">
            {/* 배경 글로우 */}
            <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-brand/10 via-brand/5 to-transparent blur-2xl" />

            <div className="rounded-2xl border border-border/60 bg-card/80 p-2 shadow-2xl backdrop-blur-sm md:rounded-3xl md:p-3">
              {/* 브라우저 크롬 */}
              <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                </div>
                <div className="ml-4 flex-1 rounded-md bg-muted/60 px-3 py-1.5">
                  <span className="text-xs text-muted-foreground">
                    prd.ai/dashboard
                  </span>
                </div>
              </div>

              {/* 앱 콘텐츠 목업 */}
              <div className="flex min-h-[280px] gap-4 p-4 md:min-h-[360px] md:p-6">
                {/* 사이드바 */}
                <div className="hidden w-48 flex-col gap-3 md:flex">
                  <div className="h-4 w-20 rounded bg-brand/20" />
                  <div className="mt-2 space-y-2">
                    <div className="h-8 w-full rounded-lg bg-brand/10" />
                    <div className="h-8 w-full rounded-lg bg-muted/60" />
                    <div className="h-8 w-full rounded-lg bg-muted/60" />
                  </div>
                  <div className="mt-4 h-4 w-16 rounded bg-muted/40" />
                  <div className="space-y-2">
                    <div className="h-8 w-full rounded-lg bg-muted/60" />
                    <div className="h-8 w-full rounded-lg bg-muted/60" />
                  </div>
                </div>

                {/* 메인 콘텐츠 */}
                <div className="flex flex-1 flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-32 rounded bg-foreground/15" />
                    <div className="h-8 w-24 rounded-lg bg-brand/20" />
                  </div>
                  <div className="flex-1 space-y-3 rounded-xl border border-border/40 bg-muted/30 p-4">
                    <div className="h-4 w-3/4 rounded bg-foreground/10" />
                    <div className="h-4 w-full rounded bg-foreground/8" />
                    <div className="h-4 w-5/6 rounded bg-foreground/8" />
                    <div className="mt-4 h-4 w-2/3 rounded bg-foreground/10" />
                    <div className="h-4 w-full rounded bg-foreground/8" />
                    <div className="h-4 w-4/5 rounded bg-foreground/8" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 w-28 rounded-lg bg-brand/25" />
                    <div className="h-9 w-20 rounded-lg bg-muted/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
