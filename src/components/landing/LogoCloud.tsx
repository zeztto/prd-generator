const logos = [
  "TechFlow",
  "클라우드넷",
  "DataPulse",
  "DesignLab",
  "서비스허브",
  "StartupKit",
  "CodeCraft",
  "MarketSync",
];

export default function LogoCloud() {
  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-muted/20 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-8 text-center text-sm font-medium text-muted-foreground">
          이미 다양한 팀에서 사용 중입니다
        </p>

        <div className="relative">
          {/* 좌측 페이드 */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
          {/* 우측 페이드 */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

          <div className="flex items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
            {logos.map((name) => (
              <span
                key={name}
                className="shrink-0 select-none text-xl font-bold text-muted-foreground/30 transition-colors hover:text-muted-foreground/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
