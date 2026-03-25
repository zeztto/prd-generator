"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* 텍스트 영역 */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              PRD 작성이 처음이어도
              <br />
              <span className="text-primary">괜찮아요</span>
            </h1>

            <p className="mt-4 max-w-lg text-base text-muted-foreground md:mt-6 md:text-lg">
              질문에 답하다 보면, 전문가 수준의 PRD가 완성됩니다
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 md:mt-10 lg:items-start">
              <Button
                nativeButton={false}
                size="lg"
                className="gap-2 text-base"
                render={<Link href="/login" />}
              >
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                가입 없이 바로 체험해보세요
              </p>
            </div>
          </div>

          {/* 목업 플레이스홀더 */}
          <div className="w-full max-w-md flex-1 lg:max-w-lg">
            <div className="aspect-[4/3] w-full rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/20 p-6 shadow-lg ring-1 ring-border/50">
              {/* 목업 내부 꾸미기 */}
              <div className="flex h-full flex-col gap-3 rounded-lg bg-background/70 p-4 shadow-inner">
                <div className="h-3 w-24 rounded bg-primary/20" />
                <div className="h-2 w-full rounded bg-muted" />
                <div className="h-2 w-5/6 rounded bg-muted" />
                <div className="h-2 w-4/6 rounded bg-muted" />
                <div className="mt-auto flex gap-2">
                  <div className="h-6 w-16 rounded bg-primary/30" />
                  <div className="h-6 w-16 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
