'use client';

import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

interface PricingHeroProps {
  billing: 'monthly' | 'annual';
  onToggle: (v: 'monthly' | 'annual') => void;
}

export function PricingHero({ billing, onToggle }: PricingHeroProps) {
  return (
    <section className="pt-32 pb-12 px-6 lg:px-8 text-center">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow className="mx-auto mb-4">Simple Pricing</SectionEyebrow>
        <SectionHeading gradient size="xl" center className="mb-5">
          One platform.{' '}
          <span className="gradient-text-heading block">Every team size.</span>
        </SectionHeading>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Start free. Scale when you grow. No surprise charges, no hidden fees.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 glass-1 rounded-full p-1 border border-white/10">
          <button
            onClick={() => onToggle('monthly')}
            className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer"
          >
            {billing === 'monthly' && (
              <motion.div
                layoutId="billing-pill"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              />
            )}
            <span className={`relative z-10 ${billing === 'monthly' ? 'text-white' : 'text-white/50'}`}>
              Monthly
            </span>
          </button>

          <button
            onClick={() => onToggle('annual')}
            className="relative px-5 py-2 text-sm font-medium rounded-full transition-colors flex items-center gap-2 cursor-pointer"
          >
            {billing === 'annual' && (
              <motion.div
                layoutId="billing-pill"
                className="absolute inset-0 bg-blue-600 rounded-full"
                transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              />
            )}
            <span className={`relative z-10 ${billing === 'annual' ? 'text-white' : 'text-white/50'}`}>
              Annual
            </span>
            <span className="relative z-10 text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full px-2 py-0.5">
              Save 30%
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
