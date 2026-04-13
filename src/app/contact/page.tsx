'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { Mail, MessageCircle, MapPin, Clock, CheckCircle } from 'lucide-react';

const INTENT_OPTIONS = [
  { value: 'demo', label: 'Book a product demo' },
  { value: 'enterprise', label: 'Enterprise inquiry' },
  { value: 'support', label: 'Technical support' },
  { value: 'partnership', label: 'Partnership / integration' },
  { value: 'careers', label: 'Careers inquiry' },
  { value: 'other', label: 'Something else' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', intent: 'demo' });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Contact Us</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                Let&apos;s talk{' '}
                <span className="gradient-text-heading">pipeline</span>
              </SectionHeading>
              <p className="text-white/50 max-w-xl mx-auto">
                Whether you want a demo, have an enterprise question, or just want to say hi —
                we respond within 2 business hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@oyechats.com' },
                  { icon: MessageCircle, label: 'Live chat', value: 'Available on this page' },
                  { icon: MapPin, label: 'Location', value: 'Remote-first · Bengaluru, India' },
                  { icon: Clock, label: 'Response time', value: '< 2 business hours' },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-3 glass-1 rounded-xl p-4 border border-white/8">
                    <c.icon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-white/50">{c.label}</p>
                      <p className="text-sm text-white">{c.value}</p>
                    </div>
                  </div>
                ))}

                <div className="glass-1 rounded-xl p-4 border border-white/8">
                  <p className="text-xs text-white/50 mb-3">Or book directly</p>
                  <CTAButton href="https://calendly.com/oyechats/demo" external variant="ghost" size="sm" className="w-full justify-center">
                    Schedule on Calendly
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </CTAButton>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="glass-2 rounded-3xl border border-emerald-500/20 p-12 text-center">
                    <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="font-display text-xl font-semibold text-white mb-2">Message sent!</h3>
                    <p className="text-white/50">We&apos;ll get back to you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="glass-2 rounded-3xl border border-white/10 p-8 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5">Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-white/50 mb-1.5">Work email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Company</label>
                      <input
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">I&apos;m reaching out about</label>
                      <select
                        value={form.intent}
                        onChange={(e) => setForm({ ...form, intent: e.target.value })}
                        className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white bg-[#030D1F] focus:outline-none focus:border-blue-500/50 transition-colors"
                      >
                        {INTENT_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-white/50 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what you're looking to achieve..."
                        className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-filled-style px-8 py-4 text-base rounded-xl font-semibold text-white transition-all cursor-pointer"
                    >
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
