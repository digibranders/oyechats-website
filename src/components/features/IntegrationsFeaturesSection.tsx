import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CodeSnippet } from '@/components/shared/CodeSnippet';
import { IntegrationsNetwork } from './IntegrationsNetworkClient';

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Code snippets */}
          <div className="space-y-4">
            {Object.entries(EMBED_SAMPLES).map(([platform, { lang, code }]) => (
              <div key={platform}>
                <p className="text-xs font-semibold text-white/50 mb-2">{platform}</p>
                <CodeSnippet code={code} language={lang} />
              </div>
            ))}
          </div>

          {/* Animated network — natural square, sits open on the surface (no card chrome) */}
          <div className="flex items-center justify-center border-0 bg-transparent">
            <div className="relative w-full max-w-[500px] aspect-square border-0 bg-transparent shadow-none">
              <IntegrationsNetwork />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
