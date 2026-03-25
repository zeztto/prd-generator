import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getPersonaPrompt } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const { context } = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getPersonaPrompt(context || ''),
      { temperature: 0.8, maxTokens: 800 }
    );

    try {
      const persona = JSON.parse(result);
      return NextResponse.json({ persona });
    } catch {
      return NextResponse.json({ persona: null, raw: result });
    }
  } catch (error) {
    console.error('AI generate persona error:', error);
    return NextResponse.json(
      { error: '페르소나 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
