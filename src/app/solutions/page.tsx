import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { cn } from '@/lib/utils';
import {
  Headphones,
  Target,
  BookOpen,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Solutions for the teams and workflows OyeChats was built for. Customer support, sales lead gen, docs assistants, and live chat handoff.',
  alternates: { canonical: 'https://oyechats.com/solutions' },
  openGraph: { url: 'https://oyechats.com/solutions' },
};

type Accent = 'blue' | 'violet' | 'emerald' | 'amber' | 'rose' | 'sky';

const ACCENT: Record<Accent, { pill: string; text: string; ring: string; bg: string; dot: string }> = {
  blue: {
    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/25',
    text: 'text-blue-300',
    ring: 'ring-blue-400/30',
    bg: 'from-blue-500/20 via-blue-500/5 to-transparent',
    dot: 'bg-blue-400',
  },
  violet: {
    pill: 'bg-violet-400/10 text-violet-300 border-violet-400/25',
    text: 'text-violet-300',
    ring: 'ring-violet-400/30',
    bg: 'from-violet-500/20 via-violet-500/5 to-transparent',
    dot: 'bg-violet-400',
  },
  emerald: {
    pill: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
    text: 'text-emerald-300',
    ring: 'ring-emerald-400/30',
    bg: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    dot: 'bg-emerald-400',
  },
  amber: {
    pill: 'bg-amber-400/10 text-amber-300 border-amber-400/25',
    text: 'text-amber-300',
    ring: 'ring-amber-400/30',
    bg: 'from-amber-500/20 via-amber-500/5 to-transparent',
    dot: 'bg-amber-400',
  },
  rose: {
    pill: 'bg-rose-400/10 text-rose-300 border-rose-400/25',
    text: 'text-rose-300',
    ring: 'ring-rose-400/30',
    bg: 'from-rose-500/20 via-rose-500/5 to-transparent',
    dot: 'bg-rose-400',
  },
  sky: {
    pill: 'bg-sky-400/10 text-sky-300 border-sky-400/25',
    text: 'text-sky-300',
    ring: 'ring-sky-400/30',
    bg: 'from-sky-500/20 via-sky-500/5 to-transparent',
    dot: 'bg-sky-400',
  },
};

type Solution = {
  id: string;
  category: string;
  title: string;
  intro: string;
  body: string[];
  bullets: string[];
  outcome: { metric: string; label: string };
  icon: LucideIcon;
  accent: Accent;
};

