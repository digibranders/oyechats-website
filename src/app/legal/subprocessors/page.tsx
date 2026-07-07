import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const SUBPROCESSORS_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'infrastructure', label: 'Infrastructure and Hosting' },
  { id: 'ai-providers', label: 'AI Model Providers' },
  { id: 'communications', label: 'Communications and Notifications' },
  { id: 'payments', label: 'Payment Processing' },
  { id: 'observability', label: 'Observability and Error Tracking' },
  { id: 'integrations', label: 'Optional Customer-Enabled Integrations' },
  { id: 'transfers', label: 'International Data Transfers' },
  { id: 'updates', label: 'Updates to This List' },
  { id: 'contact', label: 'Contact' },
];

export const metadata: Metadata = {
  title: 'Subprocessors List',
  description:
    'The current list of third-party sub-processors OyeChats engages to deliver the Services, along with their location and purpose.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/subprocessors' },
};

type Row = {
  name: string;
  purpose: string;
  location: string;
};

const INFRASTRUCTURE: Row[] = [
  {
    name: 'DigitalOcean',
    purpose: 'Primary application servers and managed PostgreSQL database hosting.',
    location: 'United States (Bangalore region available for Enterprise)',
  },
  {
    name: 'Cloudflare',
    purpose:
      'Object storage for uploaded knowledge base files via Cloudflare R2, and CDN delivery of the embeddable widget bundle.',
    location: 'Global edge network',
  },
  {
    name: 'Vercel',
    purpose: 'Hosting for the marketing site (oyechats.com) and customer dashboard front-end (app.oyechats.com).',
    location: 'United States',
  },
];

const AI: Row[] = [
  {
    name: 'OpenAI',
    purpose:
      "Primary large language model inference (chat completion) and text embedding generation. API content is excluded from model training by default under OpenAI's API terms.",
    location: 'United States',
  },
  {
    name: 'Google (Gemini API)',
    purpose:
      'Fallback large language model inference when the primary provider is unavailable, and retrieval-quality scoring.',
    location: 'United States',
  },
];

const COMMS: Row[] = [
  {
    name: 'Brevo (Sendinblue)',
    purpose: 'Transactional email delivery, account verification, password resets, operator notifications, and lead alerts.',
    location: 'European Union',
  },
];

const PAYMENTS: Row[] = [
  {
    name: 'Stripe',
    purpose: 'International card and bank payment processing, invoicing, and tax handling.',
    location: 'United States / Ireland',
  },
  {
    name: 'Razorpay',
    purpose: 'INR card, UPI, and net-banking payment processing for India-based customers.',
    location: 'India',
  },
];

