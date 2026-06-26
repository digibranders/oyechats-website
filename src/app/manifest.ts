import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'OyeChats, RAG-Powered AI Chatbot',
    short_name: 'OyeChats',
    description:
      'RAG-powered AI chatbot with BANT sales qualification. Convert visitors into qualified pipeline automatically.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030D1F',
    theme_color: '#2563EB',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}
