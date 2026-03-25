'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

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
  const markSaved = usePRDStore((s) => s.markSaved);
  const lastSavedAt = usePRDStore((s) => s.lastSavedAt);

  const save = useCallback(() => {
    setSaveStatus('saving');
    try {
      // persist 미들웨어가 localStorage에 자동 저장하므로
      // 여기서는 dirty 플래그만 정리
      markSaved();
      setSaveStatus('saved');

      // 2초 후 idle로 복귀
      statusTimerRef.current = setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch {
      setSaveStatus('error');
    }
  }, [markSaved]);

  useEffect(() => {
    if (!enabled || !isDirty) return;

    // 이전 타이머 취소
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      save();
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
    saveNow: save,
  };
}
