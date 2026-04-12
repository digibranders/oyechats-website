import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'live' | 'offline' | 'maintenance';
  label?: string;
  className?: string;
}

const statusConfig = {
  live: {
    dot: 'bg-emerald-400 animate-livepulse',
    text: 'text-emerald-400',
    label: 'All systems live',
  },
  offline: {
    dot: 'bg-red-400',
    text: 'text-red-400',
    label: 'Offline',
  },
  maintenance: {
    dot: 'bg-amber-400 animate-blink',
    text: 'text-amber-400',
    label: 'Maintenance',
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium',
        config.text,
        className
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {label ?? config.label}
    </div>
  );
}
