'use client';
import { APP_LINKS } from '@/lib/constants';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { CTAButton } from '@/components/shared/CTAButton';

const navLinks = [
  { label: 'Product', hasMega: true },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Customers', href: '/customers' },
];

const megaMenuItems = {
  features: [
    { icon: '🧠', label: 'RAG Pipeline', desc: 'Document-aware AI with hybrid search', href: '/features#rag' },
    { icon: '🎯', label: 'BANT Scoring', desc: 'Automated sales qualification', href: '/features#bant' },
    { icon: '💬', label: 'Live Chat', desc: 'Seamless bot-to-human handoff', href: '/features#live-chat' },
    { icon: '📊', label: 'Analytics', desc: 'Deep visitor insights & reports', href: '/features#analytics' },
    { icon: '🔄', label: 'Webhooks', desc: 'Event-driven integrations', href: '/features#webhooks' },
    { icon: '🎨', label: 'Customization', desc: 'Full widget branding control', href: '/features#customization' },
  ],
  integrations: [
    { icon: '🌐', label: 'WordPress', href: '/integrations' },
    { icon: '🛍️', label: 'Shopify', href: '/integrations' },
    { icon: '⚡', label: 'Next.js', href: '/integrations' },
    { icon: '💬', label: 'Slack', href: '/integrations' },
    { icon: '📱', label: 'WhatsApp', href: '/integrations' },
    { icon: '📅', label: 'Calendly', href: '/integrations' },
  ],
  changelog: [
    { version: 'v2.4', date: 'Apr 2025', note: 'BANT behavioral scoring' },
    { version: 'v2.3', date: 'Mar 2025', note: 'Live chat operator teams' },
    { version: 'v2.2', date: 'Feb 2025', note: 'Hybrid search (RRF fusion)' },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMegaEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled ? 'glass-nav-scrolled' : 'glass-nav'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-[0_0_16px_rgba(37,99,235,.4)]">
                <svg viewBox="0 0 24 24" fill="none" className="w-4">
                  <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
                </svg>
              </div>
              <span className="font-display font-semibold text-white text-base tracking-tight">
                OyeChats
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                if (link.hasMega) {
                  return (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                    >
                      <button
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                          megaOpen ? 'text-white bg-white/8' : 'text-white/70 hover:text-white hover:bg-white/6'
                        )}
                      >
                        {link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          className={cn('transition-transform duration-200', megaOpen && 'rotate-180')}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                    </div>
                  );
                }
                return (
                  <Link key={link.label} href={link.href!}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/6 transition-all duration-200">
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              <StatusBadge status="live" />
              <Link href={APP_LINKS.login}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                Sign in
              </Link>
              <CTAButton href={APP_LINKS.register} variant="filled" size="sm" external showWavebar>
                Get started free
              </CTAButton>
            </div>

            {/* Mobile hamburger — p-3 ensures 44px+ touch target */}
            <button className="lg:hidden p-3 rounded-lg hover:bg-white/8 transition-colors text-white/70"
              onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                ) : (
                  <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[62px] inset-x-0 z-40 hidden lg:block"
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-2">
              <div className="glass-3 rounded-2xl p-6 grid grid-cols-3 gap-8">
                {/* Features */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Features</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {megaMenuItems.features.map((item) => (
                      <Link key={item.label} href={item.href}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-white/6 transition-colors group"
                        onClick={() => setMegaOpen(false)}>
                        <span className="text-base mt-0.5">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">{item.label}</p>
                          <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Integrations */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Integrations</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {megaMenuItems.integrations.map((item) => (
                      <Link key={item.label} href={item.href}
                        className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-white/6 transition-colors group"
                        onClick={() => setMegaOpen(false)}>
                        <span>{item.icon}</span>
                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/integrations" className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => setMegaOpen(false)}>
                    View all 20+ integrations
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </Link>
                </div>
                {/* Changelog */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-4">Latest Updates</p>
                  <div className="space-y-3">
                    {megaMenuItems.changelog.map((item) => (
                      <Link key={item.version} href="/changelog"
                        className="flex items-start gap-3 group" onClick={() => setMegaOpen(false)}>
                        <span className="text-[10px] font-mono font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-1.5 py-0.5 rounded mt-0.5 shrink-0">
                          {item.version}
                        </span>
                        <div>
                          <p className="text-sm text-white/80 group-hover:text-white transition-colors leading-snug">{item.note}</p>
                          <p className="text-xs text-white/30 mt-0.5">{item.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/changelog" className="inline-flex items-center gap-1 mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => setMegaOpen(false)}>
                    Full changelog
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-[#010812]/90 backdrop-blur-2xl" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#030D1F] border-l border-white/10 p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-lg">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 hover:bg-white/8 rounded-lg text-white/70">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Integrations', href: '/integrations' },
                  { label: 'Customers', href: '/customers' },
                  { label: 'Changelog', href: '/changelog' },
                  { label: 'About', href: '/about' },
                  { label: 'Blog', href: '/blog' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link key={link.label} href={link.href}
                    className="px-4 py-3 rounded-xl text-sm font-medium text-white/75 hover:text-white hover:bg-white/6 transition-all"
                    onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3">
                <Link href={APP_LINKS.login}
                  className="text-center px-4 py-3 rounded-xl border border-white/15 text-sm font-medium text-white/80 hover:bg-white/6 transition-all">
                  Sign in
                </Link>
                <Link href={APP_LINKS.register}
                  className="text-center px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white transition-all">
                  Get started free
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
