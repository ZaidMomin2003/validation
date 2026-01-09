
import DashboardLayout from '@/components/layout/DashboardLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Email Parser & Extractor Tool',
    description: 'Instantly parse and extract email addresses from any block of text with our free online tool. Cleanmails makes it easy to gather contacts from unstructured data.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
