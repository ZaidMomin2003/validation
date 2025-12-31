
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Policy',
  description: 'Learn how our digital email validation and cleaning services are delivered to you instantly through our secure platform upon completion of processing.',
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
