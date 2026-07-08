import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'OyeChats product updates and release notes. New features, improvements, and fixes shipped every two weeks.',
  alternates: { canonical: 'https://oyechats.com/changelog' },
  openGraph: { url: 'https://oyechats.com/changelog' },
};

type Accent = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose';

type Entry = {
  id: string;
  date: string;
  version: string;
  tags: string[];
  title: string;
  description: string;
  author: { name: string; initials: string };
  accent: Accent;
  glyph: React.ReactNode;
  href?: string;
};

const ACCENT: Record<Accent, { bg: string; ring: string; pill: string; text: string; glow: string }> = {
  blue: {
    bg: 'from-blue-500/25 via-blue-500/5 to-transparent',
    ring: 'ring-blue-400/30',
    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    text: 'text-blue-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(59,130,246,0.35)]',
  },
  violet: {
    bg: 'from-violet-500/25 via-violet-500/5 to-transparent',
    ring: 'ring-violet-400/30',
    pill: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
    text: 'text-violet-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(139,92,246,0.35)]',
  },
  emerald: {
    bg: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
    ring: 'ring-emerald-400/30',
    pill: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    text: 'text-emerald-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(52,211,153,0.35)]',
  },
  amber: {
    bg: 'from-amber-500/25 via-amber-500/5 to-transparent',
    ring: 'ring-amber-400/30',
    pill: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    text: 'text-amber-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(251,191,36,0.35)]',
  },
  rose: {
    bg: 'from-rose-500/25 via-rose-500/5 to-transparent',
    ring: 'ring-rose-400/30',
    pill: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    text: 'text-rose-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(244,63,94,0.35)]',
  },
};

