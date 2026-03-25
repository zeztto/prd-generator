'use client';

import Link from 'next/link';
import { FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/routes';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand/10">
        <FileText className="size-10 text-brand" />
      </div>
      <h3 className="mb-2 text-xl font-semibold tracking-tight">
        아직 작성한 PRD가 없어요
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
        첫 PRD를 작성하고 전문가 수준의 문서를 만들어보세요
      </p>
      <Button
        nativeButton={false}
        render={<Link href={ROUTES.PRD_NEW} />}
        size="lg"
        className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
      >
        <Plus className="size-4" />
        첫 PRD 작성하기
      </Button>
    </div>
  );
}
