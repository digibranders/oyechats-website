import {
  siWordpress, siShopify, siWebflow, siNextdotjs, siHtml5, siVuedotjs, siReact, siFramer,
  siCalendly,
  type SimpleIcon,
} from 'simple-icons';
import { CTAButton } from '@/components/shared/CTAButton';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CodeSnippet } from '@/components/shared/CodeSnippet';

type BrandSvgProps = { icon: SimpleIcon; overrideColor?: string };

function BrandSvg({ icon, overrideColor }: BrandSvgProps) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill={overrideColor ?? `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
}

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
            Works on Next.js, WordPress, Shopify, Webflow, plain HTML, Vue, and more.
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
                { name: 'WordPress', node: <BrandSvg icon={siWordpress} /> },
                { name: 'Shopify',   node: <BrandSvg icon={siShopify} /> },
                { name: 'Webflow',   node: <BrandSvg icon={siWebflow} /> },
                { name: 'Next.js',   node: <BrandSvg icon={siNextdotjs} overrideColor="#FFFFFF" /> },
                { name: 'HTML',      node: <BrandSvg icon={siHtml5} /> },
                { name: 'Vue.js',    node: <BrandSvg icon={siVuedotjs} /> },
                { name: 'React',     node: <BrandSvg icon={siReact} /> },
                { name: 'Framer',    node: <BrandSvg icon={siFramer} overrideColor="#FFFFFF" /> },
                { name: 'Calendly',  node: <BrandSvg icon={siCalendly} /> },
              ].map((p) => (
                <div key={p.name} className="glass-1 rounded-xl p-3 border border-white/6 flex flex-col items-center gap-1.5 text-center cursor-pointer hover:border-white/15 transition-colors">
                  {p.node}
                  <span className="text-[11px] text-white/55">{p.name}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-start-2">
                <CTAButton href="/integrations" variant="ghost" size="md" className="w-full justify-center">
                  View all integrations
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
