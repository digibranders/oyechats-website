import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'OyeChats Privacy Policy — how we collect, use, store, share, and protect your data.',
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
            <p className="text-white/50 text-sm mb-10">Last updated: April 16, 2026</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">1. Introduction</h2>
                <p className="mb-3">OyeChats (&quot;OyeChats,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the OyeChats platform, including our website at oyechats.com, the customer dashboard at app.oyechats.com, our REST and WebSocket APIs, and the embeddable chat widget our customers deploy on their own websites (collectively, the &quot;Service&quot;).</p>
                <p>This Privacy Policy describes how we collect, use, store, share, and protect personal information when you interact with the Service — whether you are a customer who has signed up for an OyeChats account, an end user (&quot;Visitor&quot;) chatting with a bot on a customer&apos;s website, or simply browsing oyechats.com. By using the Service, you agree to the practices described here.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">2. Our Role: Controller vs. Processor</h2>
                <p className="mb-3">Privacy law distinguishes between data &quot;controllers&quot; (who decide why and how data is processed) and &quot;processors&quot; (who handle data on a controller&apos;s instructions). Our role differs depending on whose data is involved:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">Customer data:</strong> Where you have signed up for an OyeChats account, we act as the <em>controller</em> of the data we collect from you to operate, bill for, and improve the Service.</li>
                  <li><strong className="text-white/80">Visitor data:</strong> Where a Visitor interacts with a bot on a customer&apos;s website, our customer is the <em>controller</em> of that conversation data and we act as a <em>processor</em> on their behalf, governed by the Data Processing Addendum incorporated into our Terms of Service.</li>
                </ul>
                <p className="mt-3">If you are a Visitor with questions about how a specific customer uses your data, please contact that customer directly. We will assist with verified requests forwarded by the controller.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">3. Information We Collect</h2>
                <p className="mb-3">We collect the following categories of information:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">Account data:</strong> Name, work email address, organization name, hashed password, account role, and optionally a website URL when you register or invite team members.</li>
                  <li><strong className="text-white/80">Bot configuration:</strong> Bot name, system prompt, appearance settings, business hours, and the knowledge base content (documents you upload or URLs you ask us to crawl).</li>
                  <li><strong className="text-white/80">Conversation data:</strong> Chat messages between Visitors and the bot or live operators, timestamps, lead-capture form submissions (name, email, phone, company), and qualification signals derived from the conversation.</li>
                  <li><strong className="text-white/80">Visitor metadata:</strong> Truncated IP address, browser and device type, approximate geographic location (country/region), page URL the widget loaded on, referrer, and UTM campaign parameters.</li>
                  <li><strong className="text-white/80">Operator data:</strong> For customers using live chat, the names, emails, roles, and activity logs of human operators assigned to handle visitor conversations.</li>
                  <li><strong className="text-white/80">Usage and diagnostic data:</strong> Feature usage counters, API request volumes, error stack traces, performance metrics, and audit logs of administrative actions.</li>
                  <li><strong className="text-white/80">Billing data:</strong> Plan tier, billing cycle, invoice history, and the last four digits and brand of the payment instrument. Full card numbers and bank account details are processed and stored by our payment providers (Stripe and Razorpay) and never reach our servers.</li>
                  <li><strong className="text-white/80">Communications:</strong> Contents of emails or support tickets you send us.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">4. How We Use Your Information</h2>
                <p className="mb-3">We use the information described above for the following purposes:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Provide, maintain, and operate the Service, including running the retrieval-augmented generation pipeline that answers Visitor questions from your knowledge base.</li>
                  <li>Authenticate users, enforce plan limits, and prevent abuse.</li>
                  <li>Generate lead-qualification signals (for example, BANT or MEDDIC scoring) and surface those signals to the customer who owns the conversation.</li>
                  <li>Send transactional emails such as account verification, password resets, billing notifications, and webhook failure alerts.</li>
                  <li>Process payments, issue invoices, and meet tax and accounting obligations.</li>
                  <li>Monitor platform health, debug errors, and investigate security incidents.</li>
                  <li>Improve the Service through aggregated, anonymized analytics. <strong className="text-white/80">We do not use Customer or Visitor conversation content to train large language models, ours or any third party&apos;s.</strong></li>
                  <li>Comply with applicable law and respond to lawful requests from public authorities.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">5. Legal Bases for Processing (EEA / UK)</h2>
                <p className="mb-3">If you are in the European Economic Area or United Kingdom, we rely on the following legal bases under the GDPR / UK GDPR:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">Performance of a contract</strong> — to deliver the Service you have signed up for.</li>
                  <li><strong className="text-white/80">Legitimate interests</strong> — to secure the Service, prevent abuse, debug errors, and conduct aggregated analytics, balanced against your rights and freedoms.</li>
                  <li><strong className="text-white/80">Consent</strong> — where required (for example, non-essential cookies on our marketing site). You may withdraw consent at any time.</li>
                  <li><strong className="text-white/80">Legal obligation</strong> — to retain billing records, respond to lawful authority requests, and meet tax requirements.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">6. Sub-processors and Data Sharing</h2>
                <p className="mb-3"><strong className="text-white/80">We do not sell your personal information.</strong> We share data only with the sub-processors and partners listed below, each engaged under written agreements that require equivalent protections. The current list of sub-processors is:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">OpenAI</strong> (United States) — large language model inference and text embedding generation. Data is sent under OpenAI&apos;s API terms, which exclude API content from model training by default.</li>
                  <li><strong className="text-white/80">Google (Gemini)</strong> (United States) — large language model inference used as a fallback when OpenAI is unavailable, and for retrieval-quality scoring.</li>
                  <li><strong className="text-white/80">Cloudflare</strong> (United States) — file and media storage via Cloudflare R2, plus CDN delivery for the embeddable widget.</li>
                  <li><strong className="text-white/80">Brevo</strong> (European Union) — transactional email delivery.</li>
                  <li><strong className="text-white/80">Sentry</strong> (United States) — application error tracking and performance monitoring.</li>
                  <li><strong className="text-white/80">Stripe</strong> (United States / Ireland) — international card and bank payment processing.</li>
                  <li><strong className="text-white/80">Razorpay</strong> (India) — INR card, UPI, and net-banking payment processing for India-based customers.</li>
                  <li><strong className="text-white/80">DigitalOcean</strong> (United States) — primary application and database hosting.</li>
                  <li><strong className="text-white/80">Vercel</strong> (United States) — hosting for our marketing site and customer dashboard front-end.</li>
                </ul>
                <p className="mt-3">We may add or change sub-processors from time to time. Material changes affecting how Customer data is handled will be communicated via email or in-product notice with at least 30 days&apos; advance notice where reasonably possible. We may also disclose information when required by law, to protect the rights, property, or safety of OyeChats, our customers, or others, or in connection with a corporate transaction such as a merger or acquisition, in which case we will notify affected customers.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">7. International Data Transfers</h2>
                <p>OyeChats is operated from India and uses sub-processors located in India, the United States, the European Union, and other jurisdictions. Where personal data is transferred out of the EEA, UK, or India, we rely on appropriate safeguards such as the European Commission&apos;s Standard Contractual Clauses, the UK International Data Transfer Addendum, or equivalent mechanisms permitted under the Digital Personal Data Protection Act, 2023. A copy of the relevant transfer mechanism is available on request.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">8. Data Retention</h2>
                <p className="mb-3">We retain personal information only as long as needed for the purposes described in this policy:</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong className="text-white/80">Account data:</strong> Retained for the life of the account and deleted (or anonymized) within 30 days of account closure, except where longer retention is required by law.</li>
                  <li><strong className="text-white/80">Conversation history:</strong> Retained according to your plan — 7 days on Free, 90 days on Pro, and indefinitely on Enterprise — unless a shorter custom retention period is configured in your dashboard settings.</li>
                  <li><strong className="text-white/80">Knowledge base content:</strong> Retained until you delete it or close your account.</li>
                  <li><strong className="text-white/80">Diagnostic and error logs:</strong> Retained for up to 90 days.</li>
                  <li><strong className="text-white/80">Audit logs of administrative actions:</strong> Retained for up to 12 months.</li>
                  <li><strong className="text-white/80">Billing records and invoices:</strong> Retained for the period required under applicable tax and accounting law, typically 7 years.</li>
                  <li><strong className="text-white/80">Backups:</strong> Encrypted database backups are retained for up to 30 days before automatic rotation.</li>
                </ul>
                <p className="mt-3">You may request earlier deletion of Visitor or account data by writing to <a href="mailto:privacy@oyechats.com" className="text-blue-400 hover:text-blue-300">privacy@oyechats.com</a>. Requests will be honored within 30 days unless a legal hold applies.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">9. Security</h2>
                <p>We apply technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction. These include encryption in transit (TLS 1.3 for all API and widget traffic), encryption at rest for primary databases and object storage, role-based access controls on production systems, audit logging of administrative actions, and dedicated environments for production and non-production workloads. Production access is restricted to a small number of authorized personnel under multi-factor authentication.</p>
                <p className="mt-3">No system can be guaranteed perfectly secure. If you discover a vulnerability, please report it to <a href="mailto:security@oyechats.com" className="text-blue-400 hover:text-blue-300">security@oyechats.com</a> under our responsible disclosure policy. We do not currently hold formal compliance certifications such as SOC 2 or ISO 27001; we will update this policy when that changes.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">10. Data Breach Notification</h2>
                <p>If we become aware of a personal data breach that is likely to result in a risk to the rights and freedoms of affected individuals, we will notify our customers without undue delay and, where required, the relevant supervisory authority within 72 hours of becoming aware. Customers are responsible for notifying their own Visitors and any applicable regulators in respect of Visitor data, with our reasonable assistance.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">11. Your Rights</h2>
                <p className="mb-3">Depending on where you live, you have rights over your personal information. We honor verified requests regardless of residency wherever practical.</p>
                <p className="mb-3"><strong className="text-white/80">If you are in the EEA, UK, or Switzerland (GDPR / UK GDPR):</strong> the rights to access, rectification, erasure, restriction of processing, data portability, and objection; the right not to be subject to solely automated decision-making with significant effects; and the right to lodge a complaint with your local supervisory authority.</p>
                <p className="mb-3"><strong className="text-white/80">If you are a California resident (CCPA / CPRA):</strong> the rights to know what we collect, to delete personal information, to correct inaccurate information, to opt out of any sale or sharing of personal information (we do not sell or share for cross-context behavioral advertising), and to limit the use of sensitive personal information. We will not discriminate against you for exercising these rights.</p>
                <p className="mb-3"><strong className="text-white/80">If you are in India (DPDP Act, 2023):</strong> the rights to obtain a summary of personal data processed, to correction and erasure, to nominate another individual to exercise your rights in case of incapacity, and to grievance redressal.</p>
                <p>To exercise any of these rights, write to <a href="mailto:privacy@oyechats.com" className="text-blue-400 hover:text-blue-300">privacy@oyechats.com</a> from the email associated with your account, or use the self-service deletion controls in your dashboard. We may need to verify your identity before fulfilling a request and will respond within the timelines required by applicable law (typically 30 days). Visitor rights requests should generally be directed to the customer operating the website you interacted with; we will assist with verified requests forwarded by that customer.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">12. Children&apos;s Privacy</h2>
                <p>OyeChats is intended for use by businesses and is not directed to children. We do not knowingly collect personal information from children under the age of 16 (or under 18 where required by local law, including India under the DPDP Act). If you believe a child has provided us personal information, please contact us and we will delete it.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">13. Cookies and Similar Technologies</h2>
                <p className="mb-3">We use a small number of strictly necessary cookies on oyechats.com and the customer dashboard for session management, authentication, and CSRF protection. We do not use third-party advertising or cross-site tracking cookies on our own properties.</p>
                <p className="mb-3">The embeddable chat widget does not set cookies. It stores a single session identifier in the browser&apos;s <code>localStorage</code> to maintain conversation continuity within the same browser. On Pro and Enterprise plans, customers may enable a cookie-free and storage-free mode for use on websites that operate without persistent visitor identifiers.</p>
                <p>We honor the Global Privacy Control (GPC) signal where transmitted by your browser.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">14. Automated Decision-Making</h2>
                <p>OyeChats generates qualification signals (such as BANT or MEDDIC scoring) and conversation summaries using large language models. These outputs are decision-support information for the customer who owns the conversation; they do not by themselves produce legal or similarly significant effects on a Visitor. Customers remain responsible for any subsequent decisions they take based on these signals.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">15. Third-Party Links</h2>
                <p>Our website and the chat widget may contain links to third-party sites or content provided by our customers. We are not responsible for the privacy practices of those third parties. You should review their privacy policies independently.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">16. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in our practices, the Service, or applicable law. The &quot;Last updated&quot; date at the top of this page indicates when it was last revised. Material changes will be communicated via email to account administrators or via in-product notice at least 30 days in advance where reasonably possible. Your continued use of the Service after the effective date constitutes acceptance of the revised policy.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold text-white mb-3">17. Contact Us</h2>
                <p className="mb-3">For privacy questions, requests, or complaints, please contact:</p>
                <ul className="space-y-1 list-none">
                  <li><strong className="text-white/80">Privacy:</strong> <a href="mailto:privacy@oyechats.com" className="text-blue-400 hover:text-blue-300">privacy@oyechats.com</a></li>
                  <li><strong className="text-white/80">Security:</strong> <a href="mailto:security@oyechats.com" className="text-blue-400 hover:text-blue-300">security@oyechats.com</a></li>
                  <li><strong className="text-white/80">General:</strong> <a href="mailto:developer@oyechats.com" className="text-blue-400 hover:text-blue-300">developer@oyechats.com</a></li>
                </ul>
                <p className="mt-3">If you are in the EEA or UK and we do not resolve your concern, you may lodge a complaint with your local data protection authority. If you are in India, you may approach the Data Protection Board of India after first writing to our grievance address above.</p>
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
