
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Spam Checker for Emails',
  description: 'Analyze your email content for spam trigger words before you send. Improve deliverability and avoid the spam folder with our free online spam checker.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-950 text-white landing-page">
        <HeroHeader />
        <main className='pt-20'>
            {children}
        </main>
        <Footer />
    </div>
  )
}
