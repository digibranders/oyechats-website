'use client';

import { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import { Mail, MessageCircle, MapPin, Clock, CheckCircle, Phone, FileText, ChevronDown } from 'lucide-react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', intent: 'demo' });
  const [intentOpen, setIntentOpen] = useState(false);
  const intentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (intentRef.current && !intentRef.current.contains(e.target as Node)) {
        setIntentOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Contact Us</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                Let&apos;s talk{' '}
                <span className="gradient-text-heading">pipeline</span>
              </SectionHeading>
              <p className="text-white/50 max-w-xl mx-auto">
                Whether you want a demo, have an enterprise question, or just want to say hi -
                we respond within 2 business hours.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact info */}
              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: 'support@oyechats.com' },
                  { icon: Phone, label: 'Phone', value: '+91 789 789 6607' },
                  {
                    icon: MapPin,
                    label: 'Office',
                    value: (
                      <>
                        Office No. 2617, 26th Floor, Solus Building,
                        <br />
                        Hiranandani Estate, Ghodbunder Road,
                        <br />
                        Thane West, Maharashtra 400607
                      </>
                    ),
                  },
                  { icon: FileText, label: 'GST No.', value: '27AAICD9268J1Z0' },
                  { icon: MessageCircle, label: 'Live chat', value: 'Available on this page' },
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
              <div className="lg:col-span-2 flex">
                {submitted ? (
                  <div className="flex-1 glass-2 rounded-3xl border border-emerald-500/20 p-12 flex flex-col items-center justify-center text-center">
                    <CheckCircle className="h-12 w-12 text-emerald-400 mb-4" />
                    <h3 className="font-display text-xl font-semibold text-white mb-2">Message sent!</h3>
                    <p className="text-white/50">We&apos;ll get back to you within 2 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 glass-2 rounded-3xl border border-white/10 p-8 flex flex-col gap-5">
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

                    <div ref={intentRef} className="relative">
                      <label className="block text-xs text-white/50 mb-1.5">I&apos;m reaching out about</label>
                      <button
                        type="button"
                        onClick={() => setIntentOpen((v) => !v)}
                        className="w-full glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white text-left flex items-center justify-between focus:outline-none focus:border-blue-500/50 transition-colors cursor-pointer"
                        aria-haspopup="listbox"
                        aria-expanded={intentOpen}
                      >
                        <span>{INTENT_OPTIONS.find((o) => o.value === form.intent)?.label}</span>
                        <ChevronDown
                          className="h-4 w-4 text-white/40 shrink-0 transition-transform duration-200"
                          style={{ transform: intentOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>
                      {intentOpen && (
                        <ul
                          role="listbox"
                          className="absolute z-50 mt-1.5 w-full glass-3 border border-white/10 rounded-xl overflow-hidden shadow-xl"
                        >
                          {INTENT_OPTIONS.map((o) => (
                            <li
                              key={o.value}
                              role="option"
                              aria-selected={form.intent === o.value}
                              onClick={() => { setForm({ ...form, intent: o.value }); setIntentOpen(false); }}
                              className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2 transition-colors ${
                                form.intent === o.value
                                  ? 'text-white bg-blue-600/20'
                                  : 'text-white/70 hover:text-white hover:bg-white/6'
                              }`}
                            >
                              {form.intent === o.value && (
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                              )}
                              <span className={form.intent === o.value ? '' : 'ml-3.5'}>{o.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col min-h-[140px]">
                      <label className="block text-xs text-white/50 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us what you're looking to achieve..."
                        className="w-full flex-1 glass-1 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/45 focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-filled-style px-8 py-4 text-base rounded-xl font-semibold text-white transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending…' : 'Send message'}
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
