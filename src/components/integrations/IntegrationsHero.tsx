import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function IntegrationsHero() {
  return (
    <section className="relative pt-32 pb-16 px-6 lg:px-8 text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,.09) 0%, transparent 70%)' }}
      />
      <div className="mx-auto max-w-3xl relative">
        <SectionEyebrow className="mx-auto mb-4">20+ Integrations</SectionEyebrow>
        <SectionHeading gradient size="xl" center className="mb-5">
          Plug into your{' '}
          <span className="gradient-text-heading block">entire stack</span>
        </SectionHeading>
        <p className="text-white/50 text-lg leading-relaxed">
          From WordPress to Salesforce, Zapier to custom webhooks —
          OyeChats connects to the platforms your team already uses.
          Full setup guides and code snippets for every integration.
        </p>
      </div>
    </section>
  );
}
