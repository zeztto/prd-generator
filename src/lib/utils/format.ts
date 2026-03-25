/**
 * 한국어 상대 시간 포맷
 * "방금 전", "5분 전", "2시간 전", "3일 전", "2024.12.15" 등
 */
export function formatRelativeTime(date: string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now.getTime() - target.getTime();

  if (diffMs < 0) return '방금 전';

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;
  if (diffDay < 30) return `${Math.floor(diffDay / 7)}주 전`;

  // 30일 이상이면 날짜 표시
  const y = target.getFullYear();
  const m = String(target.getMonth() + 1).padStart(2, '0');
  const d = String(target.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

/**
 * 날짜를 "2024년 12월 15일" 형식으로 포맷
 */
export function formatDate(date: string): string {
  const target = new Date(date);
  const y = target.getFullYear();
  const m = target.getMonth() + 1;
  const d = target.getDate();
  return `${y}년 ${m}월 ${d}일`;
}
