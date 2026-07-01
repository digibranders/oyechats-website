import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { cn } from '@/lib/utils';
import { getPricingData } from '@/lib/pricingApi';
import { Aurora } from '@/components/shared/Aurora';

export async function PricingPreview() {
  const { tiers } = await getPricingData();

  return (
    <section className="py-24 px-6 lg:px-8" aria-label="Pricing preview">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">Simple Pricing</SectionEyebrow>
          <SectionHeading size="lg" center>
            Start free.{' '}
            <span className="gradient-text-heading">Scale as you grow.</span>
          </SectionHeading>
          <p className="mt-4 text-[var(--muted)]">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {tiers.map((tier) => (
            <div key={tier.id} className="relative pt-4 h-full" data-gsap>
              {/* fc-border-wrapper provides the 1px gradient border + glow for featured.
                  The badge is nested INSIDE this wrapper (not as a sibling
                  of it) so it inherits the ``translateY(-12px) scale(1.03)``
                  hover lift from ``.fc-border-wrapper:hover``. When it was
                  a sibling, the card lifted but the badge stayed pinned —
                  looked broken on hover. */}
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
                <div
                  className={cn(
                    'relative flex flex-col h-full p-6 cursor-pointer',
                    tier.featured
                      ? 'price-card-featured featured-shimmer'
                      : 'price-card-base bg-[var(--card)] border border-[var(--line)] rounded-2xl card-hover'
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

                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Tier name + price */}
                    <p className={cn('font-display font-semibold text-lg mb-1', tier.featured ? 'text-white' : 'text-[var(--fg)]')}>{tier.name}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      {tier.monthlyPrice === null ? (
                        <span className={cn('text-3xl font-display font-bold', tier.featured ? 'text-white' : 'text-[var(--fg)]')}>Custom</span>
                      ) : (
                        <>
                          <span className={cn('text-3xl font-display font-bold', tier.featured ? 'text-white' : 'text-[var(--fg)]')}>
                            ${tier.monthlyPrice}
                          </span>
                          <span className={cn('text-sm', tier.featured ? 'text-white/50' : 'text-[var(--muted)]')}>/mo</span>
                        </>
                      )}
                    </div>
                    <p className={cn('text-xs mb-5', tier.featured ? 'text-white/50' : 'text-[var(--muted)]')}>{tier.tagline}</p>

                    <ul className="space-y-2 mb-6 flex-1">
                      {tier.features.slice(0, 5).map((f) => (
                        <li key={f} className={cn('flex items-start gap-2 text-xs', tier.featured ? 'text-white/55' : 'text-[var(--muted)]')}>
                          <svg width="12" height="12" viewBox="0 0 24 24" className={cn('fill-none stroke-current shrink-0 mt-0.5', tier.featured ? 'text-emerald-400' : 'text-emerald-600')} strokeWidth="3">
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
                      className="w-full justify-center mt-auto"
                    >
                      {tier.cta}
                    </CTAButton>
                  </div>
                </div>
              </div>
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
