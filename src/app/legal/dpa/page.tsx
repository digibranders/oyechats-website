import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const DPA_SECTIONS = [
  { id: 'introduction', label: 'Introduction and Applicability' },
  { id: 'definitions', label: 'Definitions' },
  { id: 'roles', label: 'Roles of the Parties' },
  { id: 'scope', label: 'Scope and Purpose of Processing' },
  { id: 'data-categories', label: 'Data Subjects and Personal Data' },
  { id: 'instructions', label: 'Processing Instructions' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'security', label: 'Security Measures' },
  { id: 'subprocessors', label: 'Sub-processors' },
  { id: 'data-subject-rights', label: 'Data Subject Rights Assistance' },
  { id: 'breach-notification', label: 'Breach Notification' },
  { id: 'retention-deletion', label: 'Data Retention and Deletion' },
  { id: 'transfers', label: 'International Data Transfers' },
  { id: 'audits', label: 'Audit Rights' },
  { id: 'liability', label: 'Liability' },
  { id: 'general', label: 'Term, Precedence, and Changes' },
  { id: 'contact', label: 'Contact' },
];

export const metadata: Metadata = {
  title: 'Data Processing Addendum',
  description:
    'The OyeChats Data Processing Addendum governing how we process personal data on behalf of our customers.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/dpa' },
};

type SubprocessorRow = {
  name: string;
  purpose: string;
  location: string;
};

const SUBPROCESSORS: SubprocessorRow[] = [
  {
    name: 'DigitalOcean',
    purpose: 'Application server and managed database hosting.',
    location: 'India / United States',
  },
  {
    name: 'Cloudflare (R2)',
    purpose:
      'Object storage for uploaded knowledge base files and CDN delivery of the embeddable widget.',
    location: 'Global edge network',
  },
  {
    name: 'OpenAI',
    purpose:
      'Large language model inference and embedding generation over chat messages and knowledge base content.',
    location: 'United States',
  },
  {
    name: 'Google (Gemini API)',
    purpose:
      'Large language model inference and embedding generation over chat messages and knowledge base content.',
    location: 'United States',
  },
  {
    name: 'Brevo',
    purpose: 'Transactional email delivery, including lead alerts and account notifications.',
    location: 'European Union',
  },
  {
    name: 'Razorpay',
    purpose:
      'Payment processing. Card and bank details are collected directly by Razorpay and do not reach OyeChats servers.',
    location: 'India',
  },
  {
    name: 'Sentry',
    purpose: 'Application error monitoring and diagnostics.',
    location: 'United States',
  },
  {
    name: 'Langfuse',
    purpose:
      'LLM observability: tracing of chat interactions to monitor and debug response quality.',
    location: 'European Union',
  },
];

