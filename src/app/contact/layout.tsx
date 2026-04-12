import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the OyeChats team — sales enquiries, support, or enterprise demos. We reply within 24 hours.',
  alternates: { canonical: 'https://oyechats.com/contact' },
  openGraph: { url: 'https://oyechats.com/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
