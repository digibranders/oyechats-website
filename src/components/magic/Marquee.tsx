'use client';

import { cn } from '@/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn('flex shrink-0 justify-around gap-[--gap]', {
              'animate-marquee flex-row': !vertical && !reverse,
              'animate-[marquee-scroll-reverse_var(--duration)_linear_infinite] flex-row': !vertical && reverse,
              'animate-[marquee-vertical_var(--duration)_linear_infinite] flex-col': vertical && !reverse,
              'group-hover:[animation-play-state:paused]': pauseOnHover,
            })}
            style={{ animationDuration: 'var(--duration)' }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
