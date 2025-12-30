
import DashboardLayout from '@/components/layout/DashboardLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | Cleanmails',
  description: 'Simple, transparent pricing for email validation. Choose from our Lifetime Deal or Pay-as-you-go plans to start cleaning your lists today.',
   openGraph: {
    title: 'Pricing | Cleanmails',
    description: 'Find the perfect plan for your email verification needs. Lifetime and Pay-as-you-go options available.',
    url: 'https://cleanmails.com/pricing',
    siteName: 'Cleanmails',
  },
  twitter: {
    card: 'summary',
    title: 'Pricing | Cleanmails',
    description: 'Simple and affordable email validation pricing.',
  },
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
