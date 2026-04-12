'use client';

import { useRef } from 'react';
import { useIntersectionObserver } from '@/components/hooks/useIntersectionObserver';
import { FeatureIcon } from '@/components/ui/FeatureIcon';
import { FEATURE_CARDS } from '@/lib/constants';

export function Features() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className={`text-center py-24 px-[52px] section-responsive reveal-section ${isVisible ? 'visible' : ''}`}>
      <p className={`section-tag-line relative inline-block text-[11px] font-semibold tracking-[.14em] uppercase text-blue-3 mb-[14px] ${isVisible ? 'visible' : ''}`}>Capabilities</p>
      <h2 className="max-w-[600px] mx-auto mb-[52px]" style={{fontSize:'clamp(2rem, 4.2vw, 3.4rem)', fontWeight:400, letterSpacing:'-.02em', color:'rgba(255,255,255,.68)', lineHeight:1.12}}>
        Everything you need to <strong className="font-semibold gradient-text-heading">scale enterprise support</strong>
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[14px] max-w-[1200px] mx-auto">
        {FEATURE_CARDS.map((card, i) => (
          <TiltCard key={i} index={i}>
            <div className="w-11 h-11 rounded-xl mb-5 flex items-center justify-center border border-blue-3/[.28]" style={{background:'linear-gradient(135deg, rgba(37,99,235,.22), rgba(96,165,250,.1))', boxShadow:'inset 0 1px 0 rgba(255,255,255,.15)', backdropFilter:'blur(20px) saturate(160%)'}}>
              <FeatureIcon icon={card.icon} />
            </div>
            <h3 className="font-semibold text-[19px] tracking-[-0.01em] text-white mb-[10px]">{card.title}</h3>
            <p className="text-[13.5px] leading-[1.65] text-muted">{card.description}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ children }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    card.style.boxShadow = `${-x * 14}px ${-y * 14}px 40px rgba(0,0,0,.32), 0 24px 56px rgba(0,0,0,.36), inset 0 1px 0 rgba(255,255,255,.22)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
  };

  return (
    <div
      ref={cardRef}
      className="glass card-hover rounded-[20px] p-[32px_28px] text-left will-change-transform transition-all duration-300"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
