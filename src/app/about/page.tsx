import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { HomeCTA } from '@/components/home/HomeCTA';
import { Crosshair, Search, Zap, Handshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind OyeChats, the RAG-powered AI chatbot and sales intelligence platform built to convert visitors into qualified pipeline.',
  alternates: { canonical: 'https://oyechats.com/about' },
  openGraph: { url: 'https://oyechats.com/about' },
};

const VALUES = [
  { icon: Crosshair, title: 'Sales-first AI', desc: 'We build AI that converts, not just answers. Every feature ties back to pipeline.' },
  { icon: Search, title: 'Radical transparency', desc: 'No black-box AI. Every BANT signal is explainable. Every AI decision is auditable.' },
  { icon: Zap, title: 'Speed over perfection', desc: 'Ship fast. Learn from real users. Iterate weekly. Our changelog proves it.' },
  { icon: Handshake, title: 'Customer obsession', desc: 'Our paying customers have a direct line to our team. Always.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.08), transparent 70%)' }} />
          <div className="mx-auto max-w-3xl relative">
            <SectionEyebrow className="mx-auto mb-4">Our Story</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-5">
              Built by sales people,{' '}
              <span className="gradient-text-heading block">for sales teams</span>
            </SectionHeading>
            <p className="text-white/50 text-lg leading-relaxed max-w-2xl mx-auto">
              OyeChats was born from frustration. After watching millions of website visitors bounce
              without converting, we built the AI chat platform we always wanted, one that qualifies
              leads, hands off to humans at the right moment, and integrates with the tools you already use.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-section-b py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="glass-2 rounded-3xl border border-white/10 p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(37,99,235,.06), transparent 70%)' }} />
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">Our Mission</p>
              <p className="font-display text-2xl lg:text-3xl font-semibold text-white leading-snug max-w-2xl mx-auto relative">
                &quot;Make every website visitor a potential customer, through AI that understands,
                qualifies, and connects in real time.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-section-a py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">What we believe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map((v) => (
                <div key={v.title} className="glass-1 rounded-2xl border border-white/8 p-6 flex items-start gap-4">
                  <v.icon className="h-6 w-6 text-blue-400 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{v.title}</p>
                    <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers */}
        <section className="bg-section-a py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-semibold text-white mb-4">Join the team</h2>
            <p className="text-white/50 mb-8">
              We&apos;re a small, remote-first team building AI for sales. If that sounds like your kind of
              problem, we&apos;d love to hear from you.
            </p>
            <CTAButton href="/contact?intent=careers" variant="ghost" size="lg">
              View open roles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </CTAButton>
          </div>
        </section>

        <div className="bg-section-b"><HomeCTA /></div>
      </main>
      <Footer />
    </>
  );
}
