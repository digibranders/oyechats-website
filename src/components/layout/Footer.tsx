'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/shared/StatusBadge';

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Roadmap', href: '/changelog#roadmap' },
  ],
  Solutions: [
    { label: 'For E-commerce', href: '/customers' },
    { label: 'For SaaS', href: '/customers' },
    { label: 'For Agencies', href: '/customers' },
    { label: 'Enterprise', href: '/contact?intent=enterprise' },
    { label: 'Customers', href: '/customers' },
  ],
  Developers: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs#api' },
    { label: 'Widget Setup', href: '/docs#widget' },
    { label: 'Webhooks', href: '/docs#webhooks' },
    { label: 'Status', href: 'https://status.oyechats.com' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about#careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Security', href: '/security' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/privacy#cookies' },
    { label: 'GDPR', href: '/security#gdpr' },
  ],
};

const socials = [
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/oyechats',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/oyechats',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/oyechats',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[.05] overflow-hidden" style={{ background: 'var(--color-bg-footer)' }}>
      {/* Top section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-12">
        {/* Newsletter row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/[.06]">
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-1">Stay in the loop</h3>
            <p className="text-sm text-white/45">Product updates, feature releases, and customer stories.</p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@company.com"
              className="glass-input rounded-full px-4 py-2.5 text-sm text-white placeholder-white/30 w-full md:w-64 focus:outline-none transition-all"
            />
            <button type="submit"
              className="btn-filled-style rounded-full px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-all hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-12 footer-cols-responsive">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block py-1 text-sm text-white/50 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant brand text */}
      <div className="foot-brand-fade relative overflow-hidden">
        <span
          className="animate-brand-float block text-center select-none font-display font-semibold tracking-[-0.04em] leading-[.88]"
          style={{
            fontSize: 'clamp(3rem, 16vw, 21rem)',
            background: 'linear-gradient(172deg, rgba(255,255,255,.98) 0%, rgba(155,190,255,.72) 24%, rgba(50,100,210,.28) 58%, rgba(10,45,150,.03) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 -2px 12px rgba(200,220,255,.18)) drop-shadow(0 4px 40px rgba(37,99,235,.10))',
          }}
          aria-hidden="true"
        >
          OyeChats
        </span>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
              </svg>
            </div>
            <p className="text-xs text-white/30">© {new Date().getFullYear()} OyeChats. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status="live" />
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white/80 hover:bg-white/10 transition-all">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
