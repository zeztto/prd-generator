'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Check, X, Pencil } from 'lucide-react';

interface AIEnhanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalText: string;
  enhancedText: string;
  streamingText: string;
  isStreaming: boolean;
  onAccept: (text: string) => void;
  onReject: () => void;
}

export function AIEnhanceModal({
  open,
  onOpenChange,
  originalText,
  enhancedText,
  streamingText,
  isStreaming,
  onAccept,
  onReject,
}: AIEnhanceModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');

  const displayText = enhancedText || streamingText;

  const handleEditAccept = () => {
    onAccept(editedText);
    setIsEditing(false);
  };

  const handleAccept = () => {
    onAccept(displayText);
  };

  const handleStartEdit = () => {
    setEditedText(displayText);
    setIsEditing(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-amber-500" />
            AI 보강 결과
          </DialogTitle>
          <DialogDescription>
            AI가 내용을 분석하고 보강했습니다. 결과를 확인하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {/* 원본 */}
          <div>
            <span className="text-xs font-medium text-muted-foreground mb-1 block">원본</span>
            <div className="rounded-md bg-muted/50 p-3 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {originalText || '(내용 없음)'}
            </div>
          </div>

          {/* AI 보강 결과 */}
          <div>
            <span className="text-xs font-medium text-primary mb-1 block">AI 보강 결과</span>
            {isEditing ? (
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-32"
              />
            ) : (
              <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm leading-relaxed whitespace-pre-wrap">
                {displayText}
                {isStreaming && (
                  <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-0.5" />
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                취소
              </Button>
              <Button onClick={handleEditAccept}>
                <Check className="size-4" data-icon="inline-start" />
                적용
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={onReject} disabled={isStreaming}>
                <X className="size-4" data-icon="inline-start" />
                원본 유지
              </Button>
              <Button variant="secondary" onClick={handleStartEdit} disabled={isStreaming}>
                <Pencil className="size-4" data-icon="inline-start" />
                수정 후 수락
              </Button>
              <Button onClick={handleAccept} disabled={isStreaming}>
                <Check className="size-4" data-icon="inline-start" />
                수락
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
