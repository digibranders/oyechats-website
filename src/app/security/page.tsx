import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Lock, Shield, KeyRound, ClipboardList, ShieldCheck, Globe, Server, Zap, Bug, Eye, Cloud, Mail, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security',
  description: 'OyeChats security practices: end-to-end encryption, SOC 2 alignment, GDPR compliance, access controls, and infrastructure details.',
  alternates: { canonical: 'https://oyechats.com/security' },
  openGraph: { url: 'https://oyechats.com/security' },
};

const SECURITY_SECTIONS: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Lock,
    title: 'Encryption',
    items: [
      'All data encrypted at rest using AES-256',
      'TLS 1.3 for all data in transit',
      'Database-level encryption at rest and in transit',
      'Webhook payloads signed with HMAC-SHA256',
    ],
  },
  {
    icon: Shield,
    title: 'Infrastructure',
    items: [
      'Hosted on isolated cloud infrastructure',
      'Automatic backups every 6 hours with 30-day retention',
      'Rate limiting on all API endpoints',
      '99.99% uptime SLA with real-time incident monitoring',
    ],
  },
  {
    icon: KeyRound,
    title: 'Access Control',
    items: [
      'Role-based access control (RBAC) on Enterprise',
      'SSO / SAML 2.0 support on Enterprise',
      'JWT-based session tokens with short expiry',
      'API keys scoped to minimum required permissions',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Compliance',
    items: [
      'GDPR-compliant data processing',
      'Data residency options for Enterprise',
      'Right to erasure — delete visitor data on request',
      'Cookie-free tracking option available',
    ],
  },
];

const CERTIFICATIONS: { badge: LucideIcon; name: string; status: string; color: string }[] = [
  { badge: ShieldCheck, name: 'SOC 2 Type II', status: 'In progress — Q3 2025', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
  { badge: Globe, name: 'GDPR', status: 'Compliant', color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
  { badge: Lock, name: 'HTTPS / TLS 1.3', status: 'Active', color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
  { badge: Cloud, name: 'ISO 27001 Storage', status: 'Geo-redundant', color: 'text-violet-400 border-violet-400/20 bg-violet-400/5' },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Security & Privacy</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                Enterprise-grade{' '}
                <span className="gradient-text-heading">security</span>
              </SectionHeading>
              <p className="text-white/50 max-w-xl mx-auto">
                Your data and your customers&apos; data is safe with us. Here&apos;s exactly how we protect it.
              </p>
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className={`rounded-2xl border p-5 text-center ${cert.color}`}>
                  <cert.badge className="h-7 w-7 mx-auto mb-2" />
                  <p className="text-sm font-semibold">{cert.name}</p>
                  <p className="text-[11px] opacity-70 mt-1">{cert.status}</p>
                </div>
              ))}
            </div>

            {/* Security sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              {SECURITY_SECTIONS.map((section) => (
                <div key={section.title} className="glass-1 rounded-2xl border border-white/8 p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <section.icon className="h-6 w-6 text-blue-400" />
                    <h3 className="font-display text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                        <svg width="14" height="14" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Infrastructure details */}
            <div className="glass-2 rounded-3xl border border-white/10 p-8">
              <h3 className="font-display text-xl font-semibold text-white mb-6 text-center">Infrastructure at a glance</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: Server, name: 'Isolated database cluster', role: 'Dedicated per-region storage' },
                  { icon: Zap, name: 'High-availability queuing', role: 'Zero message loss guarantee' },
                  { icon: Bug, name: 'Real-time error monitoring', role: 'Instant incident alerting' },
                  { icon: Eye, name: 'AI observability', role: 'Full trace logging (Enterprise)' },
                  { icon: Cloud, name: 'Geo-redundant storage', role: 'Document + media files' },
                  { icon: Mail, name: 'Transactional email', role: 'Notifications & summaries' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 glass-1 rounded-xl p-3 border border-white/6">
                    <item.icon className="h-4 w-4 text-white/50 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">{item.name}</p>
                      <p className="text-[11px] text-white/45">{item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact security */}
            <div className="mt-12 text-center">
              <p className="text-white/50 text-sm mb-4">
                Found a vulnerability? We have a responsible disclosure program.
              </p>
              <a href="mailto:security@oyechats.com" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium cursor-pointer">
                security@oyechats.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
