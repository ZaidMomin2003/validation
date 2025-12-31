
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Email Extractor From Text',
  description: 'Paste any text and instantly extract all email addresses. A free online tool to quickly harvest contacts from documents, articles, and logs.',
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
