
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the terms and conditions for using the Cleanmails email validation service. Understand your rights and responsibilities as a user of our platform.',
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
