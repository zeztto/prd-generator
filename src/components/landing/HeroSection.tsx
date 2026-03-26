"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Check, Zap, FileText, BarChart3 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 그리드 패턴 */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* 배경 그라데이션 글로우 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[800px] w-[1000px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-brand/6 blur-[100px]" />
        <div className="absolute -left-20 top-1/2 h-[400px] w-[400px] rounded-full bg-brand/4 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 md:pb-24 md:pt-28 lg:pb-32 lg:pt-36">
        <div className="flex flex-col items-center text-center">
          {/* 배지 */}
          <div className="group mb-8 inline-flex cursor-default items-center gap-2.5 rounded-full border border-brand/20 bg-brand/5 px-5 py-2 text-sm font-medium text-brand backdrop-blur-sm transition-colors hover:border-brand/30 hover:bg-brand/8">
            <Sparkles className="h-4 w-4" />
            <span>10,000+ PM이 선택한 PRD 작성 도구</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>

          {/* 메인 헤드라인 */}
          <h1 className="max-w-5xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            PRD 작성,
            <br />
            <span className="bg-gradient-to-r from-brand via-purple-500 to-brand/70 bg-clip-text text-transparent">
              이제 AI에게
            </span>{" "}
            맡기세요
          </h1>

          {/* 서브 헤드라인 */}
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            프로젝트 정보만 입력하세요.
            <br className="hidden sm:block" />
            AI가 전문가 수준의 PRD를 자동으로 완성합니다.
          </p>

          {/* CTA 영역 */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button
              nativeButton={false}
              size="lg"
              className="h-13 gap-2 bg-brand px-8 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-all hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30"
              render={<Link href="/signup" />}
            >
              무료로 시작하기
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-13 gap-2 px-8 text-base"
              render={<a href="#how-it-works" />}
            >
              <Play className="h-4 w-4" />
              데모 보기
            </Button>
          </div>

          {/* 앱 목업 */}
          <div className="relative mt-16 w-full max-w-5xl md:mt-20">
            {/* 배경 글로우 */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-b from-brand/15 via-brand/5 to-transparent blur-3xl" />

            <div className="rounded-2xl border border-border/60 bg-card/90 p-1.5 shadow-2xl shadow-brand/5 backdrop-blur-sm md:rounded-3xl md:p-2">
              {/* 브라우저 크롬 */}
              <div className="flex items-center gap-2 rounded-t-xl border-b border-border/40 bg-muted/30 px-4 py-3 md:rounded-t-2xl">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                  <div className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="ml-4 flex flex-1 items-center gap-2 rounded-lg bg-background/80 px-4 py-1.5">
                  <div className="h-3 w-3 rounded-full bg-green-500/40" />
                  <span className="text-xs text-muted-foreground">
                    prd.ai/dashboard/prd/new
                  </span>
                </div>
              </div>

              {/* 앱 콘텐츠 목업 */}
              <div className="flex min-h-[300px] md:min-h-[400px]">
                {/* 좌측 사이드바 */}
                <div className="hidden w-52 flex-col border-r border-border/40 bg-muted/20 p-4 md:flex">
                  {/* 로고 */}
                  <div className="mb-5 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand">
                      <FileText className="h-4 w-4 text-brand-foreground" />
                    </div>
                    <span className="text-sm font-bold">prd.ai</span>
                  </div>

                  {/* 메뉴 */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 rounded-lg bg-brand/10 px-3 py-2 text-xs font-medium text-brand">
                      <div className="h-3.5 w-3.5 rounded bg-brand/30" />
                      내 PRD
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      <div className="h-3.5 w-3.5 rounded bg-muted-foreground/20" />
                      템플릿
                    </div>
                    <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs text-muted-foreground">
                      <div className="h-3.5 w-3.5 rounded bg-muted-foreground/20" />
                      팀 프로젝트
                    </div>
                  </div>

                  <div className="mt-6 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                    최근 문서
                  </div>
                  <div className="space-y-1">
                    <div className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                      결제 시스템 리뉴얼
                    </div>
                    <div className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                      사용자 온보딩 개선
                    </div>
                    <div className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                      모바일 앱 v2.0
                    </div>
                  </div>
                </div>

                {/* 메인 콘텐츠 영역 */}
                <div className="flex flex-1 flex-col p-4 md:p-6">
                  {/* 상단 타이틀 바 */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold">결제 시스템 리뉴얼 PRD</h3>
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[10px] font-medium text-green-600">
                        작성 중
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg bg-brand/10 px-3 py-1.5 text-[11px] font-medium text-brand">
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          AI 보강
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRD 편집 화면 */}
                  <div className="flex-1 space-y-4 rounded-xl border border-border/40 bg-background/60 p-5">
                    {/* 섹션 1 */}
                    <div>
                      <div className="mb-2 text-xs font-semibold text-foreground/80">
                        1. 프로젝트 개요
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-3 w-full rounded bg-foreground/8" />
                        <div className="h-3 w-4/5 rounded bg-foreground/8" />
                        <div className="h-3 w-11/12 rounded bg-foreground/6" />
                      </div>
                    </div>

                    {/* 섹션 2 */}
                    <div>
                      <div className="mb-2 text-xs font-semibold text-foreground/80">
                        2. 목표 및 성공 지표
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-3 w-full rounded bg-foreground/8" />
                        <div className="h-3 w-3/4 rounded bg-foreground/8" />
                      </div>
                    </div>

                    {/* AI 보강 버튼 영역 */}
                    <div className="flex items-center gap-2 rounded-lg border border-brand/20 bg-brand/5 p-3">
                      <Sparkles className="h-3.5 w-3.5 text-brand" />
                      <span className="text-[11px] text-brand">
                        이 섹션을 AI로 보강하시겠습니까?
                      </span>
                      <div className="ml-auto rounded-md bg-brand px-2.5 py-1 text-[10px] font-medium text-brand-foreground">
                        보강하기
                      </div>
                    </div>
                  </div>
                </div>

                {/* 우측 품질 점수 패널 */}
                <div className="hidden w-56 flex-col border-l border-border/40 bg-muted/10 p-4 lg:flex">
                  <div className="mb-4 text-xs font-semibold">품질 점수</div>

                  {/* 원형 차트 */}
                  <div className="mb-5 flex justify-center">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-muted/40"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          strokeDasharray={`${85 * 2.64} ${100 * 2.64}`}
                          strokeLinecap="round"
                          className="text-brand"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-bold">85</span>
                        <span className="text-[9px] text-muted-foreground">/ 100</span>
                      </div>
                    </div>
                  </div>

                  {/* 체크리스트 */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/15">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-muted-foreground">프로젝트 개요</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/15">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-muted-foreground">목표 정의</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-green-500/15">
                        <Check className="h-2.5 w-2.5 text-green-600" />
                      </div>
                      <span className="text-muted-foreground">사용자 스토리</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500/15">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                      </div>
                      <span className="text-muted-foreground">기술 요구사항</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px]">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full bg-muted/40">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      </div>
                      <span className="text-muted-foreground/60">타임라인</span>
                    </div>
                  </div>

                  {/* 개선 제안 */}
                  <div className="mt-4 rounded-lg border border-brand/15 bg-brand/5 p-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-medium text-brand">
                      <BarChart3 className="h-3 w-3" />
                      개선 제안 2건
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 목업 하단 장식 */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground/60">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5" />
                30초 만에 시작
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/30 sm:block" />
              <span>신용카드 불필요</span>
              <span className="hidden h-1 w-1 rounded-full bg-muted-foreground/30 sm:block" />
              <span>영구 무료</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
