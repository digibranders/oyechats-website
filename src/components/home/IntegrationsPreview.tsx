import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { BackgroundBeams } from '@/components/aceternity/BackgroundBeams';
import { MagicCard } from '@/components/magic/MagicCard';
import {
  siWordpress, siShopify, siWebflow, siNextdotjs, siHtml5, siVuedotjs, siReact, siFramer,
  siBrevo, siCalendly, siSentry, siZapier, siMake,
  type SimpleIcon,
} from 'simple-icons';
import { Link as LinkIcon, Wrench } from 'lucide-react';

type BrandSvgProps = { icon: SimpleIcon; size?: number; overrideColor?: string };

function BrandSvg({ icon, size = 24, overrideColor }: BrandSvgProps) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={overrideColor ?? `#${icon.hex}`}
      className="group-hover:scale-110 transition-transform duration-200"
    >
      <path d={icon.path} />
    </svg>
  );
}

function LangfuseSvg({ size = 24 }: { size?: number }) {
  return (
    <svg
      role="img"
      aria-label="Langfuse"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      fill="none"
      className="group-hover:scale-110 transition-transform duration-200"
    >
      <rect width="32" height="32" rx="7" fill="#0F1010" />
      <path d="M9 8h3.5v12.5H21V24H9V8Z" fill="#E11AAF" />
      <path d="M15.5 8h3.5v9.5h3.5V21H15.5V8Z" fill="#F2C94C" opacity="0.95" />
    </svg>
  );
}

const previewIntegrations: { name: string; desc: string; node: React.ReactNode }[] = [
  { name: 'WordPress', desc: 'Plugin install',  node: <BrandSvg icon={siWordpress} /> },
  { name: 'Shopify',   desc: 'Theme injection', node: <BrandSvg icon={siShopify} /> },
  { name: 'Webflow',   desc: 'Custom embed',    node: <BrandSvg icon={siWebflow} /> },
  { name: 'Next.js',   desc: 'Script component',node: <BrandSvg icon={siNextdotjs} overrideColor="var(--fg)" /> },
  { name: 'HTML',      desc: 'Single tag embed',node: <BrandSvg icon={siHtml5} /> },
  { name: 'Vue.js',    desc: 'Plugin or script',node: <BrandSvg icon={siVuedotjs} /> },
  { name: 'React',     desc: 'Drop-in component', node: <BrandSvg icon={siReact} /> },
  { name: 'Framer',    desc: 'Code component embed', node: <BrandSvg icon={siFramer} overrideColor="var(--fg)" /> },
  { name: 'Calendly',  desc: 'In-chat booking', node: <BrandSvg icon={siCalendly} /> },
  { name: 'Brevo',     desc: 'Transactional email', node: <BrandSvg icon={siBrevo} /> },
  { name: 'Zapier',    desc: 'Via webhooks',    node: <BrandSvg icon={siZapier} /> },
  { name: 'Make',      desc: 'Via webhooks',    node: <BrandSvg icon={siMake} /> },
  { name: 'Sentry',    desc: 'Error monitoring', node: <BrandSvg icon={siSentry} overrideColor="#A99CFF" /> },
  { name: 'Langfuse',  desc: 'AI observability', node: <LangfuseSvg /> },
  { name: 'Webhooks',  desc: '5 event types',    node: <LinkIcon className="w-6 h-6 text-[var(--accent)] group-hover:scale-110 transition-transform duration-200" /> },
  { name: 'REST API',  desc: 'Full OpenAPI spec', node: <Wrench className="w-6 h-6 text-[var(--accent)] group-hover:scale-110 transition-transform duration-200" /> },
];

export function IntegrationsPreview() {
  return (
    <section className="relative py-24 px-6 lg:px-8 overflow-hidden" aria-label="Integrations">
      <BackgroundBeams className="opacity-60" />

      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">Integrations</SectionEyebrow>
          <SectionHeading size="lg" center>
            Drop the widget in,{' '}
            <span className="gradient-text-heading">anywhere</span>
          </SectionHeading>
          <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">
            Works on any site that can host a script tag, plus webhooks, REST API, and meeting bookings out of the box.
          </p>
        </div>

        {/* Integration logos grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {previewIntegrations.map((item) => (
            <MagicCard
              key={item.name}
              className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-4 card-hover cursor-pointer group"
              gradientColor="#2563EB"
              gradientOpacity={0.06}
            >
              <div className="flex flex-col items-center gap-2 text-center" data-gsap>
                {item.node}
                <span className="text-xs font-medium text-[var(--fg)]/70 group-hover:text-[var(--fg)] transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] text-[var(--muted)]">{item.desc}</span>
              </div>
            </MagicCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButton href="/integrations" variant="ghost" size="md">
            View all 15+ integrations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