export default function DpaPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="dpa" sections={DPA_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Data Processing Addendum</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: July 7, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/65">
                <section id="introduction" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">1. Introduction and Applicability</h2>
                  <p className="mb-3">This Data Processing Addendum (&quot;DPA&quot;) forms part of the <a href="/legal/terms" className="text-blue-400 hover:text-blue-300">Terms of Service</a> (the &quot;Agreement&quot;) between OyeChats, a brand of Digibranders Pvt Ltd, India (&quot;OyeChats,&quot; &quot;we,&quot; &quot;us&quot;), and the customer that has entered into the Agreement (&quot;Customer,&quot; &quot;you&quot;). It applies whenever OyeChats processes Personal Data on your behalf in the course of providing the Services, for example, when Visitors chat with a Bot you have deployed, submit their contact details through lead capture, or when you upload knowledge base documents that contain personal information.</p>
                  <p>This DPA is designed to satisfy the requirements that apply to a data processor under the Digital Personal Data Protection Act, 2023 (India) (&quot;DPDP Act&quot;) and, where your processing is subject to it, the EU General Data Protection Regulation 2016/679 and the UK GDPR (together, &quot;GDPR&quot;). By accepting the Agreement, you also accept this DPA. If you require a countersigned copy for your records, contact <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>.</p>
                </section>

                <section id="definitions" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">2. Definitions</h2>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong className="text-white/80">&quot;Personal Data&quot;</strong> means any information relating to an identified or identifiable natural person that OyeChats processes on your behalf as part of Customer Data (as defined in the Agreement).</li>
                    <li><strong className="text-white/80">&quot;Data Protection Laws&quot;</strong> means all laws applicable to the processing of Personal Data under this DPA, including the DPDP Act and, where applicable, the GDPR, and equivalent laws of other jurisdictions.</li>
                    <li><strong className="text-white/80">&quot;Controller,&quot; &quot;Processor,&quot; &quot;Data Subject,&quot; &quot;Processing,&quot;</strong> and <strong className="text-white/80">&quot;Personal Data Breach&quot;</strong> have the meanings given to them in the GDPR. Under the DPDP Act, &quot;Controller&quot; corresponds to &quot;Data Fiduciary,&quot; &quot;Processor&quot; to &quot;Data Processor,&quot; and &quot;Data Subject&quot; to &quot;Data Principal.&quot;</li>
                    <li><strong className="text-white/80">&quot;Sub-processor&quot;</strong> means a third party engaged by OyeChats to process Personal Data on your behalf in order to deliver the Services.</li>
                    <li><strong className="text-white/80">&quot;Visitor,&quot; &quot;Bot,&quot; &quot;Authorized User,&quot;</strong> and <strong className="text-white/80">&quot;Customer Data&quot;</strong> have the meanings given in the Agreement.</li>
                  </ul>
                </section>

                <section id="roles" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">3. Roles of the Parties</h2>
                  <p className="mb-3">For Personal Data processed under this DPA, you are the Controller (Data Fiduciary under the DPDP Act) and OyeChats is your Processor (Data Processor). You determine the purposes and means of the processing, for example, which websites the widget is deployed on, what knowledge base content the Bot answers from, whether lead capture is enabled, and what retention settings apply. OyeChats processes Personal Data only on your behalf and on your documented instructions.</p>
                  <p>Separately, OyeChats acts as an independent Controller for the account data of its own customers (such as your login credentials, billing records, and support correspondence). That processing is described in our <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a> and is not governed by this DPA.</p>
                </section>

                <section id="scope" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">4. Scope and Purpose of Processing</h2>
                  <p className="mb-3">OyeChats processes Personal Data for the following purposes and no others:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Operating the chat widget and generating AI responses to Visitor messages, including retrieval over the knowledge base content you provide.</li>
                    <li>Storing chat transcripts, lead capture submissions, and Visitor metadata so that you and your Authorized Users can review them in the dashboard.</li>
                    <li>Routing conversations to your operators for live chat and delivering the notifications you configure (such as lead alerts by email or webhook).</li>
                    <li>Producing analytics and lead qualification scores for your account based on conversation content.</li>
                    <li>Securing, supporting, and troubleshooting the Services, including error monitoring and abuse prevention.</li>
                  </ul>
                  <p className="mt-3">The duration of processing is the term of the Agreement plus the deletion period described in Section 12. We will not use Personal Data processed under this DPA to train general-purpose foundation models, and we do not authorize our AI Sub-processors to do so.</p>
                </section>

                <section id="data-categories" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">5. Categories of Data Subjects and Personal Data</h2>
                  <p className="mb-3"><strong className="text-white/80">Data Subjects.</strong> Visitors who interact with a Bot on your websites; prospects and leads who submit contact details through the widget; and your Authorized Users (operators and administrators) whose activity is recorded in the Services.</p>
                  <p className="mb-3"><strong className="text-white/80">Categories of Personal Data.</strong></p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Chat message content submitted by Visitors, which may contain any personal information a Visitor chooses to type.</li>
                    <li>Contact details collected through lead capture: names, email addresses, and phone numbers.</li>
                    <li>Visitor technical metadata: IP address, browser and device information, page URLs, referrer, and UTM parameters.</li>
                    <li>Personal Data contained in knowledge base documents and URLs you upload or connect for the Bot to answer from.</li>
                    <li>Operator data: names, email addresses, and activity logs of your Authorized Users.</li>
                  </ul>
                  <p className="mt-3">The Services are not designed for, and you agree not to submit, special categories of data under the GDPR (such as health, biometric, or genetic data), payment card data, or government identifiers, whether in chat flows or knowledge base content, unless we have agreed to it in writing with appropriate safeguards.</p>
                </section>

                <section id="instructions" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">6. Processing Instructions</h2>
                  <p className="mb-3">OyeChats will process Personal Data only on your documented instructions, including with regard to international transfers, unless required to do otherwise by applicable law (in which case we will inform you of that legal requirement before processing, unless the law prohibits it). Your instructions are: (a) the Agreement and this DPA; (b) your configuration of the Services through the dashboard and APIs (for example, retention settings, lead capture fields, and enabled integrations); and (c) any additional written instructions agreed between the parties.</p>
                  <p>We will promptly inform you if, in our opinion, an instruction infringes Data Protection Laws. We may suspend performance of an instruction we reasonably believe to be unlawful until it is confirmed or modified.</p>
                </section>

                <section id="confidentiality" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">7. Confidentiality</h2>
                  <p>We ensure that all personnel authorized to process Personal Data are bound by written confidentiality obligations or are under an appropriate statutory obligation of confidentiality, and that access is limited to personnel who need it to perform their role. Personal Data processed under this DPA is also Confidential Information under the Agreement.</p>
                </section>

                <section id="security" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">8. Security Measures</h2>
                  <p className="mb-3">Taking into account the nature of the processing and the risks to Data Subjects, OyeChats implements and maintains appropriate technical and organizational measures designed to protect Personal Data, including:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Encryption of Personal Data in transit using TLS.</li>
                    <li>Encryption at rest for primary databases and object storage.</li>
                    <li>Logical tenant isolation: each customer&apos;s data is scoped to their account and bot keys, and is not accessible to other customers.</li>
                    <li>Role-based access controls and least-privilege access to production systems, with authentication required for all administrative access.</li>
                    <li>Audit logging of administrative and operator actions.</li>
                    <li>A documented incident response process and regular review of security practices.</li>
                  </ul>
                  <p className="mt-3">We may update these measures from time to time, provided the updates do not materially reduce the overall protection of Personal Data. We do not currently hold third-party security certifications; our practices are described honestly in the <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a> and we will answer reasonable security questionnaires as described in Section 14.</p>
                </section>

                <section id="subprocessors" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">9. Sub-processors</h2>
                  <p className="mb-4">You provide a general authorization for OyeChats to engage Sub-processors to deliver the Services. We impose data protection obligations on each Sub-processor by written contract that are no less protective than those in this DPA, and we remain liable to you for their performance. The Sub-processors we currently engage are:</p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] mb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-left text-white/60">
                          <th className="px-4 py-3 font-medium w-1/4">Sub-processor</th>
                          <th className="px-4 py-3 font-medium">Purpose</th>
                          <th className="px-4 py-3 font-medium w-1/4">Location</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SUBPROCESSORS.map((row, i) => (
                          <tr key={row.name} className={i < SUBPROCESSORS.length - 1 ? 'border-b border-white/5' : ''}>
                            <td className="px-4 py-3 align-top text-white/85 font-medium">{row.name}</td>
                            <td className="px-4 py-3 align-top text-white/65">{row.purpose}</td>
                            <td className="px-4 py-3 align-top text-white/55">{row.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mb-3">The maintained list, including providers that support the wider platform, is published at <a href="/legal/subprocessors" className="text-blue-400 hover:text-blue-300">oyechats.com/legal/subprocessors</a>.</p>
                  <p><strong className="text-white/80">Changes.</strong> We will give you at least 30 days&apos; advance notice before adding or replacing a Sub-processor that processes Personal Data, by email to your account administrators or by in-product notice. You may object within the notice period on reasonable data-protection grounds, in which case the parties will discuss a workable alternative in good faith. If no alternative is available, you may terminate the affected portion of the Services and receive a pro-rata refund of pre-paid, unused fees.</p>
                </section>

                <section id="data-subject-rights" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">10. Data Subject Rights Assistance</h2>
                  <p className="mb-3">Taking into account the nature of the processing, OyeChats will assist you, through the features of the Services and, where those are insufficient, through reasonable direct assistance, in fulfilling your obligation to respond to Data Subject requests to access, correct, delete, restrict, or port their Personal Data (including requests from Data Principals under the DPDP Act). The dashboard lets you search conversations by Visitor identifiers, export transcripts and lead records, and delete individual conversations and leads.</p>
                  <p>If a Data Subject contacts OyeChats directly about Personal Data we process on your behalf, we will not respond substantively (except to direct them to you) and will forward the request to you without undue delay.</p>
                </section>

                <section id="breach-notification" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">11. Personal Data Breach Notification</h2>
                  <p className="mb-3">OyeChats will notify you without undue delay, and in any event within 72 hours, after becoming aware of a Personal Data Breach affecting Personal Data processed on your behalf. The notification will describe, to the extent then known, the nature of the breach, the categories and approximate number of Data Subjects and records affected, the likely consequences, and the measures taken or proposed to address it and mitigate its effects. We will provide updates as material new information becomes available.</p>
                  <p>We will reasonably cooperate with your own notification obligations to supervisory authorities (including the Data Protection Board of India) and to affected Data Subjects. Our notification of a breach is not an acknowledgement of fault or liability.</p>
                </section>

                <section id="retention-deletion" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">12. Data Retention and Deletion</h2>
                  <p className="mb-3">During the term of the Agreement, Personal Data is retained according to the retention settings available in the dashboard and the schedule described in the Privacy Policy. You can delete conversations, leads, and knowledge base documents at any time through the dashboard, and deletion requests are propagated to our storage systems.</p>
                  <p>On termination or expiry of the Agreement, you may export Customer Data for up to 30 days. After that export window, OyeChats will delete or irreversibly anonymize all Personal Data processed on your behalf within 30 days, including copies held by Sub-processors, except where retention is required by applicable law (for example, financial records) or the data resides in encrypted backups, which are deleted on their standard rotation cycle of no more than 90 days. On written request, we will confirm deletion.</p>
                </section>

                <section id="transfers" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">13. International Data Transfers</h2>
                  <p>Several Sub-processors operate outside India, the EEA, and the UK, as shown in Section 9. Where Personal Data subject to the GDPR is transferred to a country without an adequacy decision, OyeChats relies on appropriate safeguards, typically the European Commission&apos;s Standard Contractual Clauses (and the UK International Data Transfer Addendum, where applicable) entered into with the relevant Sub-processor. For Personal Data subject to the DPDP Act, transfers are made only to countries not restricted by the Central Government of India. Details of the transfer mechanism applicable to a given Sub-processor are available on request to <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>.</p>
                </section>

                <section id="audits" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">14. Audit Rights</h2>
                  <p className="mb-3">OyeChats will make available to you the information reasonably necessary to demonstrate compliance with this DPA. In the first instance, we satisfy audit requests through written responses to security and privacy questionnaires and copies of relevant policy documentation, provided within 30 days of a written request (no more than once per 12-month period, unless required by a supervisory authority or following a Personal Data Breach affecting your data).</p>
                  <p>Where Data Protection Laws grant you a mandatory audit right that cannot be satisfied by documentation, you (or an independent auditor bound by confidentiality, who is not a competitor of OyeChats) may conduct an audit at your expense, during business hours, on at least 30 days&apos; written notice, in a manner that does not disrupt the Services or compromise the security of other customers&apos; data.</p>
                </section>

                <section id="liability" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">15. Liability</h2>
                  <p>Each party&apos;s liability arising out of or related to this DPA is subject to the limitations and exclusions of liability in the Agreement, and any liability under this DPA counts toward, and is not additional to, the aggregate liability cap in the Agreement. Nothing in this section limits liability that cannot be limited under applicable Data Protection Laws.</p>
                </section>

                <section id="general" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">16. Term, Order of Precedence, and Changes</h2>
                  <p className="mb-3">This DPA takes effect when you accept the Agreement and remains in force for as long as OyeChats processes Personal Data on your behalf, including the deletion period in Section 12. In the event of a conflict between this DPA and the Agreement with respect to the processing of Personal Data, this DPA prevails. If any executed transfer mechanism (such as Standard Contractual Clauses) conflicts with this DPA, the transfer mechanism prevails to the extent of the conflict.</p>
                  <p>We may update this DPA from time to time to reflect changes in Data Protection Laws or our processing practices. For material changes, we will provide at least 30 days&apos; notice by email to your account administrators or by in-product notice. The &quot;Last updated&quot; date at the top of this page indicates when it was last revised.</p>
                </section>

                <section id="contact" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">17. Contact</h2>
                  <p>Questions about this DPA, requests for a countersigned copy, or data protection inquiries can be sent to <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">support@oyechats.com</a>. OyeChats is a brand of Digibranders Pvt Ltd, India.</p>
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
