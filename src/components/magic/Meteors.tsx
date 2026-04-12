'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, (_, i) => ({
        id: i,
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${Math.random() * 0.6 + 0.2}s`,
        animationDuration: `${Math.floor(Math.random() * 8 + 3)}s`,
      })),
    [number]
  );

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
