import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Embed OyeChats on WordPress, Shopify, Webflow, React, or any site, and connect Calendly, Brevo, webhooks, and the REST API.',
  alternates: { canonical: 'https://oyechats.com/integrations' },
  openGraph: { url: 'https://oyechats.com/integrations' },
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
