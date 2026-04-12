'use client';

import { cn } from '@/lib/utils';

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  return (
    <div
      className={cn(
        'group relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-full bg-white/5 px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_#ffffff1f] backdrop-blur-sm transition-shadow duration-500 ease-out [--bg-size:300%] hover:shadow-[inset_0_-5px_10px_#ffffff3f]',
        className
      )}
    >
      <div
        className={cn(
          'absolute inset-0 block h-full w-full animate-gradient bg-gradient-to-r from-[#60A5FA]/50 via-[#6366F1]/50 to-[#06B6D4]/50 bg-[length:var(--bg-size)_100%] p-px rounded-full [border:1px_solid_transparent] ![mask-composite:subtract] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]'
        )}
        style={{
          backgroundSize: '300% 100%',
          animation: 'gradient-text-shift 4s ease infinite',
        }}
      />
      {children}
    </div>
  );
}
