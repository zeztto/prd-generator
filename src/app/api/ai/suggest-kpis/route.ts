import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getKPISuggestPrompt } from '@/lib/ai/prompts';

export async function POST(request: NextRequest) {
  try {
    const { background, goals } = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getKPISuggestPrompt(background || '', goals || ''),
      { temperature: 0.7, maxTokens: 1000 }
    );

    // JSON 파싱 시도
    try {
      const kpis = JSON.parse(result);
      return NextResponse.json({ kpis });
    } catch {
      return NextResponse.json({ kpis: [], raw: result });
    }
  } catch (error) {
    console.error('AI suggest KPIs error:', error);
    return NextResponse.json(
      { error: 'KPI 제안 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
