import { Star } from "lucide-react";

const testimonials = [
  {
    name: "김서연",
    role: "PM",
    company: "테크플로우",
    text: "PRD 작성에 항상 2-3일이 걸렸는데, prd.ai로 30분 만에 완성했어요. AI가 제안하는 KPI와 성공 지표가 특히 유용했습니다.",
  },
  {
    name: "이준혁",
    role: "시니어 PO",
    company: "데이터펄스",
    text: "주니어 PM들에게 PRD 작성법을 가르치기 어려웠는데, 가이드 기능이 훌륭한 교육 도구가 되어줬어요.",
  },
  {
    name: "박지은",
    role: "CPO",
    company: "서비스허브",
    text: "팀 전체가 일관된 품질의 PRD를 작성할 수 있게 되었어요. 품질 점수 기능이 스탠다드를 유지해줍니다.",
  },
  {
    name: "최민수",
    role: "PO",
    company: "스타트업킷",
    text: "투자자 미팅 전날 밤에 급하게 PRD를 만들어야 했는데, 정말 30분 만에 전문가 수준의 문서가 나왔어요.",
  },
  {
    name: "정하윤",
    role: "기획자",
    company: "클라우드넷",
    text: "기획서 작성이 처음인 저도 AI 가이드를 따라가니 자연스럽게 작성할 수 있었어요. 좋은 예시가 특히 도움이 됐습니다.",
  },
  {
    name: "한도윤",
    role: "PM 리드",
    company: "마켓싱크",
    text: "Notion과 Confluence에 바로 붙여넣기 할 수 있어서 워크플로우가 매끄러웠어요. 내보내기가 잘 되어있습니다.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {/* 섹션 헤더 */}
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand">
            Testimonials
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            PM들의 실제 후기
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            이미 수천 명의 PM이 prd.ai로 더 나은 PRD를 작성하고 있습니다
          </p>
        </div>

        {/* 후기 카드 그리드 */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5"
            >
              <StarRating />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/40 pt-5">
                {/* 아바타 */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
