'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CTAButton } from '@/components/shared/CTAButton';
import { cn } from '@/lib/utils';
import { Aurora } from '@/components/shared/Aurora';
import type { PricingTier } from '@/types/pricing';

interface PricingCardsProps {
  billing: 'monthly' | 'annual';
  tiers: PricingTier[];
}

export function PricingCards({ billing, tiers }: PricingCardsProps) {
  return (
    <>
    <section className="px-6 lg:px-8 pt-12 pb-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier, i) => (
            <div key={tier.id} className="relative pt-4 h-full">
              {/*
                Featured: fc-border-wrapper provides the 1px gradient border + animated glow.
                Non-featured: plain wrapper div, no extra styles.

                The badge is nested INSIDE this wrapper (not as a sibling
                of it) so it inherits the ``translateY(-12px) scale(1.03)``
                hover lift from ``.fc-border-wrapper:hover``. When it
                was a sibling it stayed pinned while the card flew up
                on hover, which looked broken.
              */}
              <div className={cn('relative h-full', tier.featured && 'fc-border-wrapper rounded-2xl keep-dark')}>
                {tier.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div
                      className="rounded-full p-px shadow-lg shadow-black/60"
                      style={{ background: 'linear-gradient(90deg, rgba(139,92,246,0.75) 0%, rgba(167,139,250,0.55) 40%, rgba(99,102,241,0.45) 60%, rgba(139,92,246,0.75) 100%)' }}
                    >
                      <span className="flex items-center rounded-full bg-[#0d0d14] px-4 py-1.5 text-[11px] font-semibold tracking-wide text-white/90">
                        {tier.badge}
                      </span>
                    </div>
                  </div>
                )}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className={cn(
                'relative flex flex-col h-full p-6',
                tier.featured
                  ? 'price-card-featured featured-shimmer'
                  : 'glass-2 border border-white/8 rounded-2xl'
              )}
            >
              {tier.featured && (
                <>
                  {/* Layer 1: Animated Aurora Background (Silky moving layer) */}
                  <div className="absolute inset-0 z-0 opacity-60 pointer-events-none" aria-hidden="true">
                    <Aurora
                      colors={["#060a14", "#0a1329", "#112247", "#1c356b", "#2a4c93", "#4f46e5", "#0ea5e9", "#06b6d4"]}
                      speed={1.2}
                    />
                  </div>
                  {/* Layer 2: dark readability overlay (multiply blend) */}
                  <div className="fc-overlay" aria-hidden="true" />
                </>
              )}

              {/* Foreground content — z-10 clears both mesh + overlay */}
              <div className="relative z-10 flex flex-col flex-1">
                <p className="font-display font-semibold text-lg text-white mb-1">{tier.name}</p>
                <p className="text-xs text-white/50 mb-4 leading-relaxed">{tier.tagline}</p>

                <div className="mb-5">
                  <AnimatePresence mode="wait">
                    {tier.monthlyPrice === null ? (
                      <motion.div
                        key="custom"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-3xl font-display font-bold text-white">Custom</span>
                      </motion.div>
                    ) : tier.monthlyPrice === 0 ? (
                      <motion.div
                        key="free"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="text-3xl font-display font-bold text-white">Free</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={billing}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-display font-bold text-white">
                            ${(billing === 'annual' ? tier.annualPrice : tier.monthlyPrice)?.toLocaleString('en-US')}
                          </span>
                          <span className="text-sm text-white/50">/ month</span>
                        </div>
                        {billing === 'annual' && tier.annualTotal !== null && tier.annualTotal !== undefined && tier.annualTotal > 0 && (
                          <p className="text-xs text-emerald-400 mt-1">
                            ${tier.annualPrice?.toLocaleString('en-US')}/mo · billed ${tier.annualTotal?.toLocaleString('en-US')}/yr
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-2 mb-5 pb-5 border-b border-white/8">
                  {[
                    {
                      label: 'Monthly credits',
                      value: tier.credits === null ? 'Custom' : tier.credits.toLocaleString(),
                    },
                    {
                      label: 'Operator seats',
                      value:
                        tier.includedSeats === null
                          ? 'Unlimited'
                          : tier.includedSeats === 0
                            ? '-'
                            : `${tier.includedSeats} included`,
                    },
                    { label: 'Live chat', value: tier.liveChat ? 'Included' : '-' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-white/50">{l.label}</span>
                      <span className={cn(
                        'text-[11px] font-semibold',
                        l.value === 'Unlimited' ? 'text-emerald-400' : l.value === '-' ? 'text-white/45' : 'text-white/80'
                      )}>{l.value}</span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-2 mb-6 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-white/60">
                      <svg width="12" height="12" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <CTAButton
                  href={tier.ctaHref}
                  variant={tier.featured ? 'filled' : tier.accent === 'indigo' ? 'indigo' : 'ghost'}
                  size="md"
                  external={tier.ctaHref.startsWith('http')}
                  className="w-full justify-center"
                >
                  {tier.cta}
                </CTAButton>
              </div>
            </motion.div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>

    <p className="text-center text-xs text-white/45 pt-6 pb-16 px-6">
      Starter Plan include a 14-day free trial · No credit card required · Cancel anytime
    </p>
    </>
  );
}
