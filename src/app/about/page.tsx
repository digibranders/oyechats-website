import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { HomeCTA } from '@/components/home/HomeCTA';
import {
  MessagesSquare,
  Target,
  Headphones,
  ShoppingCart,
  MapPin,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'OyeChats is the RAG-powered AI chat platform for support, sales, and live conversations. Meet the team defining how businesses answer their customers.',
  alternates: { canonical: 'https://oyechats.com/about' },
  openGraph: { url: 'https://oyechats.com/about' },
};

const HERO_STATS: Array<{ value: string; label: string }> = [
  { value: '1', label: 'Script tag to embed' },
  { value: '5 min', label: 'From signup to live bot' },
  { value: '24/7', label: 'Answers from your knowledge base' },
  { value: 'Cited', label: 'Every answer sourced from your docs' },
];

interface VisionBlock {
  icon: typeof MessagesSquare;
  title: string;
  desc: string;
  status?: 'live' | 'soon';
}

const VISION_BLOCKS: VisionBlock[] = [
  {
    icon: MessagesSquare,
    title: 'OyeChats for Support',
    desc: 'Answer questions from your docs, PDFs, and website in real time. Hybrid RAG search picks the right chunk. No hallucinations, just cited answers.',
    status: 'live',
  },
  {
    icon: Target,
    title: 'OyeChats for Sales',
    desc: 'Every conversation is a qualification opportunity. BANT tracking, lead capture, and CRM handoff, built into the same widget your visitors already trust.',
    status: 'live',
  },
  {
    icon: Headphones,
    title: 'OyeChats for Live Chat',
    desc: 'When the bot hits its limit, hand off to a human operator in the same thread. Real-time WebSocket messaging, department routing, canned replies.',
    status: 'live',
  },
  {
    icon: ShoppingCart,
    title: 'OyeChats for E-commerce',
    desc: 'Order lookups, product recommendations, and cart recovery, built for Shopify and WooCommerce. Coming in early 2027.',
    status: 'soon',
  },
];

interface Office {
  city: string;
  region: string;
  detail: string;
}

const OFFICES: Office[] = [
  {
    city: 'Thane',
    region: 'India, HQ',
    detail: 'Product, engineering, and design all under one roof.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="bg-section-a pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.10), transparent 70%)',
            }}
          />
          <div className="mx-auto max-w-5xl relative text-center">
            <SectionEyebrow className="mx-auto mb-5">About OyeChats</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-6">
              We&apos;re defining the AI era of{' '}
              <span className="gradient-text-heading block">customer conversations</span>
            </SectionHeading>
            <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto mb-14">
              OyeChats is the RAG-powered chat platform that turns your knowledge base into a
              real-time customer agent that answers questions, qualifies leads, and hands
              off to your team when the moment is right.
            </p>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {HERO_STATS.map((s) => (
                <div
                  key={s.label}
                  className="glass-1 rounded-2xl border border-white/8 px-5 py-6 text-left"
                >
                  <p className="font-display text-3xl md:text-4xl font-semibold text-white leading-none mb-2">
                    {s.value}
                  </p>
                  <p className="text-xs text-white/50 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision ─────────────────────────────────────────── */}
        <section className="bg-section-b py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Our Vision</SectionEyebrow>
              <SectionHeading size="lg" center className="mb-5">
                One agent, every customer moment
              </SectionHeading>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
                Businesses are best served by a single conversational agent with full context
                across the entire customer journey, from the first question to the qualified lead
                to the paying customer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {VISION_BLOCKS.map((block) => (
                <div
                  key={block.title}
                  className="glass-2 rounded-3xl border border-white/10 p-8 relative overflow-hidden group"
                >
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 0%, rgba(59,130,246,.10), transparent 60%)',
                    }}
                  />
                  <div className="relative flex items-start gap-5">
                    <div className="shrink-0 w-11 h-11 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                      <block.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold text-white">
                          {block.title}
                        </h3>
                        {block.status === 'soon' && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300 border border-blue-400/30 bg-blue-400/10 rounded-full px-2 py-0.5">
                            Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-white/55 leading-relaxed">{block.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offices ─────────────────────────────────────────── */}
        <section className="bg-section-a py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Where we work</SectionEyebrow>
              <SectionHeading size="lg" center className="mb-5">
                Built async, shipped weekly
              </SectionHeading>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
                A small, remote-first team. Product decisions happen in the codebase, not in
                meetings. If that&apos;s how you work best, we&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 max-w-md mx-auto">
              {OFFICES.map((office) => (
                <div
                  key={office.city}
                  className="glass-1 rounded-3xl border border-white/8 p-8"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-white mb-1">
                        {office.city}
                      </p>
                      <p className="text-xs text-white/40 uppercase tracking-wider">
                        {office.region}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{office.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-section-b">
          <HomeCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}
