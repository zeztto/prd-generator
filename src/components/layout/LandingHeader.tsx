"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "기능 소개", href: "#features" },
    { label: "사용 방법", href: "#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/" className="text-xl tracking-tight">
          <span className="font-bold">prd</span>
          <span className="font-semibold text-brand">.ai</span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-3">
            <Button
              nativeButton={false}
              variant="ghost"
              size="sm"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              render={<Link href="/login" />}
            >
              로그인
            </Button>
            <Button
              nativeButton={false}
              size="sm"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              render={<Link href="/signup" />}
            >
              무료로 시작
            </Button>
          </div>
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* 모바일 메뉴 패널 */}
      {mobileMenuOpen && (
        <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button
                nativeButton={false}
                variant="outline"
                className="w-full"
                size="sm"
                render={<Link href="/login" />}
              >
                로그인
              </Button>
              <Button
                nativeButton={false}
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                size="sm"
                render={<Link href="/signup" />}
              >
                무료로 시작
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
