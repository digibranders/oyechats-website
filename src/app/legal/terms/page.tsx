import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'OyeChats Terms of Service — the legal agreement governing your use of the platform.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-white/40 text-sm mb-10">Last updated: March 1, 2025</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using OyeChats ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">2. Use of the Service</h2>
                <p className="mb-3">You may use OyeChats only for lawful purposes. You must not:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Use the Service to transmit spam, malicious code, or illegal content</li>
                  <li>Attempt to reverse-engineer, scrape, or abuse the API beyond documented rate limits</li>
                  <li>Share your account credentials with unauthorized parties</li>
                  <li>Misrepresent your identity or your bot's identity to visitors</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">3. Subscription & Billing</h2>
                <p>Paid subscriptions are billed monthly or annually in advance. You may cancel at any time; cancellations take effect at the end of the current billing period. We do not provide refunds for partial billing periods, except where required by law.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">4. Message Limits</h2>
                <p>Your plan includes a monthly message quota. Exceeding your quota will trigger a notification. We will not automatically charge overages — you must upgrade your plan to continue. The Service may degrade gracefully (e.g., respond with a fallback message) if limits are exceeded.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">5. Data & Content</h2>
                <p>You retain ownership of all content you upload to OyeChats, including bot training documents and conversation history. You grant OyeChats a limited license to process this content solely to provide the Service. We do not use your content to train general-purpose AI models.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">6. Uptime & SLA</h2>
                <p>We target 99.9% uptime for Pro plans and 99.99% for Enterprise plans. Scheduled maintenance windows will be communicated at least 24 hours in advance. SLA credits are available for Enterprise plans as specified in your contract.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">7. Limitation of Liability</h2>
                <p>OyeChats is provided "as is." To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages. Our total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">8. Termination</h2>
                <p>We may suspend or terminate your account for material violations of these terms, with notice where practicable. You may terminate your account at any time from your account settings.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">9. Changes to Terms</h2>
                <p>We may update these Terms. We'll notify you by email 14 days before material changes take effect. Continued use of the Service after changes constitutes acceptance.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">10. Contact</h2>
                <p>For legal inquiries: <a href="mailto:legal@oyechats.com" className="text-blue-400 hover:text-blue-300">legal@oyechats.com</a></p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
