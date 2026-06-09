import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getReviewPrompt } from '@/lib/ai/prompts';
import { generatePRDMarkdown } from '@/lib/utils/markdown';
import type { AIReviewResult, ReviewItem } from '@/types/prd.types';

function normalizeReviewItem(
  item: Partial<ReviewItem>,
  index: number,
): ReviewItem {
  return {
    id: item.id || `review-${Date.now()}-${index}`,
    section: item.section || '',
    type:
      item.type === 'error' || item.type === 'warning' || item.type === 'suggestion'
        ? item.type
        : 'suggestion',
    message: item.message || 'AI가 구체적인 피드백을 반환하지 않았습니다.',
    originalText:
      item.originalText == null ? undefined : String(item.originalText),
    suggestedText:
      item.suggestedText == null ? undefined : String(item.suggestedText),
  };
}

function fallbackReview(raw?: string): AIReviewResult {
  return {
    summary: 'AI 응답을 해석하지 못해 기본 리뷰 결과를 반환합니다.',
    reviewedAt: new Date().toISOString(),
    qualityScore: {
      overall: 0,
      completeness: 0,
      clarity: 0,
      consistency: 0,
      specificity: 0,
    },
    items: [
      {
        id: `review-fallback-${Date.now()}`,
        section: '',
        type: 'warning',
        message: 'AI 분석 결과를 다시 시도해주세요.',
        suggestedText: raw,
      },
    ],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prd } = await request.json();

    if (!prd) {
      return NextResponse.json(
        { error: 'PRD 내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getReviewPrompt(generatePRDMarkdown(prd)),
      { temperature: 0.5, maxTokens: 2000 }
    );

    try {
      const parsed = JSON.parse(result) as Partial<AIReviewResult>;
      const review: AIReviewResult = {
        summary: parsed.summary || 'AI 리뷰가 완료되었습니다.',
        reviewedAt: new Date().toISOString(),
        qualityScore: {
          overall: Number(parsed.qualityScore?.overall ?? 0),
          completeness: Number(parsed.qualityScore?.completeness ?? 0),
          clarity: Number(parsed.qualityScore?.clarity ?? 0),
          consistency: Number(parsed.qualityScore?.consistency ?? 0),
          specificity: Number(parsed.qualityScore?.specificity ?? 0),
        },
        items: Array.isArray(parsed.items)
          ? parsed.items.map(normalizeReviewItem)
          : [],
      };
      return NextResponse.json({ review });
    } catch {
      return NextResponse.json({ review: fallbackReview(result), raw: result });
    }
  } catch (error) {
    console.error('AI review error:', error);
    return NextResponse.json(
      { error: 'AI 검토 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
