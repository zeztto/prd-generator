import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getEnhancePrompt } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const { section, content } = await request.json();

    if (!section || !content) {
      return NextResponse.json(
        { error: '섹션과 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getEnhancePrompt(section, content),
      { temperature: 0.7, maxTokens: 1000 }
    );

    return NextResponse.json({ result });
  } catch (error) {
    console.error('AI enhance error:', error);
    return NextResponse.json(
      { error: 'AI 보강 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
