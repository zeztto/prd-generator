import Link from "next/link";

const productLinks = [
  { label: "기능 소개", href: "#features" },
  { label: "가격", href: "#pricing" },
  { label: "템플릿", href: "/templates" },
];

const supportLinks = [
  { label: "도움말", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "문의하기", href: "#" },
];

const legalLinks = [
  { label: "이용약관", href: "#" },
  { label: "개인정보처리방침", href: "#" },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* 4열 그리드 (모바일 2열) */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* 열 1: 로고 + 설명 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block text-lg tracking-tight">
              <span className="font-bold text-foreground">prd</span>
              <span className="font-semibold text-brand">.ai</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              AI 기반 PRD 작성 도구
            </p>
          </div>

          {/* 열 2: 제품 */}
          <div>
            <h4 className="text-sm font-semibold">제품</h4>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 열 3: 지원 */}
          <div>
            <h4 className="text-sm font-semibold">지원</h4>
            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 열 4: 법적 고지 */}
          <div>
            <h4 className="text-sm font-semibold">법적 고지</h4>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 하단 구분선 + 카피라이트 */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; 2026 prd.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