// const OBSERVABILITY: Row[] = [
//   {
//     name: 'Sentry',
//     purpose: 'Application error tracking and performance monitoring across API, dashboard, and widget.',
//     location: 'United States',
//   },
// ];

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/60">
            <th className="px-4 py-3 font-medium w-1/4">Sub-processor</th>
            <th className="px-4 py-3 font-medium">Purpose</th>
            <th className="px-4 py-3 font-medium w-1/4">Location</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              className={i < rows.length - 1 ? 'border-b border-white/5' : ''}
            >
              <td className="px-4 py-3 align-top text-white/85 font-medium">{row.name}</td>
              <td className="px-4 py-3 align-top text-white/65">{row.purpose}</td>
              <td className="px-4 py-3 align-top text-white/55">{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SubprocessorsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="subprocessors" sections={SUBPROCESSORS_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Subprocessors List</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: April 16, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-10 text-white/65">
                <section id="overview" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Overview</h2>
                  <p className="mb-3">
                    A &quot;sub-processor&quot; is a third party we engage to process Customer Data on our behalf in order
                    to deliver the OyeChats Services. We use sub-processors selectively, and each one is engaged under a
                    written agreement that requires data protection terms at least as protective as those in our{' '}
                    <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a> and{' '}
                    <a href="/legal/dpa" className="text-blue-400 hover:text-blue-300">Data Processing Addendum</a>.
                  </p>
                  <p>
                    This page reflects the current list of sub-processors. We do not sell personal information. Customers
                    can subscribe to change notifications through the in-product notification center or by writing to{' '}
                    <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">
                      support@oyechats.com
                    </a>.
                  </p>
                </section>

                <section id="infrastructure" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Infrastructure and Hosting</h2>
                  <p className="mb-4">
                    These providers host the application servers, databases, file storage, and front-end delivery that make
                    up the OyeChats platform.
                  </p>
                  <Table rows={INFRASTRUCTURE} />
                </section>

                <section id="ai-providers" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">AI Model Providers</h2>
                  <p className="mb-4">
                    Conversation messages and knowledge base content are sent to these providers at query time to generate
                    responses and embeddings. We do not authorize them to use Customer Data to train general-purpose
                    foundation models.
                  </p>
                  <Table rows={AI} />
                </section>

                <section id="communications" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Communications and Notifications</h2>
                  <p className="mb-4">
                    Used to deliver transactional emails, account and security events, operator notifications, and lead
                    alerts triggered by your Bot.
                  </p>
                  <Table rows={COMMS} />
                </section>

                <section id="payments" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Payment Processing</h2>
                  <p className="mb-4">
                    Card numbers and bank account details are processed and stored by these providers and do not reach
                    OyeChats servers. We retain only billing metadata such as plan, invoice history, and the last four
                    digits of the payment instrument.
                  </p>
                  <Table rows={PAYMENTS} />
                </section>

                {/* <section id="observability" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Observability and Error Tracking</h2>
                  <p className="mb-4">
                    Receives application logs, stack traces, and performance metrics necessary to detect and debug platform
                    issues. We scrub known personal data fields from error payloads before transmission where feasible.
                  </p>
                  <Table rows={OBSERVABILITY} />
                </section> */}

                <section id="integrations" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">
                    Optional Customer-Enabled Integrations
                  </h2>
                  <p>
                    Customers may choose to connect third-party tools (such as CRMs, ticketing systems, calendars, or
                    analytics services) to their account. These integrations are not engaged by OyeChats as
                    sub-processors, they are processors of Customer Data acting on the customer&apos;s direct
                    instructions. Each integration is governed by the third party&apos;s own terms and privacy policy.
                    Customers are responsible for reviewing and accepting those terms before enabling an integration.
                  </p>
                </section>

                <section id="transfers" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">International Data Transfers</h2>
                  <p>
                    Several sub-processors operate outside India, the EEA, or the UK. Where personal data is transferred
                    across these borders, OyeChats relies on appropriate safeguards, typically the European
                    Commission&apos;s Standard Contractual Clauses, the UK International Data Transfer Addendum, or
                    equivalent mechanisms recognized under the Digital Personal Data Protection Act, 2023. A copy of the
                    transfer mechanism applicable to a given sub-processor is available on request to{' '}
                    <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">
                      support@oyechats.com
                    </a>.
                  </p>
                </section>

                <section id="updates" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Updates to This List</h2>
                  <p className="mb-3">
                    We may add, remove, or replace sub-processors from time to time as our infrastructure evolves. For
                    material changes that affect how Customer Data is handled, we will provide at least 30 days&apos;
                    advance notice by email to account administrators or by in-product notice, where reasonably possible.
                  </p>
                  <p>
                    During the notice period, customers on plans that include a written Data Processing Addendum may object
                    to a new sub-processor on reasonable data-protection grounds, in which case the parties will discuss in
                    good faith a workable alternative. If no alternative is available, the objecting customer may terminate
                    the affected portion of the Services and receive a pro-rata refund of pre-paid, unused fees.
                  </p>
                </section>

                <section id="contact" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Contact</h2>
                  <p>
                    Questions about our sub-processors or this list? Write to{' '}
                    <a href="mailto:support@oyechats.com" className="text-blue-400 hover:text-blue-300">
                      support@oyechats.com
                    </a>{' '}
                    and we will respond within 14 days.
                  </p>
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
