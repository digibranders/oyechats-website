'use client';

import { useCounterAnimation } from '@/components/hooks/useCounterAnimation';
import { STATS } from '@/lib/constants';

export function Stats() {
  return (
    <div className="grid grid-cols-4 gap-5 max-w-[1100px] mx-auto px-[52px] py-20 stats-responsive">
      {STATS.map((stat, i) => (
        <StatCard key={i} target={stat.target} suffix={stat.suffix} label={stat.label} />
      ))}
    </div>
  );
}

function StatCard({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { ref, display } = useCounterAnimation(target, suffix);

  return (
    <div ref={ref} className="relative text-center py-11 px-6 rounded-3xl bg-white/[.03] border border-white/[.06] backdrop-blur-[40px] overflow-hidden cursor-default transition-all duration-[450ms] hover:-translate-y-[10px] hover:scale-[1.02] hover:border-blue-3/[.25]" style={{transitionTimingFunction:'cubic-bezier(.34,1.56,.64,1)'}}>
      <div className="gradient-text-heading relative z-1 font-semibold tracking-[-0.04em] leading-none mb-2" style={{fontSize:'clamp(2.6rem,4.5vw,3.4rem)'}}>
        {display}
      </div>
      <div className="relative z-1 text-[13px] text-muted tracking-[.01em] leading-[1.5]">{label}</div>
    </div>
  );
}
