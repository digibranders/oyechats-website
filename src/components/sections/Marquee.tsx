import { MARQUEE_ITEMS } from '@/lib/constants';

export function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee-mask marquee-hover-pause border-t border-b border-white/[.055] py-[13px] overflow-hidden bg-white/[.018]">
      <div className="marquee-track flex animate-marquee w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-[10px] px-[30px] whitespace-nowrap text-[11px] font-semibold tracking-[.1em] uppercase text-white/[.18]"
          >
            {item} <span className="text-white/[.08]">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
