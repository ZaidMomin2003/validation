
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Cleanmails',
  description: 'Insights, tips, and updates on email validation, deliverability, and marketing from the Cleanmails team.',
  openGraph: {
    title: 'Blog | Cleanmails',
    description: 'Insights, tips, and updates on email validation, deliverability, and marketing from the Cleanmails team.',
    url: 'https://cleanmails.com/blogs',
    siteName: 'Cleanmails',
     images: [
      {
        url: 'https://cleanmails.com/og-blog.png', // Replace with your actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
   twitter: {
    card: 'summary_large_image',
    title: 'Blog | Cleanmails',
    description: 'Insights, tips, and updates on email validation and marketing.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
        <div className="dark landing-page bg-background text-foreground">
            {children}
        </div>
    </ThemeProvider>
  );
}
