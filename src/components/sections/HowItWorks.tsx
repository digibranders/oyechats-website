import Image from 'next/image';
import { HOW_IT_WORKS_STEPS } from '@/lib/constants';
import { RevealSection } from '@/components/ui/RevealSection';

export function HowItWorks() {
  return (
    <RevealSection className="py-24 px-[52px] section-responsive" aria-label="How It Works">
      <div className="max-w-[1100px] mx-auto">
        <p className="section-tag-line relative inline-block text-[11px] font-semibold tracking-[.14em] uppercase text-blue-3 mb-[14px] text-center w-full">How It Works</p>
        <h2 className="text-center" style={{fontSize:'clamp(2rem, 4.2vw, 3.4rem)', fontWeight:400, letterSpacing:'-.02em', color:'rgba(255,255,255,.68)', lineHeight:1.12}}>
          Up and running in <strong className="font-semibold gradient-text-heading">under 10 minutes</strong>
        </h2>
        <div className="grid grid-cols-2 gap-[14px] mt-[52px] max-md:grid-cols-1">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.step} className="group rounded-[18px] overflow-hidden bg-white/[.06] backdrop-blur-[40px] border border-white/[.13] cursor-pointer transition-all duration-[280ms] hover:-translate-y-[5px] hover:border-white/[.22]" style={{boxShadow:'0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.16)'}}>
              <div className="step-overlay w-full relative overflow-hidden" style={{aspectRatio:'16/10'}}>
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out brightness-[.88] saturate-[1.1] group-hover:scale-[1.06] group-hover:brightness-[.92] group-hover:saturate-[1.25]"
                  loading="lazy"
                  quality={80}
                />
              </div>
              <div className="px-[22px] pt-[18px] pb-[22px] bg-white/[.04] backdrop-blur-[20px] border-t border-white/[.1]">
                <h4 className="font-semibold text-xl tracking-[-0.01em] text-white mb-[6px]">{step.title}</h4>
                <div className="text-xs font-normal text-white/[.32] tracking-[.01em]">{step.step} · {step.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}
