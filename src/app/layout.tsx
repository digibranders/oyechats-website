import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { NoiseOverlay } from '@/components/ui/NoiseOverlay';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-geist-mono',
});

const calSans = localFont({
  src: '../../public/CalSans-SemiBold.ttf',
  variable: '--font-display',
  display: 'swap',
  weight: '600',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030D1F',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oyechats.com'),
  title: {
    default: 'OyeChats — RAG-Powered AI Chatbot & Sales Intelligence Platform',
    template: '%s | OyeChats',
  },
  description:
    'OyeChats combines RAG-powered AI chat with BANT sales qualification to convert visitors into pipeline. Hybrid search, live chat handoff, behavioral tracking, webhooks, and analytics — all in one platform.',
  keywords: [
    'AI chatbot',
    'RAG chatbot',
    'BANT qualification',
    'live chat',
    'sales intelligence',
    'chatbot platform',
    'customer support AI',
    'OyeChats',
    'lead qualification',
    'hybrid search',
    'conversational AI',
    'chatbot SaaS',
  ],
  authors: [{ name: 'OyeChats' }],
  creator: 'OyeChats',
  publisher: 'OyeChats',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oyechats.com',
    siteName: 'OyeChats',
    title: 'OyeChats — RAG-Powered AI Chatbot & Sales Intelligence Platform',
    description:
      'RAG-powered AI chatbot with BANT sales qualification. Convert visitors into qualified pipeline automatically.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OyeChats - RAG-Powered AI Chatbot Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OyeChats — RAG-Powered AI Chatbot',
    description:
      'RAG-powered AI chatbot with BANT sales qualification. Convert visitors into qualified pipeline automatically.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://oyechats.com',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'OyeChats',
      url: 'https://oyechats.com',
      logo: 'https://oyechats.com/logo.png',
      description: 'RAG-Powered AI Chatbot & Sales Intelligence Platform',
      sameAs: [
        'https://twitter.com/oyechats',
        'https://github.com/oyechats',
        'https://linkedin.com/company/oyechats',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'OyeChats',
      url: 'https://oyechats.com',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'OyeChats',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'RAG-powered AI chatbot platform with BANT sales qualification, live chat handoff, behavioral tracking, and analytics.',
      offers: [
        { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Pro', price: '79', priceCurrency: 'USD' },
        { '@type': 'Offer', name: 'Enterprise', price: 'Custom', priceCurrency: 'USD' },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${calSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.oyechats.com" />
        <link rel="dns-prefetch" href="https://cdn.oyechats.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ScrollProgressBar />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <NoiseOverlay />
        <Analytics />
        {/* Widget — only load if a bot key is configured, never auto-open */}
        {process.env.NEXT_PUBLIC_BOT_KEY && (
          <Script
            src="https://cdn.oyechats.com/oyechats-widget.js"
            data-bot-key={process.env.NEXT_PUBLIC_BOT_KEY}
            data-auto-open="false"
            strategy="lazyOnload"
          />
        )}
      </body>
    </html>
  );
}
