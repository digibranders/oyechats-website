import { APP_LINKS } from '@/lib/constants';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';

export function FeaturesHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 lg:px-8 text-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,.10) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-4xl relative">
        <SectionEyebrow className="mx-auto mb-4">Platform Features</SectionEyebrow>
        <SectionHeading gradient size="xl" center className="mb-5">
          Every feature your{' '}
          <span className="gradient-text-heading block">sales team needs</span>
        </SectionHeading>
        <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          From RAG-powered AI knowledge bases to BANT sales qualification, live chat handoff,
          behavioral tracking, and enterprise-grade webhooks — OyeChats is built for conversion.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CTAButton
            href={APP_LINKS.register}
            variant="filled"
            size="lg"
            external
            className="px-10"
          >
            Start for free
          </CTAButton>
          <CTAButton href="/pricing" variant="ghost" size="lg">
            View pricing
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
