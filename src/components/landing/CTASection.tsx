"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
      {/* 배경 장식 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          지금 바로 첫 PRD를 작성해보세요
        </h2>
        <p className="mt-3 text-base text-primary-foreground/80 md:text-lg">
          30분이면 충분해요. 완전 무료입니다.
        </p>
        <Button
          nativeButton={false}
          size="lg"
          variant="secondary"
          className="mt-8 gap-2 text-base"
          render={<Link href="/login" />}
        >
          무료로 시작하기
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
