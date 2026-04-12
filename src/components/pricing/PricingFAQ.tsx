'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { pricingFAQ } from '@/lib/pricing';
import { cn } from '@/lib/utils';

export function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-12">
          <SectionEyebrow className="mx-auto mb-4">FAQ</SectionEyebrow>
          <h2 className="font-display text-3xl font-semibold text-white">
            Common questions
          </h2>
        </div>

        <div className="space-y-2">
          {pricingFAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={cn(
                  'rounded-xl border transition-colors duration-200',
                  isOpen ? 'border-white/15 bg-white/[0.04]' : 'border-white/6 bg-white/[0.02]'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-white leading-snug">{item.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={cn('text-white/40 shrink-0 mt-0.5 transition-transform duration-200', isOpen ? 'rotate-45' : '')}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-white/55 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-white/35 mt-10">
          Still have questions?{' '}
          <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4">
            Talk to us
          </a>
        </p>
      </div>
    </section>
  );
}
