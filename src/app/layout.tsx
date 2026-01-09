
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
    default: 'Cleanmails | Instant Email Validation, Parser & Spam Checker',
    template: '%s | Cleanmails',
  },
  description: 'Clean Mails Online: Instant email validation, list cleaning, email parser, and spam checker service. Verify and clean your email lists to improve deliverability. Try for free.',
  keywords: [
    'clean mails',
    'clean mails online',
    'email validation',
    'email verification',
    'email list cleaning',
    'spam checker',
    'email parser',
    'email extractor',
    'bulk email validation',
    'email deliverability',
    'reduce bounce rate',
  ],
  openGraph: {
    title: 'Cleanmails | Instant Email Validation, Parser & Spam Checker',
    description: 'Clean Mails Online: Stop bounces and improve your email deliverability with our fast, affordable, and accurate email verification, parsing, and spam checking tools.',
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
    title: 'Cleanmails | Instant Email Validation, Parser & Spam Checker',
    description: 'Clean Mails Online: Stop bounces and improve your email deliverability with our fast, affordable, and accurate email verification, parsing, and spam checking tools.',
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
          <FirebaseProvider>
            {children}
            <Toaster />
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
