"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand/90 to-purple-600/80 px-8 py-16 text-center md:px-16 md:py-24">
          {/* 배경 장식 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />

          {/* 좌측 장식 원 */}
          <div className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white/5" />

          {/* 우측 장식 원 */}
          <div className="pointer-events-none absolute -right-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full border border-white/5" />

          {/* 미묘한 도트 패턴 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              아직도 빈 문서와
              <br />
              씨름하고 계신가요?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              prd.ai로 30분 만에 전문가 수준의 PRD를 완성하세요.
              <br className="hidden sm:block" />
              지금 시작하면 영구 무료입니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                nativeButton={false}
                size="lg"
                className="h-13 gap-2 bg-white px-8 text-base font-semibold text-brand shadow-lg hover:bg-white/90"
                render={<Link href="/signup" />}
              >
                무료로 시작하기
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                nativeButton={false}
                size="lg"
                className="h-13 gap-2 border-white/30 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20"
                render={<a href="#how-it-works" />}
              >
                <Play className="h-4 w-4" />
                데모 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
