"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand/90 to-brand/70 px-8 py-16 text-center md:px-16 md:py-20">
          {/* 배경 장식 */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              지금 바로 첫 PRD를 작성해보세요
            </h2>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              30분이면 충분해요. 완전 무료입니다.
            </p>
            <Button
              nativeButton={false}
              size="lg"
              className="mt-8 h-12 gap-2 bg-white px-8 text-base font-semibold text-brand shadow-lg hover:bg-white/90"
              render={<Link href="/signup" />}
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
