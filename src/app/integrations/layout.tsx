import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'OyeChats integrates with WordPress, Shopify, Webflow, Slack, WhatsApp, HubSpot, Calendly, and 20+ more platforms.',
  alternates: { canonical: 'https://oyechats.com/integrations' },
  openGraph: { url: 'https://oyechats.com/integrations' },
};

export default function IntegrationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
