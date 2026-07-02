import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function IntegrationsHero() {
  return (
    <section className="relative pt-32 pb-12 px-6 lg:px-8 text-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,99,235,.09) 0%, transparent 70%)' }}
      />
      <div className="mx-auto max-w-3xl relative">
        <SectionEyebrow className="mx-auto mb-4">Integrations</SectionEyebrow>
        <SectionHeading gradient size="xl" center className="mb-5">
          Drop the widget in,{' '}
          <span className="gradient-text-heading block">anywhere</span>
        </SectionHeading>
        <p className="text-white/50 text-lg leading-relaxed">
          From WordPress to Next.js, Zapier to custom webhooks,
          OyeChats works on any site that can host a script tag.
          Full setup guides and code snippets for every supported platform.
        </p>
      </div>
    </section>
  );
}
