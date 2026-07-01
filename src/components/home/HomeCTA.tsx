import { APP_LINKS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { RotatingWord } from '@/components/shared/RotatingWord';

export function HomeCTA() {
  return (
    <section
      className="relative py-32 px-6 lg:px-8 overflow-hidden"
      aria-label="Call to action"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(37,99,235,.04) 50%, transparent 100%)',
      }}
    >
      <div className="mx-auto max-w-3xl text-center relative">
        {/* Headline echoes the hero's brand promise so the bottom CTA
            feels like a natural close on the same hook. Uses the shared
            RotatingWord so both surfaces stay in sync if the word list
            is ever tuned. */}
        <SectionHeading gradient size="xl" center className="mb-6">
          The AI That Actually <RotatingWord />
        </SectionHeading>

        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
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
            className="text-base px-10"
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

        <div className="flex items-center justify-center gap-6 mt-10 text-xs text-white/70">
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
