import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRD 생성기 — 질문에 답하면 PRD가 완성됩니다",
  description:
    "단계별 질문과 AI 보강으로 누구나 전문가 수준의 PRD를 작성할 수 있습니다. 무료로 시작하세요.",
  keywords: ["PRD", "제품 요구사항 문서", "AI", "프로덕트 매니저", "기획서"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
