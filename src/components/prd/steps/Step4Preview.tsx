'use client';

import { useMemo, useRef, useState } from 'react';
import { usePRDStore } from '@/stores/prd.store';
import { generatePRDMarkdown } from '@/lib/utils/markdown';
import { Button } from '@/components/ui/button';
import { Eye, Pencil } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const TOC_ITEMS = [
  { id: 'sec-1', label: '1. 프로젝트 개요' },
  { id: 'sec-2', label: '2. 배경 및 문제 정의' },
  { id: 'sec-3', label: '3. 목표 및 성공 지표' },
  { id: 'sec-4', label: '4. 타겟 사용자' },
  { id: 'sec-5', label: '5. 핵심 기능' },
  { id: 'sec-6', label: '6. 솔루션 제안' },
  { id: 'sec-7', label: '7. 범위 및 마일스톤' },
];

export function Step4Preview() {
  const getCurrentPRDData = usePRDStore((s) => s.getCurrentPRDData);
  const [mode, setMode] = useState<'preview' | 'edit'>('preview');
  const contentRef = useRef<HTMLDivElement>(null);

  const prdData = getCurrentPRDData();
  const markdown = useMemo(() => generatePRDMarkdown(prdData), [prdData]);

  const scrollToSection = (sectionNumber: number) => {
    const element = contentRef.current;
    if (!element) return;
    const headings = element.querySelectorAll('h2');
    const target = headings[sectionNumber - 1];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 간단한 Markdown -> HTML 렌더링
  const renderMarkdown = (md: string) => {
    const lines = md.split('\n');
    const html: string[] = [];
    let inTable = false;

    for (const line of lines) {
      if (line.startsWith('# ')) {
        html.push(`<h1 class="text-2xl font-bold mb-4">${line.slice(2)}</h1>`);
      } else if (line.startsWith('## ')) {
        html.push(`<h2 class="text-xl font-semibold mt-8 mb-3 pb-2 border-b">${line.slice(3)}</h2>`);
      } else if (line.startsWith('### ')) {
        html.push(`<h3 class="text-lg font-medium mt-6 mb-2">${line.slice(4)}</h3>`);
      } else if (line.startsWith('#### ')) {
        html.push(`<h4 class="text-base font-medium mt-4 mb-1">${line.slice(5)}</h4>`);
      } else if (line.startsWith('> ')) {
        html.push(`<blockquote class="border-l-4 border-primary/30 pl-4 text-muted-foreground italic my-4">${line.slice(2)}</blockquote>`);
      } else if (line.startsWith('- ')) {
        html.push(`<li class="ml-4 list-disc text-sm leading-relaxed">${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`);
      } else if (line.startsWith('| ') && line.includes('---')) {
        // table separator
      } else if (line.startsWith('| ')) {
        if (!inTable) {
          html.push('<table class="w-full text-sm border-collapse my-4">');
          inTable = true;
        }
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        const tag = html.length <= 2 || !inTable ? 'th' : 'td';
        html.push(`<tr>${cells.map((c) => `<${tag} class="border px-3 py-1.5 text-left">${c}</${tag}>`).join('')}</tr>`);
      } else if (line.startsWith('---')) {
        if (inTable) {
          html.push('</table>');
          inTable = false;
        }
        html.push('<hr class="my-6 border-border" />');
      } else if (line.startsWith('*') && line.endsWith('*')) {
        html.push(`<p class="text-sm text-muted-foreground italic">${line.slice(1, -1)}</p>`);
      } else if (line.trim() === '') {
        if (inTable) {
          html.push('</table>');
          inTable = false;
        }
      } else {
        html.push(`<p class="text-sm leading-relaxed mb-2">${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`);
      }
    }
    if (inTable) html.push('</table>');
    return html.join('\n');
  };

  return (
    <div className="flex gap-6">
      {/* 좌측: 목차 (데스크톱) */}
      <div className="hidden md:block w-48 shrink-0">
        <div className="sticky top-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase mb-3">목차</h3>
          <nav className="space-y-1">
            {TOC_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(parseInt(item.id.split('-')[1]))}
                className="block w-full text-left text-xs text-muted-foreground hover:text-foreground py-1 px-2 rounded hover:bg-muted transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">미리보기</h2>
          <div className="flex gap-1">
            <Button
              variant={mode === 'preview' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('preview')}
            >
              <Eye className="size-3.5" data-icon="inline-start" />
              미리보기
            </Button>
            <Button
              variant={mode === 'edit' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMode('edit')}
            >
              <Pencil className="size-3.5" data-icon="inline-start" />
              Markdown
            </Button>
          </div>
        </div>

        {mode === 'preview' ? (
          <div
            ref={contentRef}
            className="prose prose-sm max-w-none rounded-lg border bg-background p-6"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
          />
        ) : (
          <Textarea
            value={markdown}
            readOnly
            className="min-h-[60vh] font-mono text-xs"
          />
        )}
      </div>
    </div>
  );
}
