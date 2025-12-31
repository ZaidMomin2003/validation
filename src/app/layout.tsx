
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { FirebaseProvider } from '@/firebase/provider';
import { ThemeProvider } from '@/components/theme-provider';
import { ClientOnly } from '@/components/ClientOnly';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://cleanmails.com'),
  title: {
    default: 'Cleanmails | Instant Email Validation & Cleaning Service',
    template: '%s | Cleanmails',
  },
  description: 'Clean, verify, and protect your email lists with Cleanmails. Reduce bounce rates, remove invalid addresses, and improve sender reputation. Try for free.',
  openGraph: {
    title: 'Cleanmails | Instant Email Validation & Cleaning Service',
    description: 'Stop bounces and improve your email deliverability. Fast, affordable, and accurate email verification.',
    url: 'https://cleanmails.com',
    siteName: 'Cleanmails',
    images: [
      {
        url: '/og-image.png', // Hosted in /public
        width: 1200,
        height: 630,
        alt: 'Cleanmails an Instant Email Validation & Cleaning Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cleanmails | Instant Email Validation & Cleaning Service',
    description: 'Stop bounces and improve your email deliverability. Fast, affordable, and accurate email verification.',
    images: ['/og-image.png'],
    creator: '@cleanmails', // Add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://cleanmails.com',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={`${inter.variable} font-body antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClientOnly>
              <FirebaseProvider>
                {children}
              </FirebaseProvider>
            </ClientOnly>
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
