import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import Link from 'next/link';
import { Package, KeyRound, Brain, Zap, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Documentation | OyeChats',
  description: 'Everything you need to integrate and configure OyeChats on your website.',
};

interface QuickStartStep {
  icon: typeof Package;
  step: string;
  title: string;
  desc: string;
  anchor: string;
}

const QUICK_START: QuickStartStep[] = [
  {
    icon: Package,
    step: '1',
    title: 'Install the widget',
    desc: 'Add a single script tag to your site and the chat widget appears instantly.',
    anchor: '#widget',
  },
  {
    icon: KeyRound,
    step: '2',
    title: 'Get your bot key',
    desc: 'Find your unique bot key in the dashboard under Settings, Widget.',
    anchor: '#widget',
  },
  {
    icon: Brain,
    step: '3',
    title: 'Upload your docs',
    desc: 'Upload PDFs, paste URLs, or connect a sitemap. The RAG pipeline handles the rest.',
    anchor: '#api',
  },
  {
    icon: Zap,
    step: '4',
    title: 'Configure webhooks',
    desc: 'Push lead events, BANT scores, and chat transcripts to your own backend.',
    anchor: '#webhooks',
  },
];

const WIDGET_ATTRS: Array<{ attr: string; type: string; required: boolean; desc: string }> = [
  {
    attr: 'data-bot-key',
    type: 'string',
    required: true,
    desc: 'Your unique bot key from the dashboard (Settings, Widget).',
  },
];

const WEBHOOK_EVENTS: Array<{ event: string; desc: string }> = [
  { event: 'tier_transition', desc: 'Fires when a visitor crosses a qualification tier, e.g. becomes a hot lead.' },
  { event: 'lead_captured', desc: 'Fires when a visitor submits name and email via the lead form.' },
  { event: 'handoff_requested', desc: 'Fires when the visitor asks to speak with a human operator.' },
  { event: 'meeting_booked', desc: 'Fires when a visitor books a meeting via Calendly or Zcal.' },
  { event: 'chat_closed', desc: 'Fires when a chat session is closed.' },
];

const API_ENDPOINTS: Array<{ method: string; path: string; desc: string }> = [
  { method: 'GET', path: '/bots', desc: 'List all bots for your account.' },
  { method: 'GET', path: '/leads', desc: 'List captured leads with BANT scores.' },
  { method: 'GET', path: '/leads/export', desc: 'Export captured leads as CSV.' },
  { method: 'POST', path: '/ingest', desc: 'Upload a document (PDF, DOCX, TXT) to the knowledge base.' },
  { method: 'DELETE', path: '/documents/{name}', desc: 'Remove a document and its embeddings.' },
  { method: 'GET', path: '/analytics/dashboard', desc: 'Get conversation and lead metrics for a date range.' },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-emerald-300 bg-emerald-400/10 border-emerald-400/25',
  POST: 'text-blue-300 bg-blue-400/10 border-blue-400/25',
  DELETE: 'text-rose-300 bg-rose-400/10 border-rose-400/25',
};