const ENTRIES: Entry[] = [
  {
    id: 'auto-recrawl',
    date: 'July 7, 2026',
    version: 'v3.2.0',
    tags: ['New feature', 'Knowledge base'],
    title: 'Auto-recrawl keeps your knowledge base fresh, automatically',
    description:
      'Standard-tier bots now refresh their knowledge base on a schedule. Point OyeChats at a URL once and we re-crawl it in the background whenever your docs, product pages, or pricing change. No more stale answers, no more manual re-uploads.',
    author: { name: 'OyeChats Team', initials: 'OC' },
    accent: 'blue',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <path d="M21 12a9 9 0 11-3-6.7M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'crawler-youtube-docs',
    date: 'July 2, 2026',
    version: 'v3.2.0',
    tags: ['Improved', 'Crawler'],
    title: 'The crawler now understands YouTube and linked downloadables',
    description:
      'Point OyeChats at any page and it pulls in YouTube transcripts and linked PDFs, DOCX, and TXT files inline with the source. One URL, one crawl, richer context, more accurate answers.',
    author: { name: 'Steve · Ingestion', initials: 'ST' },
    accent: 'violet',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'billing-tab',
    date: 'June 24, 2026',
    version: 'v3.1.0',
    tags: ['New feature', 'Billing'],
    title: 'Billing moves into its own tab, with the right currency from day one',
    description:
      'Billing is now a dedicated tab, decoupled from account settings. We capture your billing country at signup and every price you see (seats, plans, top-ups, invoices) renders in your local currency from the very first load.',
    author: { name: 'OyeChats Team', initials: 'OC' },
    accent: 'emerald',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
        <path d="M2.5 10h19" />
        <circle cx="7" cy="14.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'currency-context',
    date: 'June 18, 2026',
    version: 'v3.1.0',
    tags: ['Improved', 'Billing'],
    title: 'A global currency context, everywhere at once',
    description:
      'The seat modal, plan picker, top-up flow, and invoices all read from a single CurrencyContext now. Switch billing country and every price in the app updates instantly. No reloads, no mismatched totals at checkout.',
    author: { name: 'Billing Squad', initials: 'BS' },
    accent: 'emerald',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9a3 3 0 00-3-3 3 3 0 000 6 3 3 0 010 6 3 3 0 01-3-3M12 5v2M12 17v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'security-hardening',
    date: 'May 30, 2026',
    version: 'v3.0.1',
    tags: ['Security', 'Improved'],
    title: 'A quiet security pass across the whole platform',
    description:
      'Centralized SSRF guard on the crawler and demo preview. Non-root systemd services with unit-level sandboxing. CI actions pinned to commit SHAs. API docs gated in production, WebSocket file events rate-limited, and web push with a hard timeout. Nothing you have to configure. It just runs safer.',
    author: { name: 'Security Team', initials: 'SC' },
    accent: 'rose',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'auth-hardening',
    date: 'May 12, 2026',
    version: 'v3.0.1',
    tags: ['Fixed', 'Security'],
    title: 'Strict auth on every account-credential endpoint',
    description:
      'The /settings, /upload-logo, and account-credential endpoints now require a valid X-API-Key. No more soft auth paths. Live-chat sessions restored from the database are correctly tenant-scoped on reconnect, and operator presence has a database fallback when Redis is down.',
    author: { name: 'Security Team', initials: 'SC' },
    accent: 'rose',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
        <circle cx="12" cy="15" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'live-chat-ga',
    date: 'April 15, 2026',
    version: 'v3.0.0',
    tags: ['New feature', 'Live chat'],
    title: 'Live chat handoff, now generally available',
    description:
      'Visitors can hand off from the bot to a real human at any point, with department routing, canned responses, and a post-chat rating. Operator presence is Redis-backed with automatic database fallback, so nobody drops off the queue when infrastructure hiccups.',
    author: { name: 'OyeChats Team', initials: 'OC' },
    accent: 'violet',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <path d="M4 6h16v10H8l-4 4V6z" strokeLinejoin="round" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'auto-rollback',
    date: 'April 3, 2026',
    version: 'v3.0.0',
    tags: ['Improved', 'Infrastructure'],
    title: 'Auto-rollback on failed post-deploy health checks',
    description:
      'A bad release no longer needs a human in the loop. If a deploy fails its health check, the API rolls back to the previous known-good release automatically. Renewal cron and invoice-email workers isolate per-record failures so one bad account never stalls the batch.',
    author: { name: 'Platform Team', initials: 'PL' },
    accent: 'blue',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <path d="M3 12a9 9 0 019-9c4 0 7 2 8.5 5" strokeLinecap="round" />
        <path d="M21 3v5h-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4l3 2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bant-scoring',
    date: 'March 20, 2026',
    version: 'v2.4.0',
    tags: ['New feature', 'Analytics'],
    title: 'BANT scoring, built into every conversation',
    description:
      'OyeChats now scores every conversation on Budget, Authority, Need, and Timing, automatically. Combined with visitor context (pages viewed, return visits, UTM, device), sales sees a qualified lead the moment intent shows up, without asking a single form question.',
    author: { name: 'OyeChats Team', initials: 'OC' },
    accent: 'amber',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <path d="M4 20V10M10 20V4M16 20v-8M22 20H2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'hybrid-search',
    date: 'March 5, 2026',
    version: 'v2.4.0',
    tags: ['Improved', 'RAG'],
    title: 'Hybrid retrieval, tighter answers',
    description:
      'Reciprocal rank fusion now blends semantic similarity with keyword TSVECTOR search. Answers stay grounded in your docs even when the visitor uses acronyms, product codes, or phrasing your knowledge base never anticipated.',
    author: { name: 'AI Team', initials: 'AI' },
    accent: 'violet',
    glyph: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4.5-4.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-14 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow className="mx-auto mb-4">Changelog</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-4">
              What&apos;s new in{' '}
              <span className="gradient-text-heading">OyeChats</span>
            </SectionHeading>
            <p className="text-white/55 text-base">
              Weekly product updates for the OyeChats platform, widget, and admin. New features, improvements, and fixes as they ship.
            </p>
          </div>
        </section>

        <section className="bg-section-a pb-32 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-10">
            {ENTRIES.map((entry) => {
              const a = ACCENT[entry.accent];
              return (
                <article
                  key={entry.id}
                  id={entry.id}
                  className="group glass-1 rounded-3xl border border-white/8 overflow-hidden transition-all hover:border-white/15"
                >
                  {/* Hero visual */}
                  <div
                    className={cn(
                      'relative h-56 sm:h-64 border-b border-white/[.06] overflow-hidden',
                      'bg-gradient-to-br',
                      a.bg
                    )}
                  >
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                      }}
                      aria-hidden
                    />
                    {/* Radial vignette */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'radial-gradient(120% 80% at 50% 100%, rgba(3,13,31,0) 0%, rgba(3,13,31,0.55) 100%)' }}
                      aria-hidden
                    />

                    {/* Version watermark */}
                    <span
                      className="absolute -bottom-4 -right-2 font-display font-bold text-white/[.04] select-none"
                      style={{ fontSize: 'clamp(6rem, 14vw, 10rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
                      aria-hidden
                    >
                      {entry.version}
                    </span>

                    {/* Center glyph */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={cn(
                          'flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md ring-1',
                          a.ring,
                          a.glow,
                          a.text
                        )}
                      >
                        <div className="h-9 w-9">{entry.glyph}</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {entry.tags.map((tag, i) => (
                        <span
                          key={tag}
                          className={cn(
                            'text-[11px] font-medium tracking-wide rounded-full border px-2.5 py-1',
                            i === 0
                              ? a.pill
                              : 'bg-white/5 text-white/60 border-white/10'
                          )}
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-[11px] text-white/40 ml-auto">{entry.version}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-display font-semibold text-white text-xl sm:text-2xl leading-snug mb-3 tracking-tight">
                      {entry.title}
                    </h2>

                    {/* Description */}
                    <p className="text-[15px] text-white/65 leading-relaxed mb-6">
                      {entry.description}
                    </p>

                    {/* Meta row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[.06]">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold border',
                            'bg-white/5 border-white/10 text-white/80'
                          )}
                        >
                          {entry.author.initials}
                        </div>
                        <div className="text-xs">
                          <div className="text-white/75 font-medium">{entry.author.name}</div>
                          <div className="text-white/40">{entry.date}</div>
                        </div>
                      </div>

                      <Link
                        href={entry.href ?? `#${entry.id}`}
                        className={cn(
                          'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
                          a.text,
                          'hover:text-white'
                        )}
                      >
                        Learn more
                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mx-auto max-w-3xl mt-14 text-center">
            <p className="text-sm text-white/45">
              Want updates in your inbox?{' '}
              <Link href="/#newsletter" className="text-blue-300 hover:text-white transition-colors">
                Subscribe to the release digest
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
