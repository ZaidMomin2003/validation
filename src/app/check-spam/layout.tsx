
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';

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
