'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface BANTScoreRingProps {
  score: number;
  size?: number;
  className?: string;
  showLabel?: boolean;
  animate?: boolean;
}

function scoreColor(score: number) {
  if (score >= 70) return '#10B981'; // emerald
  if (score >= 40) return '#F59E0B'; // amber
  return '#EF4444'; // red
}

function scoreTier(score: number) {
  if (score >= 70) return { label: 'Sales Ready', color: 'text-emerald-400' };
  if (score >= 40) return { label: 'Nurturing', color: 'text-amber-400' };
  return { label: 'Unqualified', color: 'text-red-400' };
}

export function BANTScoreRing({
  score,
  size = 140,
  className,
  showLabel = true,
  animate = true,
}: BANTScoreRingProps) {
  const [currentScore, setCurrentScore] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 4;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (inView && animate) {
      const duration = 1400;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCurrentScore(Math.round(ease * score));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else if (!animate) {
      setCurrentScore(score);
    }
  }, [inView, score, animate]);

  const dashOffset = circumference - (currentScore / 100) * circumference;
  const color = scoreColor(score);
  const tier = scoreTier(score);

  return (
    <div ref={ref} className={cn('relative flex flex-col items-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Fill */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: animate ? 'none' : 'stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1)',
            filter: `drop-shadow(0 0 8px ${color}60)`,
          }}
        />
        {/* Score text */}
        <text
          x={center}
          y={center - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={Math.round(size * 0.2)}
          fontWeight="700"
          fontFamily="var(--font-inter)"
        >
          {currentScore}
        </text>
        <text
          x={center}
          y={center + size * 0.12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize={Math.round(size * 0.073)}
          fontFamily="var(--font-inter)"
        >
          BANT SCORE
        </text>
      </svg>
      {showLabel && (
        <span className={cn('mt-1 text-xs font-semibold', tier.color)}>
          {tier.label}
        </span>
      )}
    </div>
  );
}
