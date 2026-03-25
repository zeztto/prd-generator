'use client';

import { useEffect } from 'react';

import { usePRDStore } from '@/stores/prd.store';

interface UseKeyboardShortcutOptions {
  enabled?: boolean;
}

export function useKeyboardShortcut(options: UseKeyboardShortcutOptions = {}) {
  const { enabled = true } = options;

  const goToNextStep = usePRDStore((s) => s.goToNextStep);
  const goToPrevStep = usePRDStore((s) => s.goToPrevStep);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isModifier = event.metaKey || event.ctrlKey;

      if (!isModifier) return;

      // 입력 필드에서는 단축키 무시
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if (event.key === 'Enter' && event.shiftKey) {
        // Ctrl/Cmd + Shift + Enter: 이전 스텝
        event.preventDefault();
        goToPrevStep();
      } else if (event.key === 'Enter') {
        // Ctrl/Cmd + Enter: 다음 스텝
        event.preventDefault();
        goToNextStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, goToNextStep, goToPrevStep]);
}
