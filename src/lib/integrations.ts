import { Integration } from '@/types/integration';

export const integrations: Integration[] = [
  // CMS & Websites
  { id: 'wordpress', name: 'WordPress', description: 'Plugin install — one click', category: 'cms', available: true, icon: '🌐' },
  { id: 'shopify', name: 'Shopify', description: 'Theme injection for stores', category: 'cms', available: true, icon: '🛍️' },
  { id: 'webflow', name: 'Webflow', description: 'Custom embed code', category: 'cms', available: true, icon: '🔷' },
  { id: 'nextjs', name: 'Next.js', description: 'Script component', category: 'cms', available: true, icon: '⚡' },
  { id: 'html', name: 'HTML / Vanilla', description: 'Single script tag', category: 'cms', available: true, icon: '🌍' },
  { id: 'vue', name: 'Vue.js', description: 'Plugin or script', category: 'cms', available: true, icon: '🟩' },
  { id: 'angular', name: 'Angular', description: 'Script component', category: 'cms', available: false, icon: '🔴' },

  // Messaging
  { id: 'slack', name: 'Slack', description: 'Bot notifications', category: 'messaging', available: true, icon: '💬' },
  { id: 'whatsapp', name: 'WhatsApp', description: 'Business API', category: 'messaging', available: true, icon: '📱' },
  { id: 'teams', name: 'MS Teams', description: 'Bot channel', category: 'messaging', available: true, icon: '🔵' },

  // CRM & Email
  { id: 'hubspot', name: 'HubSpot', description: 'CRM sync + lead creation', category: 'crm', available: true, icon: '🟠' },
  { id: 'salesforce', name: 'Salesforce', description: 'Lead push via API', category: 'crm', available: false, icon: '☁️' },
  { id: 'brevo', name: 'Brevo', description: 'Email delivery', category: 'crm', available: true, icon: '📧' },
  { id: 'mailchimp', name: 'Mailchimp', description: 'List sync', category: 'crm', available: false, icon: '🐒' },

  // Meetings
  { id: 'calendly', name: 'Calendly', description: 'In-chat booking', category: 'meetings', available: true, icon: '📅' },

  // Analytics
  { id: 'langfuse', name: 'AI Observability', description: 'Response quality tracing', category: 'analytics', available: true, icon: '🔬' },
  { id: 'sentry', name: 'Error Monitoring', description: 'Incident alerting', category: 'analytics', available: true, icon: '🪲' },

  // Automation
  { id: 'zapier', name: 'Zapier', description: '6000+ apps', category: 'automation', available: true, icon: '⚡' },
  { id: 'make', name: 'Make', description: 'Visual automation', category: 'automation', available: true, icon: '🔄' },

  // Developer
  { id: 'webhooks', name: 'Webhooks', description: '5 event types', category: 'developer', available: true, icon: '🔗' },
  { id: 'rest-api', name: 'REST API', description: 'Full OpenAPI spec', category: 'developer', available: true, icon: '🛠️' },
];
