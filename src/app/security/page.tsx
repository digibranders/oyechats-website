import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Lock, Shield, KeyRound, ClipboardList, ShieldCheck, Globe, Server, Zap, Bug, Eye, Cloud, Mail, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security',
  description: 'OyeChats security practices: encryption in transit and at rest, GDPR-aligned data handling, access controls, signed webhooks, and infrastructure details.',
  alternates: { canonical: 'https://oyechats.com/security' },
  openGraph: { url: 'https://oyechats.com/security' },
};

const SECURITY_SECTIONS: { icon: LucideIcon; title: string; items: string[] }[] = [
  {
    icon: Lock,
    title: 'Encryption',
    items: [
      'TLS for all data in transit (HTTPS / WSS)',
      'Data encrypted at rest by our managed cloud storage (AES-256)',
      'Webhook payloads signed with HMAC-SHA256',
      'Passwords hashed with bcrypt, never stored in plain text',
    ],
  },
  {
    icon: Shield,
    title: 'Infrastructure',
    items: [
      'Hosted on managed cloud infrastructure',
      'Automated backups managed by our cloud provider',
      'Rate limiting on API endpoints',
      'Error and uptime monitoring via Sentry',
    ],
  },
  {
    icon: KeyRound,
    title: 'Access Control',
    items: [
      'Role-based access control for operators and admins',
      'Password and Google OAuth sign-in',
      'Signed session tokens with expiry',
      'API keys scoped to the minimum required permissions',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Data & Privacy',
    items: [
      'GDPR-aligned data processing',
      'Email addresses redacted in application logs',
      'Right to erasure, delete visitor data on request',
      'Prompt-injection guards on every AI message',
    ],
  },
];

const CERTIFICATIONS: { badge: LucideIcon; name: string; status: string; color: string }[] = [
  { badge: Globe, name: 'GDPR', status: 'Aligned', color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
  { badge: Lock, name: 'HTTPS / TLS', status: 'Active', color: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' },
  { badge: Cloud, name: 'Encrypted at Rest', status: 'Managed cloud', color: 'text-violet-400 border-violet-400/20 bg-violet-400/5' },
  { badge: ShieldCheck, name: 'Signed Webhooks', status: 'HMAC-SHA256', color: 'text-blue-400 border-blue-400/20 bg-blue-400/5' },
];

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
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
                  { icon: Server, name: 'Managed Postgres', role: 'Primary application datastore' },
                  { icon: Zap, name: 'Background job queue', role: 'Async tasks via ARQ + Redis' },
                  { icon: Bug, name: 'Error monitoring', role: 'Incident alerting via Sentry' },
                  { icon: Eye, name: 'AI observability', role: 'Trace logging via Langfuse (Enterprise)' },
                  { icon: Cloud, name: 'Cloud object storage', role: 'Documents & media via Cloudflare R2' },
                  { icon: Mail, name: 'Transactional email', role: 'Notifications & summaries via Brevo' },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 glass-1 rounded-xl p-3 border border-white/6">
                    <item.icon className="h-4 w-4 text-white/50 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-white">{item.name}</p>
                      <p className="text-[11px] text-white/60">{item.role}</p>
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
              <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium cursor-pointer">
                support@oyechats.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
