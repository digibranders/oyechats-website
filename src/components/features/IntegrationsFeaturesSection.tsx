import { Globe, ShoppingBag, Layout, Zap, Component, Circle, MessageCircle, Smartphone, Users, Target, Calendar } from 'lucide-react';
import { CTAButton } from '@/components/shared/CTAButton';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CodeSnippet } from '@/components/shared/CodeSnippet';

const EMBED_SAMPLES: Record<string, { lang: string; code: string }> = {
  'Next.js': {
    lang: 'tsx',
    code: `// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script
          src="https://cdn.oyechats.com/widget.js"
          data-bot-id="YOUR_BOT_ID"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}`,
  },
  WordPress: {
    lang: 'php',
    code: `// functions.php
function oyechats_widget() {
  echo '<script
    src="https://cdn.oyechats.com/widget.js"
    data-bot-id="YOUR_BOT_ID"
    defer>
  </script>';
}
add_action('wp_footer', 'oyechats_widget');`,
  },
  HTML: {
    lang: 'html',
    code: `<!-- Before </body> -->
<script
  src="https://cdn.oyechats.com/widget.js"
  data-bot-id="YOUR_BOT_ID"
  defer>
</script>`,
  },
};

export function IntegrationsFeaturesSection() {
  return (
    <section id="feature-integrations" className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionEyebrow className="mx-auto mb-4">Integrations</SectionEyebrow>
          <SectionHeading gradient size="lg" center className="mb-4">
            Works on any website,{' '}
            <span className="gradient-text-heading">any framework</span>
          </SectionHeading>
          <p className="text-white/50 max-w-xl mx-auto">
            Add OyeChats to your site with a single script tag.
            Supports Next.js, WordPress, Shopify, Webflow, HTML, React, Vue, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Code snippets */}
          <div className="space-y-4">
            {Object.entries(EMBED_SAMPLES).map(([platform, { lang, code }]) => (
              <div key={platform}>
                <p className="text-xs font-semibold text-white/50 mb-2">{platform}</p>
                <CodeSnippet code={code} language={lang} />
              </div>
            ))}
          </div>

          {/* Platform list + CTA */}
          <div>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { icon: Globe, name: 'WordPress', color: 'text-blue-400' },
                { icon: ShoppingBag, name: 'Shopify', color: 'text-emerald-400' },
                { icon: Layout, name: 'Webflow', color: 'text-indigo-400' },
                { icon: Zap, name: 'Next.js', color: 'text-amber-400' },
                { icon: Component, name: 'Vue', color: 'text-green-400' },
                { icon: Circle, name: 'Angular', color: 'text-red-400' },
                { icon: MessageCircle, name: 'Slack', color: 'text-violet-400' },
                { icon: Smartphone, name: 'WhatsApp', color: 'text-emerald-400' },
                { icon: Users, name: 'Teams', color: 'text-blue-400' },
                { icon: Target, name: 'HubSpot', color: 'text-orange-400' },
                { icon: Zap, name: 'Zapier', color: 'text-amber-400' },
                { icon: Calendar, name: 'Calendly', color: 'text-cyan-400' },
              ].map((p) => (
                <div key={p.name} className="glass-1 rounded-xl p-3 border border-white/6 flex flex-col items-center gap-1.5 text-center cursor-pointer hover:border-white/15 transition-colors">
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                  <span className="text-[11px] text-white/55">{p.name}</span>
                </div>
              ))}
            </div>

            <CTAButton href="/integrations" variant="ghost" size="md" className="w-full justify-center">
              View all 20+ integrations
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
