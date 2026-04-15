'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface MeteorsProps {
  number?: number;
  className?: string;
}

/** Deterministic PRNG (mulberry32) so meteor positions are stable across re-renders. */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generateMeteors(count: number) {
  const rand = mulberry32(7);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.floor(rand() * 100)}%`,
    left: `${Math.floor(rand() * 100)}%`,
    animationDelay: `${rand() * 0.6 + 0.2}s`,
    animationDuration: `${Math.floor(rand() * 8 + 3)}s`,
  }));
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = useMemo(() => generateMeteors(number), [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            'pointer-events-none absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_#ffffff10]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[80px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        />
      ))}
    </>
  );
}
