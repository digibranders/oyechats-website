import Link from 'next/link';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { BackgroundBeams } from '@/components/aceternity/BackgroundBeams';
import { MagicCard } from '@/components/magic/MagicCard';

const previewIntegrations = [
  { icon: '🌐', name: 'WordPress', desc: 'Plugin install' },
  { icon: '🛍️', name: 'Shopify', desc: 'Theme injection' },
  { icon: '🔷', name: 'Webflow', desc: 'Custom embed' },
  { icon: '⚡', name: 'Next.js', desc: 'Script component' },
  { icon: '💬', name: 'Slack', desc: 'Bot integration' },
  { icon: '📱', name: 'WhatsApp', desc: 'Business API' },
  { icon: '🔵', name: 'Teams', desc: 'Bot channel' },
  { icon: '📅', name: 'Calendly', desc: 'Meeting booking' },
  { icon: '⚡', name: 'Zapier', desc: '6000+ apps' },
  { icon: '🟠', name: 'HubSpot', desc: 'CRM sync' },
  { icon: '🔄', name: 'Webhooks', desc: '5 event types' },
  { icon: '🛠️', name: 'REST API', desc: 'Full control' },
];

export function IntegrationsPreview() {
  return (
    <section className="relative py-24 px-6 lg:px-8 overflow-hidden" aria-label="Integrations">
      <BackgroundBeams className="opacity-60" />

      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">20+ Integrations</SectionEyebrow>
          <SectionHeading gradient size="lg" center>
            Plug into your{' '}
            <span className="gradient-text-heading">entire stack</span>
          </SectionHeading>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            From WordPress to Salesforce — OyeChats connects to the platforms your team already uses.
          </p>
        </div>

        {/* Integration logos grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-10">
          {previewIntegrations.map((item, i) => (
            <MagicCard
              key={item.name}
              className="glass-1 rounded-2xl p-4 border border-white/8 hover:border-white/15 transition-all cursor-default group"
              gradientColor="#2563EB"
              gradientOpacity={0.12}
            >
              <div className="flex flex-col items-center gap-2 text-center" data-gsap>
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] text-white/30">{item.desc}</span>
              </div>
            </MagicCard>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButton href="/integrations" variant="ghost" size="md">
            View all 20+ integrations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
