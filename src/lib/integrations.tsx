import { Integration } from '@/types/integration';
import {
  siWordpress,
  siShopify,
  siWebflow,
  siNextdotjs,
  siHtml5,
  siVuedotjs,
  siReact,
  siFramer,
  siBrevo,
  siCalendly,
  siSentry,
  siZapier,
  siMake,
  type SimpleIcon,
} from 'simple-icons';
import {
  Microscope,
  Link as LinkIcon,
  Wrench,
} from 'lucide-react';

type BrandIconProps = {
  icon: SimpleIcon;
  size?: number;
  overrideColor?: string;
};

function BrandIcon({ icon, size = 28, overrideColor }: BrandIconProps) {
  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={overrideColor ?? `#${icon.hex}`}
    >
      <path d={icon.path} />
    </svg>
  );
}

export const integrations: Integration[] = [
  // CMS - true content management systems
  { id: 'wordpress', name: 'WordPress', description: 'Plugin install, one click', category: 'cms', available: true, icon: <BrandIcon icon={siWordpress} /> },
  { id: 'shopify',   name: 'Shopify',   description: 'Theme injection for stores', category: 'cms', available: true, icon: <BrandIcon icon={siShopify} /> },
  { id: 'webflow',   name: 'Webflow',   description: 'Custom embed code', category: 'cms', available: true, icon: <BrandIcon icon={siWebflow} /> },

  // Website - frontend frameworks and custom sites
  { id: 'nextjs',  name: 'Next.js',        description: 'Script component', category: 'website', available: true, icon: <BrandIcon icon={siNextdotjs} overrideColor="#FFFFFF" /> },
  { id: 'html',    name: 'HTML / Vanilla', description: 'Single script tag', category: 'website', available: true, icon: <BrandIcon icon={siHtml5} /> },
  { id: 'vue',     name: 'Vue.js',         description: 'Plugin or script', category: 'website', available: true, icon: <BrandIcon icon={siVuedotjs} /> },
  { id: 'react',   name: 'React',          description: 'Drop-in component', category: 'website', available: true, icon: <BrandIcon icon={siReact} /> },
  { id: 'framer',  name: 'Framer',         description: 'Code component embed', category: 'website', available: true, icon: <BrandIcon icon={siFramer} overrideColor="#FFFFFF" /> },

  // Email - real (transactional)
  { id: 'brevo', name: 'Brevo', description: 'Transactional email', category: 'crm', available: true, icon: <BrandIcon icon={siBrevo} /> },

  // Meetings - real (calendly_url field on bots)
  { id: 'calendly', name: 'Calendly', description: 'In-chat booking', category: 'meetings', available: true, icon: <BrandIcon icon={siCalendly} /> },

  // Analytics & Observability - real (infra-level)
  { id: 'langfuse', name: 'AI Observability', description: 'Response quality tracing', category: 'analytics', available: true, icon: <Microscope className="w-7 h-7 text-violet-400" /> },
  { id: 'sentry',   name: 'Error Monitoring', description: 'Incident alerting',        category: 'analytics', available: true, icon: <BrandIcon icon={siSentry} overrideColor="#A99CFF" /> },

  // Automation - reachable via webhooks
  { id: 'zapier', name: 'Zapier', description: 'Via webhooks', category: 'automation', available: true, icon: <BrandIcon icon={siZapier} /> },
  { id: 'make',   name: 'Make',   description: 'Via webhooks', category: 'automation', available: true, icon: <BrandIcon icon={siMake} /> },

  // Developer - real first-class building blocks
  { id: 'webhooks', name: 'Webhooks', description: '5 event types',    category: 'developer', available: true, icon: <LinkIcon className="w-7 h-7 text-indigo-400" /> },
  { id: 'rest-api', name: 'REST API', description: 'Full OpenAPI spec', category: 'developer', available: true, icon: <Wrench  className="w-7 h-7 text-indigo-300" /> },
];