const SOLUTIONS: Solution[] = [
  {
    id: 'customer-support',
    category: 'Customer Support',
    title: 'Cut ticket volume without cutting quality',
    intro:
      'Turn your help center, product docs, and past tickets into a bot that answers on the first message, day or night.',
    body: [
      'The vast majority of inbound tickets are questions your team has already answered somewhere. OyeChats reads your entire knowledge base, retrieves the right snippet in real time, and responds in your brand voice with a citation the visitor can trust.',
      'When the question needs a human, the bot hands off with the full transcript, the pages the visitor was looking at, and a suggested department. Nobody starts from scratch.',
    ],
    bullets: [
      'Answer FAQs 24/7 from your docs, no scripts to maintain',
      'Automatic ticket deflection with a live human fallback',
      'Post-chat survey with a 1 to 5 rating stored per session',
    ],
    outcome: { metric: 'Up to 60%', label: 'of routine tickets deflected' },
    icon: Headphones,
    accent: 'blue',
  },
  {
    id: 'sales-lead-gen',
    category: 'Sales and Lead Gen',
    title: 'Qualify every visitor, without a single form question',
    intro:
      'OyeChats scores each conversation on Budget, Authority, Need, and Timing, so your sales team only talks to leads worth talking to.',
    body: [
      'Instead of hiding behind a contact form, meet the visitor in a chat that already sounds like a discovery call. The bot listens for BANT signals inside the natural conversation and grades the lead in the background.',
      'A hot lead is routed to a live rep the moment intent shows up. A warm lead lands in a nurture sequence with a follow up email and a calendar link. A cold visitor keeps chatting, and every message adds to the profile.',
    ],
    bullets: [
      'Automatic BANT scoring across every session',
      'Instant handoff to a live operator when a lead scores hot',
      'Lead capture with name, email, phone, and company fields',
      'Calendly and CRM webhooks for zero-touch follow up',
    ],
    outcome: { metric: 'Up to 3.4x', label: 'more qualified leads per visitor' },
    icon: Target,
    accent: 'amber',
  },
  {
    id: 'docs-assistant',
    category: 'Docs Assistant',
    title: 'Turn every doc into a chat interface',
    intro:
      'Point OyeChats at a docs site, a Notion workspace, or a folder of PDFs. Ship an in-product assistant that always cites its source.',
    body: [
      'Developers and end users rarely read docs top to bottom. They arrive with a question and want an answer with a link they can trust. OyeChats does exactly that. Hybrid retrieval blends vector similarity with keyword search so acronyms, error codes, and product names always land on the right page.',
      'When your docs change, the recrawl runs on a schedule. The bot stays fresh without a rebuild.',
    ],
    bullets: [
      'Ingests PDF, DOCX, TXT, and any crawlable URL',
      'Hybrid search over vector plus TSVECTOR keyword index',
      'Every answer links back to the source doc',
      'Scheduled auto-recrawl keeps the knowledge base current',
    ],
    outcome: { metric: 'Typically <5s', label: 'to a cited answer' },
    icon: BookOpen,
    accent: 'violet',
  },
  {
    id: 'live-chat-handoff',
    category: 'Live Chat Handoff',
    title: 'A real human, exactly when it matters',
    intro:
      'Bot first, human second. When a visitor wants to talk to someone, OyeChats routes them to the right department in seconds.',
    body: [
      'Not every visitor should end at the bot. High intent buyers, angry customers, and edge case questions belong with a person. OyeChats knows when to escalate, and hands off with the full transcript, the visitor profile, and the recommended department.',
      'Operators work from a full inbox with canned responses, transfers, and a rating survey at the end of every chat.',
    ],
    bullets: [
      'One-click bot to human handoff, with transcript context',
      'Department routing and load balancing across operators',
      'Canned responses with keyboard shortcuts like /hello',
      'Post-chat rating from 1 to 5 stars, stored per session',
    ],
    outcome: { metric: 'Typically <25s', label: 'to reach a human' },
    icon: MessageCircle,
    accent: 'rose',
  },
];

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-16 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <SectionEyebrow className="mx-auto mb-4">Solutions</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-5">
              Workflows that drive{' '}
              <span className="gradient-text-heading">real business outcomes</span>
            </SectionHeading>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              OyeChats adapts to your use case. Choose a workflow, and let AI handle the conversations that matter.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <CTAButton href="/pricing" variant="filled" size="md">
                See pricing
              </CTAButton>
              <CTAButton href="/contact" variant="ghost" size="md">
                Talk to sales
              </CTAButton>
            </div>
          </div>

          <div className="mx-auto max-w-5xl mt-16">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[.22em] text-white/40 mb-5">
              <span className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-white/20" aria-hidden />
                Jump to a workflow
                <span className="h-px w-6 bg-white/20" aria-hidden />
              </span>
            </p>

            <div className="relative mx-auto w-fit max-w-full">
              <div
                className="pointer-events-none absolute -inset-x-6 -inset-y-3 rounded-[999px] opacity-60 blur-3xl"
                style={{
                  background:
                    'radial-gradient(60% 100% at 50% 50%, rgba(59,130,246,0.18) 0%, rgba(139,92,246,0.12) 40%, rgba(244,63,94,0.10) 75%, transparent 100%)',
                }}
                aria-hidden
              />

              <nav
                aria-label="Workflow anchor navigation"
                className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[.03] backdrop-blur-xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] sm:flex-row sm:rounded-full"
              >
                {SOLUTIONS.map((s, i) => {
                  const a = ACCENT[s.accent];
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.id}
                      href={`#${s.id}`}
                      className={cn(
                        'group relative flex items-center justify-center gap-2.5 px-5 py-3 text-[13px] font-medium text-white/75 transition-all duration-300 hover:text-white sm:justify-start sm:whitespace-nowrap',
                        i > 0 && 'border-t border-white/[.06] sm:border-l sm:border-t-0'
                      )}
                    >
                      <span
                        className={cn(
                          'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r',
                          a.bg
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          'relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[.05] ring-1 transition-transform duration-300 group-hover:scale-110',
                          a.ring,
                          a.text
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </span>
                      <span className="relative">{s.category}</span>
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        className="relative h-3.5 w-3.5 shrink-0 text-white/35 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white/90"
                        aria-hidden
                      >
                        <path
                          d="M6 4l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </section>

        {SOLUTIONS.map((s, index) => {
          const a = ACCENT[s.accent];
          const Icon = s.icon;
          const isEven = index % 2 === 0;
          return (
            <section
              id={s.id}
              key={s.id}
              className={cn(
                'scroll-mt-24 px-6 lg:px-8 py-24 border-t border-white/[.06]',
                isEven ? 'bg-section-b' : 'bg-section-a'
              )}
            >
              <div className="mx-auto max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md ring-1',
                      a.ring,
                      a.text
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                      a.pill
                    )}
                  >
                    {s.category}
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-tight tracking-tight mb-5">
                  {s.title}
                </h2>

                <p className="text-white/70 text-lg leading-relaxed mb-5">{s.intro}</p>

                {s.body.map((p, i) => (
                  <p key={i} className="text-white/60 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}

                <ul className="mt-6 space-y-2.5">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-white/75 text-[15px]">
                      <span className={cn('mt-2 h-1.5 w-1.5 rounded-full shrink-0', a.dot)} aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] px-5 py-4">
                  <div className={cn('font-display text-2xl font-semibold tracking-tight whitespace-nowrap', a.text)}>
                    {s.outcome.metric}
                  </div>
                  <div className="h-8 w-px bg-white/10" aria-hidden />
                  <div className="text-sm text-white/65 leading-tight">{s.outcome.label}</div>
                </div>
              </div>
            </section>
          );
        })}

        <section className="bg-section-a px-6 lg:px-8 py-24 border-t border-white/[.06]">
          <div className="mx-auto max-w-3xl text-center">
            <SectionEyebrow className="mx-auto mb-4">Get started</SectionEyebrow>
            <SectionHeading gradient size="lg" center className="mb-5">
              Pick a solution,{' '}
              <span className="gradient-text-heading">ship it this week</span>
            </SectionHeading>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Every OyeChats bot starts free. Upload your docs, embed one script tag, and go live in under five minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <CTAButton href="/pricing" variant="filled" size="md">
                See pricing
              </CTAButton>
              <CTAButton href="/docs" variant="ghost" size="md">
                Read the docs
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
