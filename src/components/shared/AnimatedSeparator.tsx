import { cn } from '@/lib/utils';

interface AnimatedSeparatorProps {
  className?: string;
  color?: 'blue' | 'indigo' | 'cyan' | 'multi';
}

export function AnimatedSeparator({ className, color = 'multi' }: AnimatedSeparatorProps) {
  const glowColors = {
    blue: 'rgba(37,99,235,0.07)',
    indigo: 'rgba(99,102,241,0.07)',
    cyan: 'rgba(6,182,212,0.07)',
    multi: 'rgba(37,99,235,0.06)',
  };

  const lineColors = {
    blue: 'from-transparent via-blue-500/50 to-transparent',
    indigo: 'from-transparent via-indigo-500/50 to-transparent',
    cyan: 'from-transparent via-cyan-500/50 to-transparent',
    multi: 'from-transparent via-blue-500/40 to-transparent',
  };

  return (
    <div
      className={cn('relative pointer-events-none flex items-center', className)}
      style={{
        height: '120px',
        background: `radial-gradient(ellipse 50% 100% at 50% 50%, ${glowColors[color]} 0%, transparent 70%)`,
      }}
    >
      <div className={cn('h-px w-full bg-gradient-to-r', lineColors[color])} />
    </div>
  );
}
