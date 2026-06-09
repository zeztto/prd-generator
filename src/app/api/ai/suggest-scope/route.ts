import { NextRequest, NextResponse } from "next/server";

import { chatCompletion } from "@/lib/ai/deepseek";
import { SYSTEM_PROMPT, getScopeSuggestPrompt } from "@/lib/ai/prompts";
import type { Milestone, ScopeData } from "@/types/prd.types";

function normalizeMilestone(
  milestone: Partial<Milestone>,
  index: number,
): Milestone {
  return {
    id: milestone.id || `milestone-ai-${Date.now()}-${index}`,
    title: milestone.title || "AI 제안 마일스톤",
    description: milestone.description || "",
    targetDate: milestone.targetDate || "",
    deliverables: Array.isArray(milestone.deliverables)
      ? milestone.deliverables.map(String)
      : [],
  };
}

export async function POST(request: NextRequest) {
  try {
    const context = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getScopeSuggestPrompt(context),
      { temperature: 0.7, maxTokens: 1200 },
    );

    try {
      const parsed = JSON.parse(result) as Partial<ScopeData>;
      return NextResponse.json({
        scope: {
          inScope: parsed.inScope || "",
          outOfScope: parsed.outOfScope || "",
          milestones: Array.isArray(parsed.milestones)
            ? parsed.milestones.map(normalizeMilestone)
            : [],
          risks: parsed.risks,
          dependencies: parsed.dependencies,
        },
      });
    } catch {
      return NextResponse.json({
        scope: {
          inScope: "",
          outOfScope: "",
          milestones: [],
        },
        raw: result,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "범위 제안 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
