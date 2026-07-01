import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const CANCELLATION_SECTIONS = [
  { id: 'how-to-cancel', label: 'How to Cancel' },
  { id: 'effect', label: 'Effect of Cancellation' },
  { id: 'annual-plans', label: 'Annual Plans' },
  { id: 'credits', label: 'Credits After Cancellation' },
  { id: 'data', label: 'Your Data After Cancellation' },
  { id: 'reactivation', label: 'Reactivation' },
  { id: 'contact', label: 'Contact' },
];

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'OyeChats Cancellation Policy — how to cancel your subscription and what happens next.',
  robots: { index: false },
  alternates: { canonical: 'https://www.oyechats.com/legal/cancellation' },
};

export default function CancellationPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="cancellation" sections={CANCELLATION_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Cancellation Policy</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: June 25, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
                <section>
                  <p>This Cancellation Policy explains how to cancel your OyeChats subscription and what happens when you do. OyeChats is a brand of Digibranders Pvt Ltd (&quot;OyeChats,&quot; &quot;we,&quot; &quot;us&quot;). It should be read alongside our <a href="/legal/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="/legal/refund" className="text-blue-400 hover:text-blue-300">Refund Policy</a>.</p>
                </section>

                <section id="how-to-cancel" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">1. How to Cancel</h2>
                  <p className="mb-3">You can cancel your subscription at any time directly from your dashboard — no need to contact support. To cancel:</p>
                  <ol className="space-y-2 list-decimal list-inside">
                    <li>Log in to your account at <a href="https://app.oyechats.com" className="text-blue-400 hover:text-blue-300">app.oyechats.com</a>.</li>
                    <li>Go to <strong className="text-white/80">Billing</strong> in the left sidebar.</li>
                    <li>Click <strong className="text-white/80">Manage Subscription</strong> and select <strong className="text-white/80">Cancel Plan</strong>.</li>
                    <li>Confirm the cancellation when prompted.</li>
                  </ol>
                  <p className="mt-3">If you are unable to cancel through the dashboard, contact us at <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a> and we will process the cancellation for you within 1 business day.</p>
                </section>

                <section id="effect" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">2. Effect of Cancellation</h2>
                  <p className="mb-3">Cancellation <strong className="text-white/80">stops automatic renewal</strong> — you will not be charged again after the current billing period ends. Your subscription remains fully active until the last day of the period you have already paid for.</p>
                  <p className="mb-3">For example, if you are on a monthly plan billed on the 1st of each month and you cancel on the 15th, your account stays active until the end of that month. On the 1st of the following month, your plan downgrades to Free automatically.</p>
                  <p>We do <strong className="text-white/80">not issue refunds for unused days</strong> in the current billing period. See our <a href="/legal/refund" className="text-blue-400 hover:text-blue-300">Refund Policy</a> for the specific circumstances where a refund may apply.</p>
                </section>

                <section id="annual-plans" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">3. Annual Plans</h2>
                  <p className="mb-3">If you are on an annual plan, cancelling stops the renewal at the end of the annual term. Your subscription continues until the end of the year you have paid for.</p>
                  <p>No refund is issued for the remaining months of an annual plan on voluntary cancellation. If you need to cancel an annual plan early due to exceptional circumstances, contact <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a> and we will review your case on its merits.</p>
                </section>

                <section id="credits" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">4. Credits After Cancellation</h2>
                  <p className="mb-3"><strong className="text-white/80">Plan credits.</strong> Monthly plan credits (included with your subscription) expire at the end of the billing cycle and are not carried forward after cancellation. Any credits allocated for the current cycle remain usable until the subscription ends.</p>
                  <p><strong className="text-white/80">Top-up credits.</strong> Top-up credits you have purchased separately are not affected by subscription cancellation. They remain in your account and are valid for 12 months from their purchase date, usable on the Free plan or any future paid plan.</p>
                </section>

                <section id="data" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">5. Your Data After Cancellation</h2>
                  <p className="mb-3">When your paid plan ends and your account downgrades to Free, your bots, knowledge base documents, chat history, and leads are retained in your account subject to the Free plan&apos;s storage limits.</p>
                  <p className="mb-3">If you close your account entirely (rather than just cancelling the subscription), you may export your data from the dashboard for up to <strong className="text-white/80">30 days</strong> after account closure. After that window, we will delete or anonymise your data in accordance with the schedule set out in our <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>, unless longer retention is required by law.</p>
                  <p>To request account closure and data deletion, email <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a> with the subject line <strong className="text-white/80">&quot;Account Closure Request&quot;</strong>.</p>
                </section>

                <section id="reactivation" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">6. Reactivation</h2>
                  <p>You can reactivate a paid subscription at any time by going to <strong className="text-white/80">Billing</strong> in your dashboard and selecting a plan. Your previous configuration, bots, and knowledge base will still be there if you reactivate before your data retention period expires.</p>
                </section>

                <section id="contact" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">7. Contact</h2>
                  <p>For questions about cancellation or your account, contact us at <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>. OyeChats is a brand of Digibranders Pvt Ltd, India.</p>
                </section>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
