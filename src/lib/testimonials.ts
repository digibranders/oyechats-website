import { Testimonial } from '@/types/testimonial';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Aakash Mehta',
    title: 'Head of Growth',
    company: 'Kartado Commerce',
    industry: 'e-commerce',
    avatar: 'AM',
    avatarColor: '#2563EB',
    quote:
      "We went from answering 300 support tickets a day to under 40. OyeChats handles everything our customers ask about products, shipping, and returns — and the BANT scoring has actually helped us identify high-value buyers we'd never have caught before.",
    rating: 5,
    metric: { value: '+42%', label: 'conversion rate' },
  },
  {
    id: '2',
    name: 'Priya Nair',
    title: 'CEO',
    company: 'Stackbloom SaaS',
    industry: 'saas',
    avatar: 'PN',
    avatarColor: '#6366F1',
    quote:
      "Setup literally took 8 minutes. We uploaded our docs, customized the widget, and deployed. Within a week, OyeChats was qualifying leads with higher accuracy than our sales team's first touchpoint calls.",
    rating: 5,
    metric: { value: '78%', label: 'ticket reduction' },
  },
  {
    id: '3',
    name: 'Marcus Chen',
    title: 'Director of Customer Success',
    company: 'Finvault',
    industry: 'fintech',
    avatar: 'MC',
    avatarColor: '#06B6D4',
    quote:
      "The live chat handoff is seamless. Our operators take over conversations at exactly the right moment — when the AI detects a qualified lead. The BANT data they get on handoff means they close 3x faster.",
    rating: 5,
    metric: { value: '3x', label: 'faster close rate' },
  },
  {
    id: '4',
    name: 'Sneha Kapoor',
    title: 'Product Manager',
    company: 'EduPath',
    industry: 'education',
    avatar: 'SK',
    avatarColor: '#10B981',
    quote:
      "We trained OyeChats on our entire curriculum catalog — 200+ PDFs. It answers student questions instantly with relevant context, reducing our support team's load by over 60%. The hybrid search is genuinely impressive.",
    rating: 5,
    metric: { value: '60%', label: 'support load reduction' },
  },
  {
    id: '5',
    name: 'Rahul Desai',
    title: 'Founder',
    company: 'AgencyPulse',
    industry: 'agency',
    avatar: 'RD',
    avatarColor: '#8B5CF6',
    quote:
      "We deploy OyeChats for 15+ client websites. The multi-bot architecture and API make white-labeling trivial. Clients love the BANT reports — it's become a core part of our retainer pitch.",
    rating: 5,
    metric: { value: '15+', label: 'client deployments' },
  },
];
