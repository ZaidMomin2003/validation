
import Footer from '@/components/layout/footer';
import { HeroHeader } from '@/components/layout/HeroHeader';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer | Zaid Momin, Founder of ZuhanaTech',
  description: 'Meet Zaid Momin, the developer behind Cleanmails and the founder of ZuhanaTech. Learn about the vision, mission, and goals that drive our innovation.',
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
