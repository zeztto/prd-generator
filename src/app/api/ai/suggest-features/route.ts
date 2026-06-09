import { NextRequest, NextResponse } from "next/server";

import { chatCompletion } from "@/lib/ai/deepseek";
import { SYSTEM_PROMPT, getFeatureSuggestPrompt } from "@/lib/ai/prompts";
import { FeaturePriority, type Feature } from "@/types/prd.types";

function normalizeFeature(feature: Partial<Feature>, index: number): Feature {
  const priorityValues = Object.values(FeaturePriority);
  const priority = priorityValues.includes(feature.priority as FeaturePriority)
    ? (feature.priority as FeaturePriority)
    : FeaturePriority.SHOULD;

  return {
    id: feature.id || `feat-ai-${Date.now()}-${index}`,
    title: feature.title || "AI 제안 기능",
    description: feature.description || "",
    priority,
    acceptanceCriteria: Array.isArray(feature.acceptanceCriteria)
      ? feature.acceptanceCriteria.map(String)
      : [],
    estimatedEffort:
      feature.estimatedEffort == null ? undefined : String(feature.estimatedEffort),
    dependencies: Array.isArray(feature.dependencies)
      ? feature.dependencies.map(String)
      : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const context = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getFeatureSuggestPrompt(context),
      { temperature: 0.7, maxTokens: 1200 },
    );

    try {
      const parsed = JSON.parse(result) as { coreFeatures?: Partial<Feature>[] };
      const features = (parsed.coreFeatures || []).map(normalizeFeature);

      return NextResponse.json({
        features: {
          coreFeatures: features,
        },
      });
    } catch {
      return NextResponse.json({ features: { coreFeatures: [] }, raw: result });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "기능 제안 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
