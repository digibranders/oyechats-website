import { APP_LINKS } from '@/lib/constants';
import { Meteors } from '@/components/magic/Meteors';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';

export function HomeCTA() {
  return (
    <section
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
      aria-label="Call to action"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,.06) 50%, transparent 100%)',
      }}
    >
      {/* Meteors */}
      <Meteors number={15} />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,90vw)] h-[min(400px,60vh)] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(37,99,235,.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="mx-auto max-w-3xl text-center relative">
        <SectionHeading gradient size="xl" center className="mb-6">
          Turn every visitor into{' '}
          <span className="gradient-text-heading block">qualified pipeline</span>
        </SectionHeading>

        <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Set up in 10 minutes. No credit card required.
          OyeChats works on any website, any framework.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton
            href={APP_LINKS.register}
            variant="filled"
            size="lg"
            external
            showWavebar
            className="shadow-[0_0_60px_rgba(37,99,235,.4)] text-base px-10"
          >
            Start for free
          </CTAButton>
          <CTAButton
            href="/contact"
            variant="ghost"
            size="lg"
            className="text-base"
          >
            Book a demo
          </CTAButton>
        </div>

        <div className="flex items-center justify-center gap-6 mt-10 text-xs text-white/45">
          {['No credit card', 'Free forever plan', 'Setup in 10 min'].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
