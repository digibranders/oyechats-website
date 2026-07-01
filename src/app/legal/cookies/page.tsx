import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LegalSidebar from '../LegalSidebar';

const COOKIE_SECTIONS = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'what-are-cookies', label: 'What are cookies?' },
  { id: 'cookies-we-use', label: 'Cookies on our marketing site and dashboard' },
  { id: 'widget', label: 'The embeddable chat widget' },
  { id: 'third-party', label: 'Third-party cookies' },
  { id: 'your-choices', label: 'Your choices and controls' },
  { id: 'do-not-track', label: 'Do Not Track and Global Privacy Control' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'Questions' },
];

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'How OyeChats uses cookies and similar technologies on oyechats.com, the customer dashboard, and the embeddable chat widget.',
  robots: { index: false },
  alternates: { canonical: 'https://oyechats.com/legal/cookies' },
};

type CookieRow = {
  name: string;
  purpose: string;
  duration: string;
};

const ESSENTIAL: CookieRow[] = [
  {
    name: 'oyechats_session',
    purpose:
      'Keeps you signed in to the customer dashboard between page loads and protects against session fixation.',
    duration: 'Session (cleared on logout)',
  },
  {
    name: 'oyechats_csrf',
    purpose: 'Protects state-changing requests from cross-site request forgery attacks.',
    duration: 'Session',
  },
  {
    name: 'oyechats_consent',
    purpose:
      'Remembers your cookie banner choice on the marketing site so we do not ask again on every visit.',
    duration: '6 months',
  },
];

function Table({ rows }: { rows: CookieRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-white/60">
            <th className="px-4 py-3 font-medium w-1/4">Cookie</th>
            <th className="px-4 py-3 font-medium">Purpose</th>
            <th className="px-4 py-3 font-medium w-1/4">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              className={i < rows.length - 1 ? 'border-b border-white/5' : ''}
            >
              <td className="px-4 py-3 align-top text-white/85 font-mono text-xs">{row.name}</td>
              <td className="px-4 py-3 align-top text-white/65">{row.purpose}</td>
              <td className="px-4 py-3 align-top text-white/55">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[260px_1fr] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <LegalSidebar currentDoc="cookies" sections={COOKIE_SECTIONS} />
              </div>
            </aside>
            <div>
              <h1 className="font-display text-4xl font-bold text-white mb-2">Cookie Policy</h1>
              <p className="text-white/50 text-sm mb-10">Last updated: April 16, 2026</p>

              <div className="prose prose-invert prose-sm max-w-none space-y-10 text-white/65">
                <section id="introduction" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Introduction</h2>
                  <p className="mb-3">
                    This Cookie Policy explains how OyeChats (&quot;OyeChats,&quot; &quot;we,&quot;
                    &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on our marketing
                    site at oyechats.com, the customer dashboard at app.oyechats.com, and the embeddable chat
                    widget our customers deploy on their own websites.
                  </p>
                  <p>
                    It sits alongside our{' '}
                    <a href="/legal/privacy" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>.
                    Read that for the broader picture of how we handle personal data. Where this policy and the
                    Privacy Policy overlap, the Privacy Policy controls.
                  </p>
                </section>

                <section id="what-are-cookies" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">What are cookies?</h2>
                  <p className="mb-3">
                    Cookies are small text files a website places on your device so it can remember you between
                    visits, for example, to keep you logged in or remember a preference. &quot;Similar
                    technologies&quot; covers anything that does roughly the same job: localStorage and
                    sessionStorage in the browser, the IndexedDB API, pixel tags in emails, and software
                    development kits (SDKs).
                  </p>
                  <p>
                    Cookies can be <strong className="text-white/80">first-party</strong> (set by the site
                    you are visiting) or <strong className="text-white/80">third-party</strong> (set by a
                    different service the site embeds). They can be{' '}
                    <strong className="text-white/80">session cookies</strong> (deleted when you close the
                    browser) or <strong className="text-white/80">persistent cookies</strong> (stored for a
                    set period).
                  </p>
                </section>

                <section id="cookies-we-use" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">
                    Cookies on our marketing site and dashboard
                  </h2>
                  <p className="mb-3">
                    We use a small number of strictly-necessary first-party cookies on oyechats.com and
                    app.oyechats.com. We do not run advertising cookies or cross-site tracking pixels on our
                    own properties.
                  </p>
                  <Table rows={ESSENTIAL} />
                </section>

                <section id="widget" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">
                    The embeddable chat widget
                  </h2>
                  <p className="mb-3">
                    The OyeChats chat widget that customers embed on their own websites does <strong className="text-white/80">not</strong>{' '}
                    set cookies. To keep a conversation continuous within the same browser, the widget stores
                    a single anonymous session identifier in <code>localStorage</code> under the key{' '}
                    <code>oyechats_session_id</code>. The identifier carries no personal data and is cleared
                    when the visitor clears their browser storage for the host site.
                  </p>
                </section>

                <section id="third-party" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Third-party cookies</h2>
                  <p>
                    Some payment, support, or analytics features may load assets from third-party domains
                    (such as Stripe or Razorpay during checkout) and those third parties may set their own
                    cookies under their own policies. We document the third-party providers we engage as
                    sub-processors on our{' '}
                    <a href="/legal/subprocessors" className="text-blue-400 hover:text-blue-300">
                      Subprocessors List
                    </a>{' '}
                    page. Visit those providers&apos; websites for details on their cookie practices.
                  </p>
                </section>

                <section id="your-choices" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">
                    Your choices and controls
                  </h2>
                  <p className="mb-3">
                    You can control cookies in several ways:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>
                      <strong className="text-white/80">Browser settings:</strong> most browsers let you
                      block, delete, or be warned about cookies on a per-site basis. Look for the
                      &quot;Privacy&quot; or &quot;Site settings&quot; area in your browser&apos;s preferences.
                    </li>
                    <li>
                      <strong className="text-white/80">Marketing site banner:</strong> if a consent banner
                      is shown on oyechats.com in your region, you can accept or decline non-essential
                      categories there. Your choice is remembered for 6 months.
                    </li>
                    <li>
                      <strong className="text-white/80">Widget storage mode:</strong> if you operate a site
                      that embeds the OyeChats widget, you can enable cookie-free mode from your dashboard
                      under Settings → Privacy.
                    </li>
                  </ul>
                  <p className="mt-3">
                    Blocking strictly-necessary cookies will break sign-in and other core flows on the
                    dashboard.
                  </p>
                </section>

                <section id="do-not-track" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">
                    Do Not Track and Global Privacy Control
                  </h2>
                  <p>
                    Browsers can transmit a Do Not Track (DNT) header or a Global Privacy Control (GPC)
                    signal. The DNT standard never reached agreement on what compliance means, so we do not
                    treat it as a binding signal. We do honor GPC where transmitted: when GPC is detected,
                    we treat it as an opt-out of any sale or sharing of personal information for the
                    purposes covered by the CCPA / CPRA, even though we do not sell or share personal
                    information for cross-context behavioral advertising in the first place.
                  </p>
                </section>

                <section id="changes" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Changes to this policy</h2>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in technology,
                    applicable law, or our practices. The &quot;Last updated&quot; date at the top of this
                    page indicates when the policy was last revised. For material changes, we will provide
                    notice through the marketing site or an in-product banner.
                  </p>
                </section>

                <section id="contact" className="scroll-mt-24">
                  <h2 className="font-display text-xl font-semibold text-white mb-3">Questions</h2>
                  <p>
                    Have a question about how we use cookies? Write to{' '}
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
