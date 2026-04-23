'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CTAButton } from '@/components/shared/CTAButton';
import { BorderBeam } from '@/components/magic/BorderBeam';
import { cn } from '@/lib/utils';
import { pricingTiers } from '@/lib/pricing';

interface PricingCardsProps {
  billing: 'monthly' | 'annual';
}

export function PricingCards({ billing }: PricingCardsProps) {
  return (
    <>
    <section className="px-6 lg:px-8 pb-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pricingTiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className={cn(
                'relative rounded-2xl p-6 flex flex-col',
                tier.featured
                  ? 'price-card-featured featured-shimmer'
                  : 'glass-2 border border-white/8'
              )}
            >
              {tier.featured && (
                <BorderBeam size={280} duration={10} colorFrom="#2563EB" colorTo="#06B6D4" />
              )}

              {/* Badge — always reserve this height so all cards align */}
              <div className="mb-4 h-6 flex items-center">
                {tier.badge && (
                  <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1 animate-badge-glow">
                    {tier.badge}
                  </span>
                )}
              </div>

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
                          ${billing === 'annual' ? tier.annualPrice : tier.monthlyPrice}
                        </span>
                        <span className="text-sm text-white/50">/ operator</span>
                      </div>
                      {billing === 'annual' && tier.annualTotal !== null && tier.annualTotal !== undefined && tier.annualTotal > 0 && (
                        <p className="text-xs text-emerald-400 mt-1">
                          ${tier.annualPrice}/mo · billed ${tier.annualTotal}/yr
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-2 mb-5 pb-5 border-b border-white/8">
                {[
                  { label: 'URL scanning', value: typeof tier.limits.urlScanning === 'number' ? tier.limits.urlScanning.toLocaleString() : tier.limits.urlScanning },
                  { label: 'AI queries', value: typeof tier.limits.aiQueries === 'number' ? tier.limits.aiQueries.toLocaleString() : tier.limits.aiQueries },
                  { label: 'Live chat', value: tier.limits.liveChat },
                ].map((l) => (
                  <div key={l.label} className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-white/50">{l.label}</span>
                    <span className={cn(
                      'text-[11px] font-semibold',
                      l.value === 'Unlimited' ? 'text-emerald-400' : l.value === '—' ? 'text-white/45' : 'text-white/80'
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
            </motion.div>
          ))}
        </div>

      </div>
    </section>

    <p className="text-center text-xs text-white/45 py-5 px-6">
      All plans include a 14-day free trial · No credit card required · Cancel anytime
    </p>
    </>
  );
}
