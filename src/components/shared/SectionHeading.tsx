import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  gradientStyle?: 'blue' | 'indigo' | 'cyan';
  size?: 'md' | 'lg' | 'xl';
  as?: 'h1' | 'h2' | 'h3';
  center?: boolean;
}

const sizeMap = {
  md: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl',
  xl: 'text-5xl md:text-6xl lg:text-7xl',
};

const gradientMap = {
  blue: 'gradient-text-heading',
  indigo: 'gradient-text-indigo',
  cyan: 'gradient-text-cyan',
};

export function SectionHeading({
  children,
  className,
  gradient = false,
  gradientStyle = 'blue',
  size = 'lg',
  as: Tag = 'h2',
  center = false,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-display font-semibold leading-tight tracking-tight',
        sizeMap[size],
        gradient && gradientMap[gradientStyle],
        center && 'text-center',
        className
      )}
    >
      {children}
    </Tag>
  );
}
