import { cn } from '@/lib/utils';

interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'indigo' | 'cyan' | 'emerald';
}

const colorMap = {
  blue: 'text-blue-400 border-blue-400/25 bg-blue-400/8',
  indigo: 'text-indigo-400 border-indigo-400/25 bg-indigo-400/8',
  cyan: 'text-cyan-400 border-cyan-400/25 bg-cyan-400/8',
  emerald: 'text-emerald-400 border-emerald-400/25 bg-emerald-400/8',
};

export function SectionEyebrow({ children, className, color = 'blue' }: SectionEyebrowProps) {
  return (
    <div
      className={cn(
        'flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider',
        colorMap[color],
        className
      )}
    >
      {children}
    </div>
  );
}
