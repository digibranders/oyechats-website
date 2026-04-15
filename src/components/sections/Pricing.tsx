'use client';
import { APP_LINKS } from '@/lib/constants';
import { useState } from 'react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { PRICING_PLANS } from '@/lib/constants';

export function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="pricing" className={`text-center relative overflow-hidden py-24 px-[52px] section-responsive reveal-section ${isVisible ? 'visible' : ''}`} aria-label="Pricing">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none" style={{background:'radial-gradient(ellipse,rgba(37,99,235,.16) 0%, rgba(6,182,212,.06) 40%, transparent 70%)'}} />

      <p className={`section-tag-line relative inline-block text-[11px] font-semibold tracking-[.14em] uppercase text-blue-3 mb-[14px] ${isVisible ? 'visible' : ''}`}>Pricing</p>
      <h2 className="mb-1" style={{fontSize:'clamp(2rem, 4.2vw, 3.4rem)', fontWeight:400, letterSpacing:'-.02em', color:'rgba(255,255,255,.68)', lineHeight:1.12}}>
        Simple, <strong className="font-semibold gradient-text-heading">transparent pricing</strong>
      </h2>
      <p className="text-muted max-w-[480px] mx-auto mb-3 text-[15px] leading-[1.7]">Choose the plan that fits your needs. Scale up anytime.</p>

      {/* Toggle */}
      <div className="inline-flex gap-0.5 bg-white/[.06] border border-white/[.1] rounded-full p-[3px] mx-auto mb-[52px] relative z-2">
        <button onClick={() => setBilling('monthly')} className={`py-2 px-[22px] rounded-full text-[13px] leading-none cursor-pointer border-none transition-all duration-[250ms] ${billing === 'monthly' ? 'bg-blue text-white shadow-[0_0_20px_rgba(37,99,235,.4)]' : 'bg-transparent text-white/45'}`}>
          Monthly
        </button>
        <button onClick={() => setBilling('annual')} className={`py-2 px-[22px] rounded-full text-[13px] leading-none cursor-pointer border-none transition-all duration-[250ms] ${billing === 'annual' ? 'bg-blue text-white shadow-[0_0_20px_rgba(37,99,235,.4)]' : 'bg-transparent text-white/45'}`}>
          Annual <span className="text-[11px] font-semibold text-[#22c55e] ml-[6px]">Save 20%</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-[14px] max-w-[1200px] mx-auto relative z-2 pricing-grid-responsive">
        {PRICING_PLANS.map((plan) => {
          const price = billing === 'annual' ? plan.annualPrice : plan.monthlyPrice;
          const isCustom = price === null;

          return (
            <div key={plan.name} className={`price-card-base relative rounded-3xl p-[40px_32px] text-left overflow-hidden z-1 ${plan.isFeatured ? 'featured-shimmer bg-blue/[.12] border border-blue-3/[.3]' : 'bg-white/[.045] backdrop-blur-[40px] border border-white/[.1]'}`} style={{boxShadow: plan.isFeatured ? '0 8px 40px rgba(37,99,235,.2), 0 0 0 1px rgba(96,165,250,.1), inset 0 1px 0 rgba(255,255,255,.18)' : '0 8px 32px rgba(0,0,0,.24), inset 0 1px 0 rgba(255,255,255,.12)'}}>
              {plan.isFeatured && 'badge' in plan && (
                <div className="absolute top-[22px] right-[22px] text-[10px] font-semibold tracking-[.08em] uppercase py-1 px-3 rounded-full border border-blue-3/[.3] text-blue-3 animate-badge-glow" style={{background:'linear-gradient(135deg, rgba(37,99,235,.3), rgba(96,165,250,.2)'}}>
                  {plan.badge}
                </div>
              )}

              <p className="price-plan-name-el text-[13px] font-semibold tracking-[.08em] uppercase text-white/50 mb-4 transition-colors duration-300">{plan.name}</p>

              <div className="flex items-baseline gap-1 mb-[6px]">
                {!isCustom && <span className="text-[1.2rem] font-semibold text-white/50 self-start mt-[6px]">$</span>}
                <span className={`font-semibold tracking-[-0.04em] text-white leading-none transition-all duration-300 ${isCustom ? '' : ''}`} style={{fontSize: isCustom ? 'clamp(1.6rem,2.5vw,2rem)' : 'clamp(2.8rem, 4vw, 3.6rem)'}}>
                  {isCustom ? 'Custom' : price}
                </span>
                {!isCustom && <span className="text-sm text-white/45">/month</span>}
              </div>

              <p className="text-[13px] text-muted leading-[1.6] mb-7 min-h-[40px]">{plan.description}</p>

              <div>
                <a href={APP_LINKS.home} target="_blank" rel="noopener noreferrer" className={`price-cta-el block w-full text-center py-[14px] rounded-[14px] font-semibold text-sm leading-none cursor-pointer border-none transition-all duration-300 no-underline ${plan.ctaStyle === 'filled' ? 'text-white' : 'bg-white/[.07] border border-white/[.15] text-white/75 hover:bg-white/[.12] hover:border-white/[.25] hover:text-white'}`} style={plan.ctaStyle === 'filled' ? {background:'linear-gradient(135deg, var(--color-blue), #1d4ed8)', color:'#fff', boxShadow:'0 4px 20px rgba(37,99,235,.45), inset 0 1px 0 rgba(255,255,255,.12)'} : {boxShadow:'inset 0 1px 0 rgba(255,255,255,.08)'}}>
                  {plan.cta}
                </a>
              </div>

              <div className="flex flex-col gap-3 mt-7 pt-6 border-t border-white/[.08]">
                {plan.features.map((feat) => (
                  <div key={feat} className="price-feat-el flex items-center gap-[10px] text-[13px] text-white/55 transition-colors duration-200">
                    <span className="pf-dot-el w-[6px] h-[6px] rounded-full bg-blue-3 flex-shrink-0 transition-shadow duration-300" style={{boxShadow:'0 0 8px rgba(96,165,250,.4)'}} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
