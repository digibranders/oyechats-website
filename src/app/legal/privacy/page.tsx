import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OyeChats Privacy Policy — how we collect, use, and protect your data.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-white/50 text-sm mb-10">Last updated: March 1, 2025</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">1. Introduction</h2>
                <p>OyeChats (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the OyeChats platform and website. This Privacy Policy explains how we collect, use, store, and share information when you use our services.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
                <p className="mb-3">We collect the following categories of information:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">Account data:</strong> Name, email address, company name, and password when you register.</li>
                  <li><strong className="text-white/80">Bot configuration:</strong> Bot settings, system prompts, and knowledge base documents you upload.</li>
                  <li><strong className="text-white/80">Visitor conversation data:</strong> Chat messages, timestamps, visitor metadata (IP address, browser, device, geo), and UTM parameters from visitors to your website widget.</li>
                  <li><strong className="text-white/80">Usage data:</strong> Feature usage, API call volumes, and error logs.</li>
                  <li><strong className="text-white/80">Payment data:</strong> Handled by Stripe — we do not store card numbers.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Provide and operate the OyeChats platform</li>
                  <li>Generate BANT qualification scores from conversation analysis</li>
                  <li>Send transactional emails (via Brevo) including account notifications and webhook failures</li>
                  <li>Monitor platform performance and debug errors (via Sentry)</li>
                  <li>Improve our LLM response quality via aggregated analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">4. Data Retention</h2>
                <p>Chat history is retained for 7 days (Free), 90 days (Pro), or indefinitely (Enterprise), depending on your plan. You may request deletion of all visitor data at any time via your account settings or by contacting privacy@oyechats.com.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">5. Data Sharing</h2>
                <p className="mb-3">We do not sell your data. We share data only with:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>LLM providers (OpenAI, Anthropic, Google) for generating responses — governed by their data processing agreements</li>
                  <li>Langfuse — for LLM observability on Enterprise plans</li>
                  <li>Backblaze B2 — for document and media storage</li>
                  <li>Brevo — for email delivery</li>
                  <li>Sentry — for error tracking</li>
                  <li>Stripe — for payment processing</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">6. GDPR Rights</h2>
                <p>If you are a resident of the European Economic Area, you have the right to: access your personal data, correct inaccuracies, request deletion, object to processing, and request data portability. Contact us at privacy@oyechats.com to exercise these rights.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">7. Cookies</h2>
                <p>The OyeChats website uses essential cookies for session management. The chat widget uses a session token stored in localStorage (not cookies) and can be configured for cookie-free tracking mode on Pro and Enterprise plans.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">8. Security</h2>
                <p>All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We undergo annual security reviews and maintain a responsible disclosure program at security@oyechats.com.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">9. Contact</h2>
                <p>For privacy questions, contact us at <a href="mailto:privacy@oyechats.com" className="text-blue-400 hover:text-blue-300">privacy@oyechats.com</a>.</p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
