import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import Link from 'next/link';
import { Package, KeyRound, Brain, Zap, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'Documentation — OyeChats',
  description: 'Everything you need to integrate and configure OyeChats on your website.',
};

const QUICK_START = [
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
    desc: 'Find your unique bot key in the dashboard under Settings → Widget.',
    anchor: '#widget',
  },
  {
    icon: Brain,
    step: '3',
    title: 'Upload your docs',
    desc: 'Upload PDFs, paste URLs, or connect a sitemap — the RAG pipeline handles the rest.',
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

const WIDGET_ATTRS = [
  { attr: 'data-bot-key', type: 'string', required: true, desc: 'Your unique bot key from the dashboard.' },
  { attr: 'data-position', type: '"bottom-right" | "bottom-left"', required: false, desc: 'Widget corner position. Default: bottom-right.' },
  { attr: 'data-primary-color', type: 'hex string', required: false, desc: 'Override the primary brand color (e.g. #2563EB).' },
  { attr: 'data-launcher-label', type: 'string', required: false, desc: 'Text shown next to the launcher button.' },
  { attr: 'data-auto-open', type: '"true" | "false"', required: false, desc: 'Open the widget automatically on page load.' },
  { attr: 'data-hide-branding', type: '"true" | "false"', required: false, desc: 'Remove "Powered by OyeChats" label (Standard+ plans).' },
];

const WEBHOOK_EVENTS = [
  { event: 'conversation.started', desc: 'Fires when a visitor opens and sends their first message.' },
  { event: 'lead.captured', desc: 'Fires when a visitor submits name/email via the lead form.' },
  { event: 'bant.scored', desc: 'Fires after a conversation is scored for Budget, Authority, Need, Timeline.' },
  { event: 'operator.requested', desc: 'Fires when the visitor asks to speak with a human.' },
  { event: 'conversation.ended', desc: 'Fires when a chat session is closed by any party.' },
];

const API_ENDPOINTS = [
  { method: 'GET', path: '/v1/conversations', desc: 'List all conversations with pagination.' },
  { method: 'GET', path: '/v1/conversations/:id', desc: 'Get a single conversation with messages.' },
  { method: 'GET', path: '/v1/leads', desc: 'List captured leads with BANT scores.' },
  { method: 'POST', path: '/v1/documents', desc: 'Upload a document to the RAG knowledge base.' },
  { method: 'DELETE', path: '/v1/documents/:id', desc: 'Remove a document from the knowledge base.' },
  { method: 'GET', path: '/v1/analytics/summary', desc: 'Get conversation and lead analytics for a date range.' },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  POST: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  DELETE: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[var(--color-bg-base)] pt-24 pb-32">
        {/* Hero */}
        <section className="px-6 lg:px-8 pt-12 pb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <SectionEyebrow className="mx-auto mb-4">Documentation</SectionEyebrow>
            <SectionHeading className="mt-4 mb-4">
              Everything you need to ship
            </SectionHeading>
            <p className="text-white/50 text-lg leading-relaxed">
              From a one-line embed to full webhook pipelines — integrate OyeChats in minutes, not days.
            </p>
          </div>
        </section>

        {/* Quick Start */}
        <section className="px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-display font-semibold text-lg text-white mb-6">Quick start</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_START.map((s) => (
                <a
                  key={s.step}
                  href={s.anchor}
                  className="glass-1 border border-white/8 rounded-2xl p-5 hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <s.icon className="h-6 w-6 text-blue-400" />
                    <span className="text-xs font-semibold text-white/45 font-mono">Step {s.step}</span>
                  </div>
                  <p className="text-sm font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">{s.title}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{s.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Widget Setup */}
        <section id="widget" className="px-6 lg:px-8 pb-20 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="border-t border-white/[0.06] pt-12">
              <SectionEyebrow>Widget Setup</SectionEyebrow>
              <h2 className="font-display font-semibold text-2xl text-white mt-3 mb-2">Add the chat widget</h2>
              <p className="text-white/45 mb-8 max-w-2xl">
                Paste the script tag before the closing <code className="font-mono text-blue-300 text-xs bg-blue-400/10 px-1.5 py-0.5 rounded">&lt;/body&gt;</code> tag on any HTML page.
              </p>

              {/* Code block */}
              <div className="rounded-2xl border border-white/8 overflow-hidden mb-8">
                <div className="bg-white/[0.03] border-b border-white/8 px-5 py-3 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50">HTML</span>
                  <span className="text-xs text-white/45">Paste before &lt;/body&gt;</span>
                </div>
                <pre className="p-5 text-sm font-mono text-white/80 overflow-x-auto leading-relaxed bg-[#010812]">
                  <span className="text-white/30">{`<!-- OyeChats Widget -->`}</span>{'\n'}
                  <span className="text-blue-300">{`<script`}</span>{'\n'}
                  {'  '}<span className="text-emerald-300">src</span><span className="text-white/60">=</span><span className="text-amber-300">{`"https://widget.oyechats.com/loader.js"`}</span>{'\n'}
                  {'  '}<span className="text-emerald-300">data-bot-key</span><span className="text-white/60">=</span><span className="text-amber-300">{`"YOUR_BOT_KEY"`}</span>{'\n'}
                  {'  '}<span className="text-emerald-300">defer</span>{'\n'}
                  <span className="text-blue-300">{`></script>`}</span>
                </pre>
              </div>

              {/* Attributes table */}
              <h3 className="text-sm font-semibold text-white mb-4">Configuration attributes</h3>
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/8">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50">Attribute</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50">Type</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50">Required</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WIDGET_ATTRS.map((a, i) => (
                      <tr key={a.attr} className={i < WIDGET_ATTRS.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                        <td className="px-5 py-3 font-mono text-xs text-blue-300">{a.attr}</td>
                        <td className="px-5 py-3 font-mono text-xs text-amber-300/70">{a.type}</td>
                        <td className="px-5 py-3 text-xs">
                          {a.required
                            ? <span className="text-emerald-400 font-semibold">Yes</span>
                            : <span className="text-white/45">No</span>}
                        </td>
                        <td className="px-5 py-3 text-xs text-white/50">{a.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section id="webhooks" className="px-6 lg:px-8 pb-20 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="border-t border-white/[0.06] pt-12">
              <SectionEyebrow>Webhooks</SectionEyebrow>
              <h2 className="font-display font-semibold text-2xl text-white mt-3 mb-2">Receive real-time events</h2>
              <p className="text-white/45 mb-8 max-w-2xl">
                Configure a webhook URL in your dashboard and OyeChats will POST a signed JSON payload to your endpoint whenever these events occur.
              </p>

              <div className="space-y-3 mb-8">
                {WEBHOOK_EVENTS.map((e) => (
                  <div key={e.event} className="flex items-start gap-4 glass-1 border border-white/8 rounded-xl px-5 py-4">
                    <code className="font-mono text-xs text-violet-300 bg-violet-400/10 border border-violet-400/20 px-2.5 py-1 rounded-lg shrink-0">{e.event}</code>
                    <p className="text-sm text-white/55">{e.desc}</p>
                  </div>
                ))}
              </div>

              {/* Payload example */}
              <h3 className="text-sm font-semibold text-white mb-4">Example payload — <span className="text-violet-300 font-mono">bant.scored</span></h3>
              <div className="rounded-2xl border border-white/8 overflow-hidden">
                <div className="bg-white/[0.03] border-b border-white/8 px-5 py-3">
                  <span className="text-xs font-mono text-white/50">JSON</span>
                </div>
                <pre className="p-5 text-xs font-mono text-white/70 overflow-x-auto leading-loose bg-[#010812]">{`{
  "event": "bant.scored",
  "timestamp": "2025-04-11T14:23:05Z",
  "conversation_id": "conv_8f3a2b1c",
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
}`}</pre>
              </div>

              <p className="mt-4 text-xs text-white/45">
                All webhook requests include an <code className="font-mono text-white/60">X-OyeChats-Signature</code> header (HMAC-SHA256). Verify this in your handler before processing.
              </p>
            </div>
          </div>
        </section>

        {/* API Reference */}
        <section id="api" className="px-6 lg:px-8 pb-20 scroll-mt-24">
          <div className="mx-auto max-w-7xl">
            <div className="border-t border-white/[0.06] pt-12">
              <SectionEyebrow>API Reference</SectionEyebrow>
              <h2 className="font-display font-semibold text-2xl text-white mt-3 mb-2">REST API</h2>
              <p className="text-white/45 mb-2 max-w-2xl">
                Base URL: <code className="font-mono text-blue-300 text-xs bg-blue-400/10 px-1.5 py-0.5 rounded">https://api.oyechats.com</code>
              </p>
              <p className="text-white/45 mb-8 max-w-2xl text-sm">
                Authenticate with your API key in the <code className="font-mono text-white/60 text-xs">Authorization: Bearer &lt;key&gt;</code> header.
              </p>

              <div className="rounded-2xl border border-white/8 overflow-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-white/[0.03] border-b border-white/8">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 w-20">Method</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50 w-72">Endpoint</th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-white/50">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {API_ENDPOINTS.map((ep, i) => (
                      <tr key={ep.path} className={i < API_ENDPOINTS.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                        <td className="px-5 py-3">
                          <span className={`text-xs font-semibold font-mono border px-2 py-0.5 rounded ${METHOD_COLORS[ep.method]}`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-white/70">{ep.path}</td>
                        <td className="px-5 py-3 text-xs text-white/50">{ep.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 glass-1 border border-blue-500/20 rounded-xl px-5 py-4 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-blue-400 shrink-0" />
                <p className="text-sm text-white/55">
                  Need a full OpenAPI spec?{' '}
                  <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors">
                    Contact us
                  </Link>{' '}
                  — we&apos;ll send the YAML directly to your inbox.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Help CTA */}
        <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="glass-2 border border-white/8 rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-display font-semibold text-lg text-white mb-1">Need help integrating?</p>
                <p className="text-sm text-white/45">Our team responds within 2 hours on business days.</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-colors cursor-pointer"
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
