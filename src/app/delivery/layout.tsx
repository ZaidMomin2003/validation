
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delivery Policy',
  description: 'Learn how our digital email validation and cleaning services are delivered to you instantly through our secure platform upon completion of processing.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="dark landing-page bg-background text-foreground">
          <HeroHeader />
          <main className='pt-20'>
              {children}
          </main>
          <Footer />
      </div>
    </ThemeProvider>
  )
}
