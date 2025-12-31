
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Free Email Extractor From Text',
  description: 'Paste any text and instantly extract all email addresses. A free online tool to quickly harvest contacts from documents, articles, and logs.',
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