const TOC: Array<{ anchor: string; label: string }> = [
  { anchor: '#quick-start', label: 'Quick start' },
  { anchor: '#widget', label: 'Widget setup' },
  { anchor: '#webhooks', label: 'Webhooks' },
  { anchor: '#api', label: 'REST API' },
];

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-section-a pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.10), transparent 70%)',
            }}
          />
          <div className="mx-auto max-w-3xl relative text-center">
            <SectionEyebrow className="mx-auto mb-5">Documentation</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-6">
              Everything you need to ship
            </SectionHeading>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
              From a one-line embed to full webhook pipelines. Integrate OyeChats in minutes,
              not days.
            </p>
          </div>
        </section>

        {/* ── Docs body: sticky TOC + content ─────────────── */}
        <section className="bg-section-a px-6 lg:px-8 py-16 md:py-24 relative">
          {/* Subtle divider from the hero above */}
          <div
            aria-hidden
            className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
              {/* Sticky TOC */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                    On this page
                  </p>
                  <nav className="space-y-1.5">
                    {TOC.map((item) => (
                      <a
                        key={item.anchor}
                        href={item.anchor}
                        className="block text-sm text-white/55 hover:text-blue-400 transition-colors py-1"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* Content column */}
              <div className="min-w-0 space-y-24">
                {/* ── Quick start ────────────────────────── */}
                <div id="quick-start" className="scroll-mt-28">
                  <SectionEyebrow className="mb-3">Getting started</SectionEyebrow>
                  <h2 className="font-display font-semibold text-3xl text-white mb-3">
                    Quick start
                  </h2>
                  <p className="text-white/55 mb-8 max-w-2xl">
                    Four steps from signup to a working chat widget. The whole flow takes about
                    five minutes.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {QUICK_START.map((s) => (
                      <a
                        key={s.step}
                        href={s.anchor}
                        className="glass-1 border border-white/10 rounded-2xl p-5 hover:border-blue-400/40 hover:bg-blue-500/[0.04] transition-all group"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                            <s.icon className="h-4.5 w-4.5 text-blue-400" />
                          </div>
                          <span className="text-xs font-semibold text-white/40 font-mono">
                            Step {s.step}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                          {s.title}
                        </p>
                        <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* ── Widget setup ───────────────────────── */}
                <div id="widget" className="scroll-mt-28">
                  <SectionEyebrow className="mb-3">Widget setup</SectionEyebrow>
                  <h2 className="font-display font-semibold text-3xl text-white mb-3">
                    Add the chat widget
                  </h2>
                  <p className="text-white/55 mb-8 max-w-2xl">
                    Paste the script tag before the closing{' '}
                    <code className="font-mono text-blue-300 text-xs bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded">
                      &lt;/body&gt;
                    </code>{' '}
                    tag on any HTML page.
                  </p>

                  {/* Code block */}
                  <div className="rounded-2xl border border-white/10 overflow-hidden mb-10 bg-[#0A1024]">
                    <div className="border-b border-white/8 px-5 py-3 flex items-center justify-between">
                      <span className="text-xs font-mono text-white/50">HTML</span>
                      <span className="text-xs text-white/40">Paste before &lt;/body&gt;</span>
                    </div>
                    <pre className="keep-dark p-5 text-sm font-mono text-white/80 overflow-x-auto leading-relaxed">
                      <span className="text-white/35">{`<!-- OyeChats Widget -->`}</span>{'\n'}
                      <span className="text-blue-300">{`<script`}</span>{'\n'}
                      {'  '}<span className="text-white/50">src</span>
                      <span className="text-white/40">=</span>
                      <span className="text-amber-200/90">{`"https://cdn.oyechats.com/oyechats-widget.js"`}</span>{'\n'}
                      {'  '}<span className="text-white/50">data-bot-key</span>
                      <span className="text-white/40">=</span>
                      <span className="text-amber-200/90">{`"YOUR_BOT_KEY"`}</span>{'\n'}
                      {'  '}<span className="text-white/50">defer</span>{'\n'}
                      <span className="text-blue-300">{`></script>`}</span>
                    </pre>
                  </div>

                  {/* Attributes table */}
                  <h3 className="text-base font-semibold text-white mb-2">
                    Configuration attributes
                  </h3>
                  <p className="text-sm text-white/55 mb-5 max-w-2xl leading-relaxed">
                    The script tag only needs{' '}
                    <code className="font-mono text-blue-300 text-xs bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded">
                      data-bot-key
                    </code>
                    . Everything else, launcher position, colors, auto-open, and branding
                    removal (Standard and above), is configured per bot in your dashboard.
                  </p>
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-white/[0.03] border-b border-white/10">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Attribute
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Required
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {WIDGET_ATTRS.map((a, i) => (
                          <tr
                            key={a.attr}
                            className={
                              i < WIDGET_ATTRS.length - 1 ? 'border-b border-white/[0.06]' : ''
                            }
                          >
                            <td className="px-5 py-4 font-mono text-xs text-blue-300">
                              {a.attr}
                            </td>
                            <td className="px-5 py-4 font-mono text-xs text-white/60">
                              {a.type}
                            </td>
                            <td className="px-5 py-4 text-xs">
                              {a.required ? (
                                <span className="text-emerald-300 font-semibold">Required</span>
                              ) : (
                                <span className="text-white/45">Optional</span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/55">{a.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ── Webhooks ───────────────────────────── */}
                <div id="webhooks" className="scroll-mt-28">
                  <SectionEyebrow className="mb-3">Webhooks</SectionEyebrow>
                  <h2 className="font-display font-semibold text-3xl text-white mb-3">
                    Receive real-time events
                  </h2>
                  <p className="text-white/55 mb-8 max-w-2xl">
                    Configure a webhook URL in your dashboard and OyeChats will POST a signed
                    JSON payload to your endpoint whenever these events occur.
                  </p>

                  <div className="space-y-2.5 mb-10">
                    {WEBHOOK_EVENTS.map((e) => (
                      <div
                        key={e.event}
                        className="flex items-start gap-4 glass-1 border border-white/10 rounded-xl px-5 py-4"
                      >
                        <code className="font-mono text-xs text-blue-300 bg-blue-400/10 border border-blue-400/20 px-2.5 py-1 rounded-lg shrink-0">
                          {e.event}
                        </code>
                        <p className="text-sm text-white/60 leading-relaxed">{e.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Payload example */}
                  <h3 className="text-base font-semibold text-white mb-3">
                    Example payload for{' '}
                    <span className="text-blue-300 font-mono text-sm">tier_transition</span>
                  </h3>
                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#0A1024]">
                    <div className="border-b border-white/8 px-5 py-3">
                      <span className="text-xs font-mono text-white/50">JSON</span>
                    </div>
                    <pre className="p-5 text-xs font-mono text-white/75 overflow-x-auto leading-loose">{`{
  "event": "tier_transition",
  "bot_id": 42,
  "timestamp": "2025-04-11T14:23:05Z",
  "data": {
    "session_id": "conv_8f3a2b1c",
    "lead": {
      "name": "Sarah Chen",
      "email": "sarah@acme.com"
    },
    "bant": {
      "budget": 82,
      "authority": 91,
      "need": 74,
      "timeline": 68,
      "composite": 79,
      "tier": "hot"
    }
  }
}`}</pre>
                  </div>

                  <div className="mt-5 glass-1 border border-white/10 rounded-xl px-5 py-4">
                    <p className="text-sm text-white/60 leading-relaxed">
                      Every webhook request includes an{' '}
                      <code className="font-mono text-blue-300 text-xs bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded">
                        X-OyeChats-Signature
                      </code>{' '}
                      header (HMAC-SHA256). Verify it in your handler before processing.
                    </p>
                  </div>
                </div>

                {/* ── REST API ───────────────────────────── */}
                <div id="api" className="scroll-mt-28">
                  <SectionEyebrow className="mb-3">REST API</SectionEyebrow>
                  <h2 className="font-display font-semibold text-3xl text-white mb-3">
                    Endpoints
                  </h2>
                  <p className="text-white/55 mb-2 max-w-2xl">
                    Base URL:{' '}
                    <code className="font-mono text-blue-300 text-xs bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded">
                      https://api.oyechats.com
                    </code>
                  </p>
                  <p className="text-white/55 mb-8 max-w-2xl text-sm leading-relaxed">
                    Authenticate with your API key in the{' '}
                    <code className="font-mono text-blue-300 text-xs bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded">
                      X-API-Key: &lt;key&gt;
                    </code>{' '}
                    header.
                  </p>

                  <div className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-white/[0.03] border-b border-white/10">
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider w-24">
                            Method
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Endpoint
                          </th>
                          <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {API_ENDPOINTS.map((ep, i) => (
                          <tr
                            key={ep.path}
                            className={
                              i < API_ENDPOINTS.length - 1 ? 'border-b border-white/[0.06]' : ''
                            }
                          >
                            <td className="px-5 py-4">
                              <span
                                className={`text-[11px] font-semibold font-mono border px-2 py-0.5 rounded ${METHOD_COLORS[ep.method]}`}
                              >
                                {ep.method}
                              </span>
                            </td>
                            <td className="px-5 py-4 font-mono text-xs text-white/75">
                              {ep.path}
                            </td>
                            <td className="px-5 py-4 text-sm text-white/55">{ep.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 glass-1 border border-blue-400/25 rounded-xl px-5 py-4 flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-white/60 leading-relaxed">
                      Need the full OpenAPI spec?{' '}
                      <Link
                        href="/contact"
                        className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                      >
                        Contact us
                      </Link>{' '}
                      and we&apos;ll send the YAML directly to your inbox.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Help CTA ─────────────────────────────────────── */}
        <section className="bg-section-a px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <div className="glass-2 border border-white/10 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 0% 50%, rgba(37,99,235,.10), transparent 60%)',
                }}
              />
              <div className="relative">
                <p className="font-display font-semibold text-xl text-white mb-1">
                  Need help integrating?
                </p>
                <p className="text-sm text-white/55">
                  Our team typically responds within one business day.
                </p>
              </div>
              <div className="relative flex items-center gap-3">
                <Link
                  href="/contact"
                  className="btn-filled-style px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
