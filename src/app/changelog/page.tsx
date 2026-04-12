import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'OyeChats product updates and release notes — new features, improvements, and fixes across every version.',
  alternates: { canonical: 'https://oyechats.com/changelog' },
  openGraph: { url: 'https://oyechats.com/changelog' },
};

const CHANGELOG = [
  {
    version: 'v2.4.0',
    date: 'March 2025',
    tag: 'Major Release',
    tagColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    changes: [
      { type: 'new', text: 'BANT scoring engine with 4-criteria real-time analysis' },
      { type: 'new', text: 'Behavioral tracking: rage clicks, scroll depth, exit intent' },
      { type: 'new', text: 'Operator departments with smart routing rules' },
      { type: 'improved', text: 'Hybrid search (RRF) now 40% more accurate on domain-specific queries' },
      { type: 'improved', text: 'Widget load time reduced to under 100ms via edge CDN' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'February 2025',
    tag: 'Feature',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    changes: [
      { type: 'new', text: 'Calendly integration for in-chat meeting booking' },
      { type: 'new', text: 'WhatsApp Business API integration' },
      { type: 'new', text: 'Webhook delivery log with retry visualization' },
      { type: 'fixed', text: 'Multi-turn context window not respecting token budget on GPT-4o' },
    ],
  },
  {
    version: 'v2.2.1',
    date: 'January 2025',
    tag: 'Patch',
    tagColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    changes: [
      { type: 'fixed', text: 'Shopify embed script conflicting with theme lazy-load' },
      { type: 'fixed', text: 'Lead export CSV missing UTM columns' },
      { type: 'improved', text: 'AI observability tracing now captures full prompt + completion tokens' },
    ],
  },
  {
    version: 'v2.2.0',
    date: 'December 2024',
    tag: 'Feature',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    changes: [
      { type: 'new', text: 'Zapier and Make (Integromat) native integrations' },
      { type: 'new', text: 'HubSpot CRM sync — leads auto-created on tier change' },
      { type: 'new', text: 'Canned responses with variable substitution' },
      { type: 'improved', text: 'Analytics dashboard redesigned with BANT tier donut chart' },
    ],
  },
  {
    version: 'v2.1.0',
    date: 'November 2024',
    tag: 'Feature',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    changes: [
      { type: 'new', text: 'Multi-model support — 50+ AI providers now available on Enterprise' },
      { type: 'new', text: 'AI observability dashboard for Enterprise tier' },
      { type: 'new', text: 'Web crawling for automatic knowledge base updates' },
      { type: 'improved', text: 'Vector search engine upgraded — 2× faster similarity retrieval' },
    ],
  },
];

const TYPE_STYLES: Record<string, string> = {
  new: 'text-blue-400 bg-blue-400/10',
  improved: 'text-emerald-400 bg-emerald-400/10',
  fixed: 'text-amber-400 bg-amber-400/10',
  deprecated: 'text-red-400 bg-red-400/10',
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Changelog</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                What's new in{' '}
                <span className="gradient-text-heading">OyeChats</span>
              </SectionHeading>
              <p className="text-white/50">We ship fast. New features, improvements, and fixes every two weeks.</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-blue-600/60 via-white/10 to-transparent ml-3" />

              <div className="space-y-10 pl-10">
                {CHANGELOG.map((entry) => (
                  <div key={entry.version} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-10 top-1 h-2.5 w-2.5 rounded-full bg-blue-500 border-2 border-[#030D1F] shadow-[0_0_8px_rgba(37,99,235,.6)]" />

                    <div className="glass-1 rounded-2xl border border-white/8 p-6">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="font-display font-bold text-white text-lg">{entry.version}</span>
                        <span className={cn('text-[10px] font-semibold uppercase tracking-wide rounded-full border px-2.5 py-1', entry.tagColor)}>
                          {entry.tag}
                        </span>
                        <span className="text-xs text-white/30 ml-auto">{entry.date}</span>
                      </div>

                      <ul className="space-y-2.5">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={cn('text-[9px] font-bold uppercase tracking-widest rounded px-1.5 py-0.5 shrink-0 mt-0.5', TYPE_STYLES[change.type])}>
                              {change.type}
                            </span>
                            <span className="text-sm text-white/65">{change.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
