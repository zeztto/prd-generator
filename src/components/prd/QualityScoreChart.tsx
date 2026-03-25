'use client';

import { cn } from '@/lib/utils';

interface QualityScoreChartProps {
  score: number;
  size?: number;
}

function getGradeInfo(score: number) {
  if (score >= 90) return { grade: '전문가 수준', color: 'text-green-500', stroke: '#22c55e' };
  if (score >= 70) return { grade: '양호', color: 'text-blue-500', stroke: '#3b82f6' };
  if (score >= 50) return { grade: '개선 필요', color: 'text-yellow-500', stroke: '#eab308' };
  return { grade: '부족', color: 'text-red-500', stroke: '#ef4444' };
}

export function QualityScoreChart({ score, size = 160 }: QualityScoreChartProps) {
  const { grade, color, stroke } = getGradeInfo(score);

  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const offset = circumference - progress;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* 배경 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* 진행 원 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('text-3xl font-bold tabular-nums', color)}>
            {score}
          </span>
          <span className="text-xs text-muted-foreground">/100</span>
        </div>
      </div>
      <span className={cn('text-sm font-medium', color)}>{grade}</span>
    </div>
  );
}
