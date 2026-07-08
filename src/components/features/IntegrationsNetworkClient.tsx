'use client';

import dynamic from 'next/dynamic';

// Client boundary for the animated scene. The scene relies on Framer
// Motion, refs, and mouse tracking that have no meaningful server render,
// so we load it with ssr:false. This isolates the client-ness to a tiny
// wrapper module and lets IntegrationsFeaturesSection stay a server
// component (better perceived load, better SEO, no hydration risk on the
// surrounding content).
export const IntegrationsNetwork = dynamic(
  () => import('./IntegrationsNetwork').then((m) => m.IntegrationsNetwork),
  {
    ssr: false,
    loading: () => <div className="w-full h-full" aria-hidden />,
  },
);
