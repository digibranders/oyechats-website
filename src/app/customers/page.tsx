import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { HomeCTA } from '@/components/home/HomeCTA';
import { ShoppingBag, Diamond, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Use Cases',
  description: 'See how e-commerce, SaaS, and agency teams use OyeChats to answer questions from their own docs, qualify leads with BANT scoring, and hand off to a human at the right moment.',
  alternates: { canonical: 'https://oyechats.com/customers' },
  openGraph: { url: 'https://oyechats.com/customers' },
};

const USE_CASES = [
  {
    audience: 'E-commerce',
    industry: 'Online stores',
    logo: ShoppingBag,
    summary:
      'Answer product, shipping, and returns questions instantly from your own docs and site content. Capture leads from visitors who are about to leave, and hand the conversation to a human the moment a sale is on the line.',
    tags: ['RAG Q&A', 'Lead Capture', 'Live Handoff'],
  },
  {
    audience: 'B2B SaaS',
    industry: 'Software teams',
    logo: Diamond,
    summary:
      'Qualify every visitor with BANT scoring, push hot leads to your team in real time via webhooks, and let prospects book a demo through Calendly without ever leaving the chat.',
    tags: ['BANT Scoring', 'Webhooks', 'Calendly'],
  },
  {
    audience: 'Agencies',
    industry: 'Multi-client teams',
    logo: Users,
    summary:
      'Run a separate bot per client, each with its own knowledge base, billing, and analytics. Remove OyeChats branding on paid plans and connect each client’s stack through webhooks and the REST API.',
    tags: ['Multi-Bot', 'Custom Branding', 'REST API'],
  },
];

export default function CustomersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-section-a pt-32 pb-16 px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.08), transparent 70%)' }} />
          <div className="mx-auto max-w-3xl relative">
            <SectionEyebrow className="mx-auto mb-4">Use Cases</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-5">
              Built for teams that turn chat into{' '}
              <span className="gradient-text-heading block">pipeline</span>
            </SectionHeading>
            <p className="text-white/50 text-lg leading-relaxed">
              OyeChats is the chat layer for teams that treat every visitor as a potential customer.
              Here’s how different teams put it to work, from answering questions to qualifying and handing off leads.
            </p>
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-section-b pt-12 pb-20 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">Who it’s for</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {USE_CASES.map((uc) => (
                <div key={uc.audience} className="glass-2 rounded-2xl border border-white/10 p-6 flex flex-col group hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl glass-1 border border-white/8 flex items-center justify-center">
                      <uc.logo className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{uc.audience}</p>
                      <p className="text-xs text-white/50">{uc.industry}</p>
                    </div>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">{uc.summary}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {uc.tags.map((t) => (
                      <span key={t} className="text-[11px] font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full px-2 py-0.5 uppercase tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-section-b"><HomeCTA /></div>
      </main>
      <Footer />
    </>
  );
}
