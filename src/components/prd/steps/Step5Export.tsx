'use client';

import { useState } from 'react';
import { usePRDStore } from '@/stores/prd.store';
import { generatePRDMarkdown } from '@/lib/utils/markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  FileDown,
  ClipboardCopy,
  FileText,
  Link2,
  Check,
  ArrowLeft,
  Plus,
} from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

export function Step5Export() {
  const getCurrentPRDData = usePRDStore((s) => s.getCurrentPRDData);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const prdData = getCurrentPRDData();
  const markdown = generatePRDMarkdown(prdData);

  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${prdData.title || 'PRD'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setCopiedState('md');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedState('clipboard');
      setTimeout(() => setCopiedState(null), 2000);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedState('clipboard');
      setTimeout(() => setCopiedState(null), 2000);
    }
  };

  const handleShareLink = () => {
    const mockUrl = `https://prd-gen.app/share/${Date.now().toString(36)}`;
    setShareUrl(mockUrl);
    navigator.clipboard.writeText(mockUrl).catch(() => {});
    setCopiedState('share');
    setTimeout(() => setCopiedState(null), 2000);
  };

  const exportOptions = [
    {
      id: 'md',
      icon: FileDown,
      title: 'Markdown 다운로드',
      description: '.md 파일로 다운로드합니다.',
      action: handleDownloadMd,
      available: true,
    },
    {
      id: 'clipboard',
      icon: ClipboardCopy,
      title: '클립보드 복사',
      description: '전체 PRD를 클립보드에 복사합니다.',
      action: handleCopyClipboard,
      available: true,
    },
    {
      id: 'pdf',
      icon: FileText,
      title: 'PDF 다운로드',
      description: 'PDF 형식으로 내보냅니다.',
      action: () => {},
      available: false,
    },
    {
      id: 'share',
      icon: Link2,
      title: '공유 링크 생성',
      description: '공유 가능한 링크를 생성합니다.',
      action: handleShareLink,
      available: true,
    },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-8 py-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">내보내기</h2>
        <p className="text-sm text-muted-foreground">
          완성된 PRD를 다양한 형식으로 내보낼 수 있습니다.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {exportOptions.map((option) => {
          const Icon = option.icon;
          const isDone = copiedState === option.id;

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                !option.available ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <button
                onClick={option.action}
                disabled={!option.available}
                className="w-full text-left"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm">
                    {isDone ? (
                      <Check className="size-5 text-green-500" />
                    ) : (
                      <Icon className="size-5 text-muted-foreground" />
                    )}
                    {option.title}
                    {!option.available && (
                      <span className="text-xs text-muted-foreground ml-auto">준비 중</span>
                    )}
                  </CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
              </button>
            </Card>
          );
        })}
      </div>

      {shareUrl && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-xs text-muted-foreground mb-1">공유 링크가 생성되었습니다 (클립보드에 복사됨):</p>
          <p className="text-sm font-mono break-all">{shareUrl}</p>
        </div>
      )}

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="outline" size="lg" className="flex-1" render={<Link href={ROUTES.DASHBOARD} />}>
          <ArrowLeft className="size-4" data-icon="inline-start" />
          대시보드로 돌아가기
        </Button>
        <Button size="lg" className="flex-1" render={<Link href={ROUTES.PRD_NEW} />}>
          <Plus className="size-4" data-icon="inline-start" />
          새 PRD 작성
        </Button>
      </div>
    </div>
  );
}
