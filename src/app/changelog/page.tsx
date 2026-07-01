import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'OyeChats product updates and release notes, new features, improvements, and fixes across every version.',
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
      { type: 'new', text: 'BANT scoring engine with four-dimension conversation analysis' },
      { type: 'new', text: 'Visitor context: pages viewed, return visits, time on site, UTM & device capture' },
      { type: 'new', text: 'Operator departments with routing rules (least-busy, round-robin)' },
      { type: 'improved', text: 'Hybrid search (RRF) blends semantic + keyword retrieval for grounded answers' },
      { type: 'improved', text: 'Widget loader trimmed to ~1.3 KB gzipped with Shadow DOM isolation' },
    ],
  },
  {
    version: 'v2.3.0',
    date: 'February 2025',
    tag: 'Feature',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    changes: [
      { type: 'new', text: 'Calendly and Zcal booking for in-chat meeting scheduling' },
      { type: 'new', text: 'Outbound webhooks with 5 event types and HMAC-SHA256 signing' },
      { type: 'new', text: 'Webhook delivery log with retry history in the dashboard' },
      { type: 'fixed', text: 'Multi-turn context window not respecting the token budget' },
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
      { type: 'new', text: 'Outbound webhooks to connect Zapier, Make, and your own stack' },
      { type: 'new', text: 'Email lead alerts and conversation summaries on tier change' },
      { type: 'new', text: 'Canned responses for operators' },
      { type: 'improved', text: 'Analytics dashboard with BANT tier distribution and qualification funnel' },
    ],
  },
  {
    version: 'v2.1.0',
    date: 'November 2024',
    tag: 'Feature',
    tagColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    changes: [
      { type: 'new', text: 'Automatic model fallback (primary + fallback provider) via LiteLLM' },
      { type: 'new', text: 'AI observability dashboard for the Enterprise tier' },
      { type: 'new', text: 'Website crawling for automatic knowledge base updates' },
      { type: 'improved', text: 'pgvector-backed similarity search with hybrid keyword fusion' },
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
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Changelog</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                What&apos;s new in{' '}
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
                        <span className={cn('text-[11px] font-semibold uppercase tracking-wide rounded-full border px-2.5 py-1', entry.tagColor)}>
                          {entry.tag}
                        </span>
                        <span className="text-xs text-white/45 ml-auto">{entry.date}</span>
                      </div>

                      <ul className="space-y-2.5">
                        {entry.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={cn('text-[11px] font-bold uppercase tracking-widest rounded px-1.5 py-0.5 shrink-0 mt-0.5', TYPE_STYLES[change.type])}>
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
