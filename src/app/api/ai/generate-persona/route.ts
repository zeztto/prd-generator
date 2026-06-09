import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getPersonaPrompt } from '@/lib/ai/prompts';
import type { Persona } from '@/types/prd.types';

function normalizePersona(persona: Partial<Persona>): Persona {
  return {
    id: `persona-ai-${Date.now()}`,
    name: persona.name || 'AI 생성 페르소나',
    age: persona.age || '',
    occupation: persona.occupation || '',
    painPoints: Array.isArray(persona.painPoints)
      ? persona.painPoints.map(String)
      : [],
    needs: Array.isArray(persona.needs) ? persona.needs.map(String) : [],
    scenario: persona.scenario || '',
  };
}

export async function POST(request: NextRequest) {
  try {
    const context = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getPersonaPrompt(JSON.stringify(context, null, 2)),
      { temperature: 0.8, maxTokens: 800 }
    );

    try {
      const persona = normalizePersona(JSON.parse(result));
      return NextResponse.json({ persona });
    } catch {
      return NextResponse.json(
        { error: '페르소나 결과를 해석할 수 없습니다.', raw: result },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('AI generate persona error:', error);
    return NextResponse.json(
      { error: '페르소나 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
