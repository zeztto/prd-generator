import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>&copy; 2026 PRD 생성기. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link
            href="#"
            className="transition-colors hover:text-foreground"
          >
            이용약관
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground"
          >
            개인정보처리방침
          </Link>
        </nav>
      </div>
    </footer>
  );
}
