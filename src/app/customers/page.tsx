import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';

export const metadata: Metadata = {
  title: 'Customers',
  description: 'See how e-commerce, SaaS, and agency teams use OyeChats to qualify leads automatically and reduce support ticket volume.',
  alternates: { canonical: 'https://oyechats.com/customers' },
  openGraph: { url: 'https://oyechats.com/customers' },
};
import { HomeCTA } from '@/components/home/HomeCTA';
import { testimonials } from '@/lib/testimonials';
import { AnimatedSeparator } from '@/components/shared/AnimatedSeparator';

const CASE_STUDIES = [
  {
    company: 'ShopNova',
    industry: 'E-commerce',
    logo: '🛍️',
    metric: '+68%',
    metricLabel: 'Checkout conversion',
    summary: 'ShopNova deployed OyeChats on their checkout page. The bot proactively handled shipping anxiety questions and captured emails from abandoning visitors, boosting checkout conversion by 68% in 30 days.',
    tags: ['BANT Scoring', 'Behavioral Tracking', 'Shopify'],
  },
  {
    company: 'Nexus SaaS',
    industry: 'B2B SaaS',
    logo: '🔷',
    metric: '3.2×',
    metricLabel: 'Demo bookings',
    summary: 'Nexus integrated Calendly booking directly in their AI chat. Visitors that scored Hot on BANT were instantly offered a demo time without leaving the page, tripling their demo booking rate.',
    tags: ['Calendly', 'BANT', 'Live Chat Handoff'],
  },
  {
    company: 'FinCore',
    industry: 'Fintech',
    logo: '💰',
    metric: '-74%',
    metricLabel: 'Support ticket volume',
    summary: 'FinCore trained OyeChats on 400+ compliance documents. 74% of support tickets are now resolved instantly by the AI, freeing the team to focus on complex regulatory queries.',
    tags: ['RAG Pipeline', 'Document Q&A', 'HubSpot CRM'],
  },
];

const LOGOS = ['🏦', '🛍️', '🏥', '🎓', '⚡', '🌐', '🔷', '💊', '🚀', '🏗️', '🎯', '📦'];

export default function CustomersPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(37,99,235,.08), transparent 70%)' }} />
          <div className="mx-auto max-w-3xl relative">
            <SectionEyebrow className="mx-auto mb-4">Customer Stories</SectionEyebrow>
            <SectionHeading gradient size="xl" center className="mb-5">
              Loved by 500+{' '}
              <span className="gradient-text-heading block">businesses</span>
            </SectionHeading>
            <p className="text-white/50 text-lg leading-relaxed">
              From Shopify stores to enterprise SaaS — OyeChats powers AI chat for businesses
              that take conversion seriously.
            </p>
          </div>
        </section>

        {/* Logo wall */}
        <section className="py-10 px-6 lg:px-8 border-y border-white/6">
          <div className="mx-auto max-w-5xl">
            <p className="text-center text-xs text-white/30 mb-6 uppercase tracking-widest">Trusted by teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {LOGOS.map((logo, i) => (
                <div key={i} className="h-10 w-10 rounded-xl glass-1 border border-white/8 flex items-center justify-center text-xl">
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics strip */}
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {[
                { value: '500+', label: 'Active businesses' },
                { value: '+42%', label: 'Avg conversion lift' },
                { value: '5M+', label: 'Monthly conversations' },
                { value: '98%', label: 'Customer satisfaction' },
              ].map((m) => (
                <div key={m.label} className="glass-1 rounded-2xl border border-white/8 p-5 text-center">
                  <p className="font-display font-bold text-3xl text-blue-400 mb-1">{m.value}</p>
                  <p className="text-xs text-white/50">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case studies */}
        <section className="pb-16 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">Featured case studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CASE_STUDIES.map((cs) => (
                <div key={cs.company} className="glass-2 rounded-2xl border border-white/10 p-6 flex flex-col group hover:border-white/15 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl glass-1 border border-white/8 flex items-center justify-center text-xl">{cs.logo}</div>
                    <div>
                      <p className="text-sm font-semibold text-white">{cs.company}</p>
                      <p className="text-xs text-white/40">{cs.industry}</p>
                    </div>
                  </div>

                  <div className="glass-1 rounded-xl p-3 mb-4 text-center border border-white/8">
                    <p className="font-display font-bold text-3xl text-emerald-400">{cs.metric}</p>
                    <p className="text-xs text-white/45">{cs.metricLabel}</p>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-4 flex-1">{cs.summary}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.map((t) => (
                      <span key={t} className="text-[9px] font-medium text-blue-400 bg-blue-400/10 border border-blue-400/20 rounded-full px-2 py-0.5 uppercase tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial highlights */}
        <AnimatedSeparator />
        <section className="py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">What customers say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="glass-1 rounded-2xl border border-white/8 p-6">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} width="12" height="12" viewBox="0 0 24 24" className="text-amber-400 fill-current">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed mb-4">"{t.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: t.avatarColor }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{t.name}</p>
                      <p className="text-[10px] text-white/40">{t.title}, {t.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
