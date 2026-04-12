'use client';
import { APP_LINKS } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { RotatingText } from '@/components/ui/RotatingText';

const ParticleSphere = dynamic(
  () =>
    import('@/components/canvas/ParticleSphere').then((m) => ({
      default: m.ParticleSphere,
    })),
  { ssr: false },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionH = rect.height;
      // 0 when top of section is at viewport top, 1 when fully scrolled past
      const progress = Math.max(0, Math.min(1, -rect.top / sectionH));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleCtaClick = () => {
    window.dispatchEvent(new CustomEvent('oye:celebrate'));
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-svh flex flex-col items-center justify-center text-center px-6 pt-[100px] pb-[48px] overflow-hidden"
    >
      {/* Glow background */}
      <div
        className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse, rgba(14,80,200,.46) 0%, rgba(14,60,180,.18) 38%, transparent 70%)',
          animation:
            'pulse-glow 5.5s ease-in-out infinite, glow-drift 18s ease-in-out infinite',
        }}
      />

      {/* Single-line headline: rotating word + "Oye." on the same line */}
      <h1
        className="relative z-2 font-semibold leading-[1.06] tracking-[-0.03em] max-w-[720px] mb-5"
        style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
      >
        <RotatingText
          words={['Ask', 'Try', 'Meet']}
          intervalMs={2800}
          className="bg-gradient-to-r from-[#60A5FA] to-[#93C5FD] bg-clip-text text-transparent"
        />
        {' '}
        <span className="text-white/90">Oye.</span>
      </h1>

      {/* Subheadline */}
      <p
        className="relative z-2 text-white/60 max-w-[600px] mb-8 animate-subheadline-fade"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)' }}
      >
        Where Help is Always One Message Away.
      </p>

      {/* CTA Button */}
      <a
        href={APP_LINKS.home}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCtaClick}
        className="cta-ring relative z-2 inline-flex items-center gap-[10px] rounded-full px-[30px] py-[14px] font-semibold text-[15px] leading-none tracking-[-0.015em] text-white cursor-pointer border-none transition-all duration-200 hover:-translate-y-0.5 no-underline"
        style={{
          background: 'linear-gradient(135deg,#1a46c4,#2563EB)',
          boxShadow:
            '0 0 32px rgba(37,99,235,.55), 0 0 80px rgba(37,99,235,.18), inset 0 1px 0 rgba(255,255,255,.16)',
        }}
      >
        <div className="flex items-center gap-[2.5px]">
          {[7, 13, 9, 15, 7].map((h, i) => (
            <span
              key={i}
              className="block w-[3px] rounded-[10px] bg-white/80 animate-wavebar"
              style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        Try OyeChats
      </a>

      {/* Particle sphere — capped by both viewport width and height so it
          never overflows the fixed 100vh hero at any screen size */}
      <div
        className="relative z-2 mx-auto mt-8 animate-hero-float"
        style={{
          width:  'clamp(200px, min(44vw, 34vh), 340px)',
          height: 'clamp(200px, min(44vw, 34vh), 340px)',
        }}
      >
        <ParticleSphere scrollProgress={scrollProgress} />
      </div>
    </section>
  );
}
