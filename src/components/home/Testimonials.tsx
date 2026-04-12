'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { testimonials } from '@/lib/testimonials';
import { cn } from '@/lib/utils';

const industryColors = {
  'e-commerce': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  saas: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  agency: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  fintech: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  healthcare: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  education: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

export function Testimonials() {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 px-6 lg:px-8" aria-label="Customer testimonials">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">Customer Stories</SectionEyebrow>
          <SectionHeading gradient size="lg" center>
            Loved by teams who{' '}
            <span className="gradient-text-heading">close deals</span>
          </SectionHeading>
        </div>

        {/* Testimonial cards — responsive grid on mobile, drag carousel on desktop */}
        <div ref={constraintsRef} className="overflow-hidden">
          <motion.div
            className="flex gap-5 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.1}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="glass-2 rounded-2xl p-6 min-w-[clamp(280px,80vw,360px)] max-w-[360px] border border-white/10 flex-shrink-0 group hover:border-white/15 transition-all"
                data-gsap
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 24 24" className="text-amber-400 fill-current">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-white/65 leading-relaxed mb-5">
                  "{t.quote}"
                </blockquote>

                {/* Metric */}
                {t.metric && (
                  <div className="glass-1 rounded-xl p-3 mb-5 flex items-center gap-3 border border-white/8">
                    <span className="text-2xl font-display font-bold text-emerald-400">{t.metric.value}</span>
                    <span className="text-xs text-white/45">{t.metric.label}</span>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: t.avatarColor }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.title}, {t.company}</p>
                  </div>
                  <div className="ml-auto">
                    <span className={cn(
                      'text-[10px] font-medium rounded-full border px-2.5 py-1 uppercase tracking-wide',
                      industryColors[t.industry]
                    )}>
                      {t.industry}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Drag hint */}
        <p className="text-center text-xs text-white/25 mt-4">← Drag to explore →</p>
      </div>
    </section>
  );
}
