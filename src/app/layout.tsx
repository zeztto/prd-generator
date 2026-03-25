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
  title: "prd.ai — 질문에 답하면 PRD가 완성됩니다",
  description:
    "PRD 작성이 처음이어도 괜찮아요. AI가 안내하는 질문에 답하면 전문가 수준의 PRD가 완성됩니다. prd.ai",
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
