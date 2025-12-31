
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy details how we collect, use, and protect your personal and uploaded data when you use the Cleanmails service to validate your email lists.',
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
