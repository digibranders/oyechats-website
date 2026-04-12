'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  as?: React.ElementType;
}

export function MovingBorder({
  children,
  duration = 2000,
  rx,
  ry,
  className,
  containerClassName,
  borderClassName,
  as: Component = 'button',
}: MovingBorderProps) {
  const pathId = `path-${Math.random().toString(36).substr(2, 9)}`;
  const Wrapper = Component as React.ElementType<React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>;

  return (
    <Wrapper
      className={cn('relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl', containerClassName)}
    >
      <div className="absolute inset-0" style={{ borderRadius: rx ? `${rx} ${ry}` : undefined }}>
        <svg
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <rect
            id={pathId}
            fill="none"
            width="100"
            height="100"
            rx={rx || '10'}
            ry={ry || '10'}
          />
          <motion.rect
            fill="none"
            stroke="url(#moving-border-gradient)"
            strokeWidth="2"
            width="100"
            height="100"
            rx={rx || '10'}
            ry={ry || '10'}
            pathLength={1}
            strokeDasharray="0.2 0.8"
            initial={{ pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              repeat: Infinity,
              duration: duration / 1000,
              ease: 'linear',
            }}
          />
          <defs>
            <linearGradient id="moving-border-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className={cn(
          'relative border border-white/10 bg-[#030D1F] antialiased',
          className
        )}
        style={{ borderRadius: `calc(${rx || '10px'} * 0.96)` }}
      >
        {children}
      </div>
    </Wrapper>
  );
}
