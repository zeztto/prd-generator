import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  label: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Free",
    label: "무료",
    price: "₩0",
    period: "/월",
    description: "개인 PM을 위한 시작",
    features: [
      { text: "월 3개 PRD 작성", included: true },
      { text: "AI 보강 기본", included: true },
      { text: "품질 점수", included: true },
      { text: "Markdown 내보내기", included: true },
      { text: "팀 워크스페이스", included: false },
      { text: "템플릿 라이브러리", included: false },
    ],
    cta: "무료로 시작",
  },
  {
    name: "Pro",
    label: "인기",
    price: "₩19,900",
    period: "/월",
    description: "프로 PM을 위한 완전체",
    popular: true,
    features: [
      { text: "무제한 PRD 작성", included: true },
      { text: "AI 보강 고급 (DeepSeek)", included: true },
      { text: "품질 점수 + 상세 리포트", included: true },
      { text: "모든 형식 내보내기", included: true },
      { text: "템플릿 라이브러리", included: true },
      { text: "팀 워크스페이스", included: false },
    ],
    cta: "Pro 시작하기",
  },
  {
    name: "Team",
    label: "팀",
    price: "₩49,900",
    period: "/월",
    description: "팀의 PRD 품질을 통일하세요",
    features: [
      { text: "Pro의 모든 기능", included: true },
      { text: "팀 워크스페이스", included: true },
      { text: "공유 & 협업", included: true },
      { text: "팀 템플릿", included: true },
      { text: "관리자 대시보드", included: true },
      { text: "우선 지원", included: true },
    ],
    cta: "팀 시작하기",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            합리적인 가격
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            개인 PM부터 엔터프라이즈 팀까지
          </p>
        </div>

        {/* 플랜 카드 그리드 */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                plan.popular
                  ? "ring-2 ring-brand border-brand/30 hover:shadow-brand/10"
                  : "border-border/60 hover:border-brand/20 hover:shadow-brand/5"
              }`}
            >
              {/* 인기 뱃지 */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white shadow-md">
                    인기
                  </span>
                </div>
              )}

              {/* 플랜 이름 */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  {plan.name}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({plan.label})
                  </span>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* 가격 */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
                {plan.name === "Team" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    5명 포함
                  </p>
                )}
              </div>

              {/* 기능 목록 */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    {feature.included ? (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                        <X className="h-3 w-3 text-red-400" />
                      </div>
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/60"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA 버튼 */}
              {plan.popular ? (
                <Button
                  nativeButton={false}
                  size="lg"
                  className="h-11 w-full bg-brand text-base font-semibold text-brand-foreground shadow-md shadow-brand/20 hover:bg-brand/90"
                  render={<Link href="/signup" />}
                >
                  {plan.cta}
                </Button>
              ) : (
                <Button
                  nativeButton={false}
                  variant="outline"
                  size="lg"
                  className="h-11 w-full text-base"
                  render={<Link href="/signup" />}
                >
                  {plan.cta}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
