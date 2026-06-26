import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const TERMS_SECTIONS = [
  { id: 'definitions', label: 'Definitions' },
  { id: 'oyechats-services', label: 'OyeChats Services' },
  { id: 'customer-data', label: 'Customer Data and Customer Obligations' },
  { id: 'security', label: 'Security' },
  { id: 'third-party', label: 'Third-Party Platforms and Third Party Apps' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'subscription', label: 'Subscription Term, Fees & Payment' },
  { id: 'term-and-termination', label: 'Term and Termination' },
  { id: 'limited-warranty', label: 'Limited Warranty' },
  { id: 'availability', label: 'Availability' },
  { id: 'support', label: 'Support' },
  { id: 'limitation-of-liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'confidential-information', label: 'Confidential Information' },
  { id: 'publicity', label: 'Publicity' },
  { id: 'general-terms', label: 'General Terms' },
];

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'OyeChats Terms of Service, the legal agreement governing your use of the platform.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/terms' },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="terms" sections={TERMS_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: April 16, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
                <section>
                  <p>These Terms of Service (the &quot;Agreement&quot;) form a binding contract between OyeChats (&quot;OyeChats,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) and the entity or person agreeing to them (&quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;). The Agreement governs your access to and use of the OyeChats platform, including our website at oyechats.com, the customer dashboard at app.oyechats.com, our REST and WebSocket APIs, and the embeddable chat widget (collectively, the &quot;Services&quot;). By signing up for an account, clicking &quot;I agree,&quot; or otherwise using the Services, you confirm that you have read, understood, and agree to be bound by this Agreement. If you are agreeing on behalf of an organization, you represent that you have authority to bind that organization to this Agreement.</p>
                </section>

                <section id="definitions" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">1. Definitions</h2>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong className="text-white/80">&quot;Account&quot;</strong> means the account you create to access and administer the Services.</li>
                    <li><strong className="text-white/80">&quot;Bot&quot;</strong> means a chatbot instance you configure on the platform, identified by a unique bot key.</li>
                    <li><strong className="text-white/80">&quot;Customer Data&quot;</strong> means all data, content, and information that you, your Authorized Users, or your Visitors submit to or generate through the Services, including knowledge base documents, bot configuration, chat transcripts, lead-capture submissions, and operator activity.</li>
                    <li><strong className="text-white/80">&quot;Authorized User&quot;</strong> means an employee, contractor, or operator you authorize to access the Services on your behalf.</li>
                    <li><strong className="text-white/80">&quot;Visitor&quot;</strong> means an end user who interacts with a Bot on a website where you have deployed the widget.</li>
                    <li><strong className="text-white/80">&quot;Documentation&quot;</strong> means the user guides and technical reference materials we publish at oyechats.com and within the customer dashboard.</li>
                    <li><strong className="text-white/80">&quot;Order&quot;</strong> means the online sign-up, in-product upgrade flow, or written order form by which you subscribe to a plan.</li>
                    <li><strong className="text-white/80">&quot;Subscription Term&quot;</strong> means the period for which a plan is in effect under an Order.</li>
                    <li><strong className="text-white/80">&quot;Third Party Apps&quot;</strong> means software, integrations, or services provided by a party other than OyeChats that interoperate with the Services.</li>
                  </ul>
                </section>

                <section id="oyechats-services" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">2. OyeChats Services</h2>
                  <p className="mb-3">Subject to your compliance with this Agreement and timely payment of fees, OyeChats grants you a non-exclusive, non-transferable, worldwide right during the Subscription Term to access and use the Services for your internal business purposes, including deploying Bots on websites you own or operate.</p>
                  <p className="mb-3">The Services include a retrieval-augmented generation pipeline that draws answers from the knowledge base you provide. Output quality depends on the content you supply and on the behavior of the underlying language models, which can be probabilistic and occasionally produce inaccurate or incomplete responses. You are responsible for reviewing Bot outputs before relying on them for decisions with material consequences.</p>
                  <p className="mb-3">You will not, and will not permit any Authorized User or third party to:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Use the Services to send spam, malware, or content that is unlawful, infringing, harassing, or otherwise objectionable.</li>
                    <li>Reverse-engineer, decompile, or attempt to extract the source code of the Services, except to the extent applicable law expressly permits.</li>
                    <li>Resell, sublicense, or make the Services available to any third party other than your Authorized Users and the Visitors interacting with your Bots.</li>
                    <li>Access the Services to build a competing product or to benchmark performance for publication without our prior written consent.</li>
                    <li>Exceed documented rate limits, evade plan limits, or use the Services in a way that imposes a disproportionate load on our infrastructure.</li>
                    <li>Misrepresent the Bot&apos;s identity to Visitors, Bots must be reasonably identifiable as automated, in accordance with applicable law.</li>
                  </ul>
                </section>

                <section id="customer-data" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">3. Customer Data and Customer Obligations</h2>
                  <p className="mb-3">As between the parties, you retain all right, title, and interest in and to Customer Data. You grant OyeChats a worldwide, royalty-free license to host, copy, transmit, display, and process Customer Data solely as necessary to provide, secure, and support the Services. We will not use Customer Data, including conversation content, to train general-purpose foundation models.</p>
                  <p className="mb-3">You are responsible for:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>The accuracy, quality, legality, and your right to use Customer Data, including the knowledge base content you upload.</li>
                    <li>Providing all notices and obtaining all consents required under applicable privacy laws before Visitors interact with your Bots, including, where applicable, cookie consent, GDPR Article 13 disclosures, and any notice obligations under the DPDP Act, CCPA, or similar regimes.</li>
                    <li>Configuring data retention, redaction, and access controls available in the dashboard in a manner appropriate to your use case.</li>
                    <li>Maintaining the confidentiality of API keys, bot keys, and operator credentials, and notifying us promptly of any unauthorized use.</li>
                  </ul>
                  <p className="mt-3">Where you process personal data of Visitors through the Services, you act as the controller and OyeChats acts as a processor on your behalf. The Data Processing Addendum (&quot;DPA&quot;) available at oyechats.com/legal/dpa is incorporated by reference and governs that processing.</p>
                </section>

                <section id="security" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">4. Security</h2>
                  <p>We will maintain commercially reasonable administrative, physical, and technical safeguards designed to protect the security, confidentiality, and integrity of Customer Data. These include encryption in transit (TLS 1.3), encryption at rest for primary databases and object storage, role-based access controls on production systems, audit logging, and a documented incident response process. Our current security practices are summarized in the Privacy Policy at oyechats.com/legal/privacy. We may update our safeguards from time to time provided that the updates do not materially reduce the overall security of the Services.</p>
                </section>

                <section id="third-party" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">5. Third-Party Platforms and Third Party Apps</h2>
                  <p className="mb-3">The Services rely on, and can be configured to integrate with, Third Party Apps, including large language model providers (OpenAI, Google), payment processors (Stripe, Razorpay), email delivery (Brevo), object storage (Cloudflare R2), and any integrations you elect to connect such as CRMs, ticketing systems, or analytics tools.</p>
                  <p>Third Party Apps are governed by their own terms and privacy policies. Enabling an integration authorizes OyeChats to transmit Customer Data to that Third Party App to the extent necessary to operate it. We are not responsible for the acts, omissions, security, or availability of Third Party Apps, and your use of them is at your own risk. If a Third Party App ceases to be available or changes its terms, we may modify or discontinue the corresponding feature without liability, while using reasonable efforts to give you advance notice.</p>
                </section>

                <section id="ownership" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">6. Ownership</h2>
                  <p className="mb-3">OyeChats and its licensors retain all right, title, and interest in and to the Services, the Documentation, the widget code we publish, and all underlying software, models, designs, trademarks, and know-how, including any modifications or derivative works. This Agreement grants you only a limited right to use the Services as expressly set out herein; no other rights are granted by implication, estoppel, or otherwise.</p>
                  <p>If you provide feedback, suggestions, or ideas about the Services, you grant us a perpetual, irrevocable, royalty-free license to use them without restriction. We will not identify you as the source of any feedback without your permission.</p>
                </section>

                <section id="subscription" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">7. Subscription Term, Fees &amp; Payment</h2>
                  <p className="mb-3"><strong className="text-white/80">Plans and renewal.</strong> Your Subscription Term begins on the start date in your Order and continues for the period specified (monthly or annually). Unless either party gives notice of non-renewal at least 7 days before the end of the then-current term, the subscription renews automatically for successive periods of equal length at the then-current list price.</p>
                  <p className="mb-3"><strong className="text-white/80">Fees and taxes.</strong> Fees are charged in advance and are non-refundable except where expressly stated or required by law. All fees are exclusive of taxes, duties, and similar charges, which you are responsible for paying. Where required, we will collect and remit applicable GST, VAT, or sales tax.</p>
                  <p className="mb-3"><strong className="text-white/80">Payment.</strong> We process card and bank payments through Stripe (international) and Razorpay (India). You authorize us to charge your designated payment method on a recurring basis until you cancel. If a payment fails, we will retry and may suspend the Services or downgrade your plan if the balance remains unpaid for more than 14 days after notice.</p>
                  <p className="mb-3"><strong className="text-white/80">Usage and overages.</strong> Your plan includes monthly limits (for example, messages, indexed documents, and seats). If you exceed a limit, the Services may degrade gracefully (such as returning a fallback message), and we will notify you to upgrade. We do not silently charge overages without your consent.</p>
                  <p><strong className="text-white/80">Price changes.</strong> We may adjust list prices for future Subscription Terms by giving you at least 30 days&apos; notice before your renewal. If you do not agree to the new pricing, you may decline renewal as described above.</p>
                </section>

                <section id="term-and-termination" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">8. Term and Termination</h2>
                  <p className="mb-3">This Agreement begins when you create an Account and continues until all Subscription Terms expire or the Agreement is terminated as described below.</p>
                  <p className="mb-3"><strong className="text-white/80">Termination for convenience.</strong> You may cancel your subscription at any time from your dashboard. Cancellation stops automatic renewal; the Services remain available until the end of the paid period, and we do not refund partial periods.</p>
                  <p className="mb-3"><strong className="text-white/80">Termination for cause.</strong> Either party may terminate this Agreement for material breach by the other party if the breach is not cured within 14 days after written notice describing it. We may suspend the Services immediately, without prior notice, if your use poses a security risk, could subject us or others to liability, or violates Section 2 (OyeChats Services) in a way that cannot reasonably be deferred.</p>
                  <p className="mb-3"><strong className="text-white/80">Effect of termination.</strong> On termination, your right to access the Services ceases. You may export Customer Data through the dashboard for up to 30 days after termination, after which we will delete or anonymize it in line with the retention schedule in the Privacy Policy, except where longer retention is required by law or to resolve disputes.</p>
                  <p><strong className="text-white/80">Survival.</strong> Sections that by their nature should survive termination, including Ownership, Confidential Information, Indemnification, Limitation of Liability, and General Terms, will survive.</p>
                </section>

                <section id="limited-warranty" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">9. Limited Warranty</h2>
                  <p className="mb-3">OyeChats warrants that the Services will perform materially in accordance with the Documentation during the Subscription Term. As your sole and exclusive remedy for breach of this warranty, we will use commercially reasonable efforts to correct the non-conformity. If we cannot do so within a reasonable period, you may terminate the affected portion of the Services and receive a pro-rata refund of pre-paid fees for the unused remainder of the term.</p>
                  <p>EXCEPT FOR THE EXPRESS WARRANTY IN THIS SECTION, THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, OYECHATS DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTY ARISING FROM A COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT LANGUAGE MODEL OUTPUTS WILL BE ACCURATE, COMPLETE, OR SUITABLE FOR YOUR PURPOSE.</p>
                </section>

                <section id="availability" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">10. Availability</h2>
                  <p>We target 99.9% monthly uptime for paid plans and 99.99% for Enterprise plans. Scheduled maintenance, force majeure events, and the unavailability of upstream Third Party Apps (including language model providers) are excluded from availability calculations. Service Level Agreement credits, where available, are described in your Enterprise Order and are your sole remedy for any failure to meet the targets.</p>
                </section>

                <section id="support" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">11. Support</h2>
                  <p>We provide support through the channels and within the response targets associated with your plan. Free plans receive community and email support on a best-effort basis. Paid plans receive priority email support during business hours, and Enterprise plans may include named contacts and accelerated response targets as specified in the Order. Support requests may be submitted to <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>.</p>
                </section>

                <section id="limitation-of-liability" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">12. Limitation of Liability</h2>
                  <p className="mb-3">TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, GOODWILL, OR DATA, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                  <p className="mb-3">EACH PARTY&apos;S AGGREGATE LIABILITY ARISING OUT OF OR RELATING TO THIS AGREEMENT WILL NOT EXCEED THE FEES YOU PAID OR WERE OBLIGATED TO PAY FOR THE SERVICES IN THE 12 MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.</p>
                  <p>These limitations do not apply to (a) your obligation to pay fees, (b) either party&apos;s indemnification obligations, (c) breach of confidentiality obligations, or (d) liability that cannot be excluded or limited under applicable law.</p>
                </section>

                <section id="indemnification" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">13. Indemnification</h2>
                  <p className="mb-3"><strong className="text-white/80">By OyeChats.</strong> We will defend you against any third-party claim alleging that the Services, when used as authorized under this Agreement, infringe a third party&apos;s intellectual property right, and will pay damages and reasonable costs finally awarded against you or agreed in settlement. If we receive such a claim, we may, at our option: (i) procure for you the right to continue using the Services, (ii) modify the Services so they no longer infringe, or (iii) terminate the affected portion of the Services and refund pre-paid, unused fees. We will have no obligation for any claim arising from your modification of the Services, your combination of the Services with materials not provided by us, or your use of the Services in breach of this Agreement.</p>
                  <p><strong className="text-white/80">By Customer.</strong> You will defend OyeChats against any third-party claim arising out of (i) Customer Data, including allegations that it infringes a third party&apos;s rights or violates applicable law; (ii) your or your Authorized Users&apos; use of the Services in breach of this Agreement; or (iii) your failure to provide required notices or obtain required consents from Visitors, and will pay damages and reasonable costs finally awarded or agreed in settlement.</p>
                  <p className="mt-3">In each case, the indemnified party will give prompt notice of the claim, allow the indemnifying party to control the defense and settlement (provided no settlement admits fault or imposes obligations on the indemnified party without consent), and provide reasonable cooperation at the indemnifying party&apos;s expense.</p>
                </section>

                <section id="confidential-information" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">14. Confidential Information</h2>
                  <p className="mb-3">&quot;Confidential Information&quot; means non-public information disclosed by one party to the other that is identified as confidential or that a reasonable person would understand to be confidential given its nature and the circumstances of disclosure, including pricing, product roadmap details, and Customer Data. Confidential Information does not include information that is or becomes public without breach of this Agreement, was independently developed without reference to Confidential Information, or was rightfully received from a third party without restriction.</p>
                  <p>Each party will (i) use the other&apos;s Confidential Information only to exercise its rights and perform its obligations under this Agreement, (ii) protect it with at least the same care it uses for its own confidential information of like importance and in any event no less than reasonable care, and (iii) limit disclosure to its personnel, advisors, or contractors who have a need to know and are bound by confidentiality obligations at least as protective as those in this Agreement. Disclosures required by law are permitted provided the receiving party gives prompt notice where legally allowed.</p>
                </section>

                <section id="publicity" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">15. Publicity</h2>
                  <p>You grant OyeChats the right to identify you as a customer and to use your name and logo on our website, in our investor and pitch materials, and in routine customer lists, subject to any usage guidelines you provide in writing. Any other use of your name or logo, for example, a quoted testimonial or case study, requires your prior written consent, which may be withdrawn for future use on reasonable notice.</p>
                </section>

                <section id="general-terms" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">16. General Terms</h2>
                  <p className="mb-3"><strong className="text-white/80">Entire agreement.</strong> This Agreement, together with the Privacy Policy, DPA, and any Order, is the entire agreement between the parties on its subject matter and supersedes all prior or contemporaneous understandings.</p>
                  <p className="mb-3"><strong className="text-white/80">Amendments.</strong> We may update this Agreement from time to time. For material changes, we will provide at least 30 days&apos; notice by email to your account administrators or by in-product notice. Your continued use of the Services after the effective date constitutes acceptance.</p>
                  <p className="mb-3"><strong className="text-white/80">Assignment.</strong> Neither party may assign this Agreement without the other party&apos;s prior written consent, except that either party may assign it without consent to a successor in connection with a merger, acquisition, or sale of substantially all of its assets, provided the assignee agrees to be bound by these terms.</p>
                  <p className="mb-3"><strong className="text-white/80">Governing law and venue.</strong> This Agreement is governed by the laws of India, without regard to conflict-of-law principles. The courts located in Bengaluru, Karnataka, India will have exclusive jurisdiction over any dispute, except that either party may seek injunctive relief in any court of competent jurisdiction to protect its intellectual property or Confidential Information.</p>
                  <p className="mb-3"><strong className="text-white/80">Force majeure.</strong> Neither party will be liable for any delay or failure to perform caused by events beyond its reasonable control, including acts of God, war, terrorism, civil disturbance, pandemic, labor disputes, internet or telecommunications failures, or governmental action.</p>
                  <p className="mb-3"><strong className="text-white/80">Notices.</strong> Notices to OyeChats must be sent to <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>. Notices to you may be sent to the email address associated with your Account.</p>
                  <p className="mb-3"><strong className="text-white/80">Severability and waiver.</strong> If any provision of this Agreement is held unenforceable, it will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force. A party&apos;s failure to enforce a provision is not a waiver of its right to do so later.</p>
                  <p><strong className="text-white/80">Independent contractors.</strong> The parties are independent contractors. Nothing in this Agreement creates an agency, partnership, or joint venture between them.</p>
                </section>

                <section>
                  <p>Questions about these Terms? Contact <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>.</p>
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
