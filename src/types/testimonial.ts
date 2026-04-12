export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: 'e-commerce' | 'saas' | 'agency' | 'fintech' | 'healthcare' | 'education';
  avatar: string; // initials or image path
  avatarColor: string;
  quote: string;
  rating: number;
  metric?: {
    value: string;
    label: string;
  };
}
