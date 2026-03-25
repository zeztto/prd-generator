'use client';

import { useMemo } from 'react';
import { usePRDStore } from '@/stores/prd.store';
import { useUIStore } from '@/stores/ui.store';
import { generatePRDMarkdown } from '@/lib/utils/markdown';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, X } from 'lucide-react';

export function PreviewPanel() {
  const previewPanelOpen = useUIStore((s) => s.previewPanelOpen);
  const togglePreviewPanel = useUIStore((s) => s.togglePreviewPanel);
  const getCurrentPRDData = usePRDStore((s) => s.getCurrentPRDData);

  const prdData = getCurrentPRDData();
  const markdown = useMemo(() => generatePRDMarkdown(prdData), [prdData]);

  if (!previewPanelOpen) {
    return (
      <div className="hidden lg:flex flex-col items-center pt-4">
        <Button variant="outline" size="icon" onClick={togglePreviewPanel}>
          <Eye className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex w-80 shrink-0 flex-col border-l bg-muted/20">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <Eye className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium">실시간 미리보기</span>
        </div>
        <Button variant="ghost" size="icon-xs" onClick={togglePreviewPanel}>
          <X className="size-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 overflow-y-auto">
        <div className="p-4">
          <pre className="text-xs leading-relaxed whitespace-pre-wrap font-sans text-muted-foreground">
            {markdown}
          </pre>
        </div>
      </ScrollArea>
    </div>
  );
}
