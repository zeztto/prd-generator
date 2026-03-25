'use client';

import { useCallback, useRef, useState } from 'react';

import { mockAIService } from '@/lib/mock/services/ai.service';

interface UseMockAIReturn {
  isLoading: boolean;
  result: string | null;
  streamingText: string;
  enhance: (sectionType: string, content: string) => Promise<string>;
  reset: () => void;
}

export function useMockAI(): UseMockAIReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [streamingText, setStreamingText] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setResult(null);
    setStreamingText('');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const enhance = useCallback(
    async (sectionType: string, content: string): Promise<string> => {
      setIsLoading(true);
      setStreamingText('');
      setResult(null);

      try {
        const enhanced = await mockAIService.enhance(sectionType, content);

        // 타이핑 효과 시뮬레이션
        return new Promise<string>((resolve) => {
          let index = 0;
          setIsLoading(false);

          intervalRef.current = setInterval(() => {
            if (index < enhanced.length) {
              const chunkSize = Math.min(3, enhanced.length - index);
              setStreamingText((prev) => prev + enhanced.slice(index, index + chunkSize));
              index += chunkSize;
            } else {
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
              }
              setResult(enhanced);
              resolve(enhanced);
            }
          }, 15);
        });
      } catch {
        setIsLoading(false);
        throw new Error('AI 보강에 실패했습니다.');
      }
    },
    [],
  );

  return {
    isLoading,
    result,
    streamingText,
    enhance,
    reset,
  };
}
