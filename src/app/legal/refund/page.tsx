import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const REFUND_SECTIONS = [
  { id: 'general', label: 'General Policy' },
  { id: 'subscriptions', label: 'Subscription Payments' },
  { id: 'topup-credits', label: 'Top-Up Credits' },
  { id: 'eligible-refunds', label: 'Eligible Refunds' },
  { id: 'process', label: 'How to Request a Refund' },
  { id: 'contact', label: 'Contact' },
];

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'OyeChats Refund Policy — when refunds apply and how to request one.',
  robots: { index: false },
  alternates: { canonical: 'https://www.oyechats.com/legal/refund' },
};

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="refund" sections={REFUND_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Refund Policy</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: June 25, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
                <section>
                  <p>This Refund Policy applies to all payments made to OyeChats, a brand of Digibranders Pvt Ltd (&quot;OyeChats,&quot; &quot;we,&quot; &quot;us,&quot;). It should be read together with our <a href="/legal/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</a>. By purchasing a subscription or top-up credits, you agree to this policy.</p>
                </section>

                <section id="general" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">1. General Policy</h2>
                  <p className="mb-3">All fees paid to OyeChats are <strong className="text-white/80">non-refundable</strong> except in the specific circumstances described in Section 4 below. This includes fees for subscription plans (monthly or annual) and one-time top-up credit purchases.</p>
                  <p>We encourage you to evaluate OyeChats using our free plan before upgrading to a paid subscription. Where a free trial is offered on a plan, it provides a full-featured experience before any charge is made.</p>
                </section>

                <section id="subscriptions" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">2. Subscription Payments</h2>
                  <p className="mb-3"><strong className="text-white/80">Monthly plans.</strong> Monthly subscription fees are charged in advance at the start of each billing cycle. If you cancel during a billing cycle, your subscription remains active until the end of the paid period; no partial-month refund is issued for the unused days.</p>
                  <p className="mb-3"><strong className="text-white/80">Annual plans.</strong> Annual subscription fees are charged upfront for the full year. If you cancel an annual subscription before the end of the term, no refund is issued for the remaining months, except in the eligible circumstances listed in Section 4.</p>
                  <p><strong className="text-white/80">Plan upgrades.</strong> When you upgrade from a lower to a higher plan mid-cycle, any unused credit from the current cycle is applied as a prorated credit toward the new plan. No cash refund is issued for this adjustment.</p>
                </section>

                <section id="topup-credits" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">3. Top-Up Credits</h2>
                  <p className="mb-3">Top-up credit packs are <strong className="text-white/80">non-refundable</strong> once purchased. Credits are valid for 12 months from the date of purchase and roll over month-to-month within that window.</p>
                  <p>If you believe credits were deducted in error (for example, due to a platform bug), contact us at <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a> within 30 days and we will investigate. Credits confirmed to be incorrectly deducted will be restored to your account.</p>
                </section>

                <section id="eligible-refunds" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">4. Eligible Refunds</h2>
                  <p className="mb-3">A refund may be issued in the following circumstances:</p>
                  <ul className="space-y-3 list-disc list-inside">
                    <li><strong className="text-white/80">Duplicate charge.</strong> If you were charged more than once for the same billing period due to a payment processing error, we will refund the duplicate amount in full.</li>
                    <li><strong className="text-white/80">Warranty remedy.</strong> If OyeChats cannot resolve a material non-conformance of the Services within a reasonable time as described in the Limited Warranty clause of our Terms of Service, you may be entitled to a pro-rata refund of pre-paid fees for the unused remainder of your Subscription Term.</li>
                    <li><strong className="text-white/80">Service termination by OyeChats.</strong> If we terminate your subscription for reasons other than your breach, we will refund any pre-paid fees covering the period after termination.</li>
                    <li><strong className="text-white/80">Erroneous billing.</strong> If we charged you an amount different from what was displayed at checkout due to a system error on our side, we will refund the difference.</li>
                    <li><strong className="text-white/80">Statutory rights.</strong> Nothing in this policy limits any rights you have under applicable law, including the Consumer Protection Act, 2019 (India) or any other applicable consumer protection legislation.</li>
                  </ul>
                </section>

                <section id="process" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">5. How to Request a Refund</h2>
                  <p className="mb-3">To request a refund, email us at <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a> with the subject line <strong className="text-white/80">&quot;Refund Request&quot;</strong> and include:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>The email address associated with your OyeChats account.</li>
                    <li>The date and amount of the charge in question.</li>
                    <li>The reason for your refund request.</li>
                    <li>Any supporting evidence (for example, a screenshot of a duplicate charge).</li>
                  </ul>
                  <p className="mt-3">We will acknowledge your request within 2 business days and aim to resolve eligible refunds within 7 business days. Approved refunds are processed back to the original payment method. Processing time may vary depending on your bank or payment provider (typically 5–10 business days after we issue the refund).</p>
                </section>

                <section id="contact" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">6. Contact</h2>
                  <p>For questions about this policy, contact us at <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>. OyeChats is a brand of Digibranders Pvt Ltd, India.</p>
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
