import { NextRequest, NextResponse } from 'next/server';
import { chatCompletion } from '@/lib/ai/deepseek';
import { SYSTEM_PROMPT, getKPISuggestPrompt } from '@/lib/ai/prompts';
import type { KPI } from '@/types/prd.types';

function stringifySection(value: unknown) {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2);
}

function normalizeKPI(kpi: Partial<KPI>, index: number): KPI {
  return {
    id: kpi.id || `kpi-ai-${Date.now()}-${index}`,
    name: kpi.name || 'AI 제안 KPI',
    targetValue: kpi.targetValue || '',
    currentValue:
      kpi.currentValue == null ? undefined : String(kpi.currentValue),
    unit: kpi.unit || '',
    description:
      kpi.description == null ? undefined : String(kpi.description),
  };
}

export async function POST(request: NextRequest) {
  try {
    const { background, goals } = await request.json();

    const result = await chatCompletion(
      SYSTEM_PROMPT,
      getKPISuggestPrompt(
        stringifySection(background || ''),
        stringifySection(goals || ''),
      ),
      { temperature: 0.7, maxTokens: 1000 }
    );

    // JSON 파싱 시도
    try {
      const kpis = (JSON.parse(result) as Partial<KPI>[]).map(normalizeKPI);
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
