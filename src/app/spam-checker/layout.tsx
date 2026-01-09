
import DashboardLayout from '@/components/layout/DashboardLayout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Email Spam Checker',
    description: 'Use our free online spam checker to analyze your email content for spam trigger words. Improve your deliverability and avoid the junk folder with Cleanmails.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
