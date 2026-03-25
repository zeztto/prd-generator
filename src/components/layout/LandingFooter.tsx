import Link from "next/link";

export default function LandingFooter() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-base tracking-tight">
            <span className="font-bold text-foreground">prd</span>
            <span className="font-semibold text-brand">.ai</span>
          </Link>
          <span className="text-muted-foreground/60">|</span>
          <p>&copy; 2026 prd.ai</p>
        </div>
        <nav className="flex gap-6">
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
