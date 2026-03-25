import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getReviewPrompt } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const { prdContent } = await request.json();

    if (!prdContent) {
      return NextResponse.json(
        { error: 'PRD 내용을 입력해주세요.' },
        { status: 400 }
      );
    }

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getReviewPrompt(prdContent),
      { temperature: 0.5, maxTokens: 2000 }
    );

    try {
      const review = JSON.parse(result);
      return NextResponse.json({ review });
    } catch {
      return NextResponse.json({
        review: {
          score: 0,
          items: [{ type: 'warning', title: 'AI 분석 실패', description: '결과를 파싱할 수 없습니다. 다시 시도해주세요.', section: '' }],
        },
        raw: result,
      });
    }
  } catch (error) {
    console.error('AI review error:', error);
    return NextResponse.json(
      { error: 'AI 검토 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
