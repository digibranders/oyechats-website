import Link from 'next/link';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { BorderBeam } from '@/components/magic/BorderBeam';
import { cn } from '@/lib/utils';
import { pricingTiers } from '@/lib/pricing';

export function PricingPreview() {
  return (
    <section className="py-24 px-6 lg:px-8" aria-label="Pricing preview">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">Simple Pricing</SectionEyebrow>
          <SectionHeading gradient size="lg" center>
            Start free.{' '}
            <span className="gradient-text-heading">Scale as you grow.</span>
          </SectionHeading>
          <p className="mt-4 text-white/50">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'relative rounded-2xl p-6 transition-all duration-500 price-card-base',
                tier.featured
                  ? 'price-card-featured featured-shimmer'
                  : 'glass-2 border border-white/8'
              )}
              data-gsap
            >
              {/* BorderBeam for featured */}
              {tier.featured && (
                <BorderBeam
                  size={200}
                  duration={10}
                  colorFrom="#2563EB"
                  colorTo="#06B6D4"
                />
              )}

              {/* Badge */}
              {tier.badge && (
                <div className="mb-3">
                  <span className="text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full px-3 py-1 animate-badge-glow">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier name + price */}
              <p className="font-display font-semibold text-lg text-white mb-1">{tier.name}</p>
              <div className="flex items-baseline gap-1 mb-2">
                {tier.monthlyPrice === null ? (
                  <span className="text-3xl font-display font-bold text-white">Custom</span>
                ) : (
                  <>
                    <span className="text-3xl font-display font-bold text-white">
                      ${tier.monthlyPrice}
                    </span>
                    <span className="text-sm text-white/40">/mo</span>
                  </>
                )}
              </div>
              <p className="text-xs text-white/40 mb-5">{tier.tagline}</p>

              {/* Key features (first 5) */}
              <ul className="space-y-2 mb-6">
                {tier.features.slice(0, 5).map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/55">
                    <svg width="12" height="12" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <CTAButton
                href={tier.ctaHref}
                variant={tier.featured ? 'filled' : 'ghost'}
                size="sm"
                external={tier.ctaHref.startsWith('http')}
                className="w-full justify-center"
              >
                {tier.cta}
              </CTAButton>
            </div>
          ))}
        </div>

        <div className="text-center">
          <CTAButton href="/pricing" variant="ghost" size="sm">
            See full feature comparison
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
