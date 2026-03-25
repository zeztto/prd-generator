/**
 * Mock API 지연을 시뮬레이션합니다.
 * @param ms 지연 시간 (밀리초). 기본값 500ms.
 */
export function mockDelay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * AI API 지연을 시뮬레이션합니다 (1~3초 랜덤).
 */
export function mockAIDelay(): Promise<void> {
  const delay = 1000 + Math.random() * 2000;
  return new Promise((resolve) => setTimeout(resolve, delay));
}
