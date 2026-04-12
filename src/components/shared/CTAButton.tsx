import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  variant?: 'filled' | 'ghost' | 'indigo';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  showWavebar?: boolean;
}

const sizeMap = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantMap = {
  filled: 'btn-filled-style',
  ghost: 'btn-ghost-style',
  indigo: 'btn-indigo-style',
};

export function CTAButton({
  href,
  variant = 'filled',
  size = 'md',
  children,
  className,
  external = false,
  showWavebar = false,
}: CTAButtonProps) {
  const classes = cn(
    'relative inline-flex items-center gap-2 rounded-full font-medium btn-magnetic transition-all duration-300',
    sizeMap[size],
    variantMap[variant],
    className
  );

  const inner = (
    <>
      {showWavebar && variant === 'filled' && (
        <span className="flex items-center gap-0.5 mr-1">
          {[1,2,3,4].map((i) => (
            <span
              key={i}
              className="inline-block w-0.5 bg-white/70 rounded-full animate-wavebar"
              style={{
                height: '10px',
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </span>
      )}
      {children}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
