import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* 배경 패턴 & 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-[500px] w-[500px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-brand/5 blur-3xl" />
        {/* 도트 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* 로고 */}
      <Link href="/" className="mb-8 text-2xl tracking-tight">
        <span className="font-bold">prd</span>
        <span className="font-semibold text-brand">.ai</span>
      </Link>

      {/* 카드 */}
      <div className="w-full max-w-sm rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-sm">
        {children}
      </div>
    </div>
  );
}
