'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CTAButton } from '@/components/shared/CTAButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,.07), transparent 70%)' }}
        />

        <div className="text-center relative">
          {/* Large 404 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div
              className="font-display font-bold gradient-text-heading leading-none mb-6 select-none"
              style={{ fontSize: 'clamp(6rem, 20vw, 14rem)', letterSpacing: '-0.05em' }}
            >
              404
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="font-display text-2xl font-semibold text-white mb-3">
              This page doesn&apos;t exist
            </h1>
            <p className="text-white/50 mb-8 max-w-md mx-auto">
              Looks like this URL went cold. Let&apos;s get you back to the pipeline.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="/" variant="filled" size="lg">
                Back to home
              </CTAButton>
              <CTAButton href="/contact" variant="ghost" size="lg">
                Contact support
              </CTAButton>
            </div>

            {/* Quick links */}
            <div className="mt-10 flex items-center justify-center gap-6 text-sm text-white/45">
              {[
                { label: 'Features', href: '/features' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white/60 transition-colors cursor-pointer">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
