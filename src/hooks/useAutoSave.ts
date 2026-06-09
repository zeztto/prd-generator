'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { prdService } from '@/lib/services/prd.service';
import { usePRDStore } from '@/stores/prd.store';

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions {
  debounceMs?: number;
  enabled?: boolean;
}

export function useAutoSave(options: UseAutoSaveOptions = {}) {
  const { debounceMs = 2000, enabled = true } = options;

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDirty = usePRDStore((s) => s.isDirty);
  const currentPRDId = usePRDStore((s) => s.currentPRDId);
  const markSaved = usePRDStore((s) => s.markSaved);
  const lastSavedAt = usePRDStore((s) => s.lastSavedAt);

  const save = useCallback(async () => {
    setSaveStatus('saving');
    try {
      const store = usePRDStore.getState();
      store.calculateQualityScore();

      if (currentPRDId) {
        await prdService.update(currentPRDId, store.getCurrentPRDData());
      }

      markSaved();
      setSaveStatus('saved');

      // 2초 후 idle로 복귀
      statusTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch {
      setSaveStatus('error');
    }
  }, [currentPRDId, markSaved]);

  useEffect(() => {
    if (!enabled || !isDirty) return;

    // 이전 타이머 취소
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      void save();
    }, debounceMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, enabled, debounceMs, save]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  return {
    saveStatus,
    lastSavedAt,
    saveNow: () => {
      void save();
    },
  };
}
