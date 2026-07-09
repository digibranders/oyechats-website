'use client';

import Link from 'next/link';
import OyeChatsMark from '@/components/shared/OyeChatsMark';
// import { StatusBadge } from '@/components/shared/StatusBadge';

const footerLinks: Record<string, Array<{ label: string; href: string }>> = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Changelog', href: '/changelog' },
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
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Security', href: '/security' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Terms of Service', href: '/legal/terms' },
    { label: 'Cookie Policy', href: '/legal/cookies' },
    { label: 'Data Processing Addendum', href: '/legal/dpa' },
    { label: 'GDPR', href: '/security#gdpr' },
  ],
};

const socials: Array<{ label: string; href: string; icon: React.ReactNode }> = [
  {
    label: 'LinkedIn',
    href: 'https://in.linkedin.com/company/fynixofficial',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/fynix_digital/',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[.05] overflow-hidden" style={{ background: 'var(--color-bg-footer)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 footer-cols-responsive">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/65 mb-4">{category}</p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="inline-block py-1 text-sm text-white/55 hover:text-white transition-colors cursor-pointer">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="foot-brand-fade relative overflow-hidden">
        <span
          className="animate-brand-float block text-center select-none font-display font-semibold tracking-[-0.02em] leading-[.95]"
          style={{
            fontSize: 'clamp(3rem, 16vw, 21rem)',
            paddingBottom: '0.15em',
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

      <div className="border-t border-white/[.04]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <OyeChatsMark size={24} className="rounded-lg" />
            <p className="text-xs text-white/65">© {new Date().getFullYear()} OyeChats. All rights reserved.</p>
            <Link
              href="/changelog"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="font-medium text-white/80 group-hover:text-white">v3.2.0</span>
              <span className="text-white/40">·</span>
              <span>What&apos;s new</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {/* <StatusBadge status="live" /> */}
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <a key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors">
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

