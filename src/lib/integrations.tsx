import { Integration } from '@/types/integration';
import {
  Globe,
  ShoppingBag,
  Hexagon,
  Zap,
  Earth,
  SquareCode,
  TriangleAlert,
  MessageSquare,
  Smartphone,
  CircleDot,
  Circle,
  Cloud,
  Mail,
  Dog,
  CalendarDays,
  Microscope,
  Bug,
  RefreshCw,
  Link,
  Wrench,
} from 'lucide-react';

export const integrations: Integration[] = [
  // CMS & Websites
  { id: 'wordpress', name: 'WordPress', description: 'Plugin install — one click', category: 'cms', available: true, icon: <Globe className="w-7 h-7 text-blue-400" /> },
  { id: 'shopify', name: 'Shopify', description: 'Theme injection for stores', category: 'cms', available: true, icon: <ShoppingBag className="w-7 h-7 text-green-400" /> },
  { id: 'webflow', name: 'Webflow', description: 'Custom embed code', category: 'cms', available: true, icon: <Hexagon className="w-7 h-7 text-blue-500" /> },
  { id: 'nextjs', name: 'Next.js', description: 'Script component', category: 'cms', available: true, icon: <Zap className="w-7 h-7 text-yellow-400" /> },
  { id: 'html', name: 'HTML / Vanilla', description: 'Single script tag', category: 'cms', available: true, icon: <Earth className="w-7 h-7 text-cyan-400" /> },
  { id: 'vue', name: 'Vue.js', description: 'Plugin or script', category: 'cms', available: true, icon: <SquareCode className="w-7 h-7 text-emerald-400" /> },
  { id: 'angular', name: 'Angular', description: 'Script component', category: 'cms', available: false, icon: <TriangleAlert className="w-7 h-7 text-red-400" /> },

  // Messaging
  { id: 'slack', name: 'Slack', description: 'Bot notifications', category: 'messaging', available: true, icon: <MessageSquare className="w-7 h-7 text-cyan-400" /> },
  { id: 'whatsapp', name: 'WhatsApp', description: 'Business API', category: 'messaging', available: true, icon: <Smartphone className="w-7 h-7 text-green-400" /> },
  { id: 'teams', name: 'MS Teams', description: 'Bot channel', category: 'messaging', available: true, icon: <CircleDot className="w-7 h-7 text-blue-500" /> },

  // CRM & Email
  { id: 'hubspot', name: 'HubSpot', description: 'CRM sync + lead creation', category: 'crm', available: true, icon: <Circle className="w-7 h-7 text-orange-400" /> },
  { id: 'salesforce', name: 'Salesforce', description: 'Lead push via API', category: 'crm', available: false, icon: <Cloud className="w-7 h-7 text-blue-400" /> },
  { id: 'brevo', name: 'Brevo', description: 'Email delivery', category: 'crm', available: true, icon: <Mail className="w-7 h-7 text-blue-300" /> },
  { id: 'mailchimp', name: 'Mailchimp', description: 'List sync', category: 'crm', available: false, icon: <Dog className="w-7 h-7 text-yellow-400" /> },

  // Meetings
  { id: 'calendly', name: 'Calendly', description: 'In-chat booking', category: 'meetings', available: true, icon: <CalendarDays className="w-7 h-7 text-blue-400" /> },

  // Analytics
  { id: 'langfuse', name: 'AI Observability', description: 'Response quality tracing', category: 'analytics', available: true, icon: <Microscope className="w-7 h-7 text-violet-400" /> },
  { id: 'sentry', name: 'Error Monitoring', description: 'Incident alerting', category: 'analytics', available: true, icon: <Bug className="w-7 h-7 text-red-400" /> },

  // Automation
  { id: 'zapier', name: 'Zapier', description: '6000+ apps', category: 'automation', available: true, icon: <Zap className="w-7 h-7 text-amber-400" /> },
  { id: 'make', name: 'Make', description: 'Visual automation', category: 'automation', available: true, icon: <RefreshCw className="w-7 h-7 text-violet-400" /> },

  // Developer
  { id: 'webhooks', name: 'Webhooks', description: '5 event types', category: 'developer', available: true, icon: <Link className="w-7 h-7 text-indigo-400" /> },
  { id: 'rest-api', name: 'REST API', description: 'Full OpenAPI spec', category: 'developer', available: true, icon: <Wrench className="w-7 h-7 text-indigo-300" /> },
];
