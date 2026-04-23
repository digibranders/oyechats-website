import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'OyeChats pricing — Free, Starter ($19/mo), Standard ($57/mo), and Enterprise plans. Start free, scale as you grow.',
  alternates: { canonical: 'https://oyechats.com/pricing' },
  openGraph: { url: 'https://oyechats.com/pricing' },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
