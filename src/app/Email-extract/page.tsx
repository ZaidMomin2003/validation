
import type { Metadata } from 'next';
import EmailExtractClient from './EmailExtractClient';

export const metadata: Metadata = {
  title: 'Free Email Extractor From Text | Cleanmails',
  description: 'Paste any text and instantly extract all email addresses. A free tool to quickly harvest contacts from documents, articles, and logs.',
   openGraph: {
    title: 'Free Email Extractor From Text | Cleanmails',
    description: 'Instantly pull all email addresses from any block of text. Free, fast, and easy to use.',
    url: 'https://cleanmails.com/email-extract',
    siteName: 'Cleanmails',
  },
  twitter: {
    card: 'summary',
    title: 'Free Email Extractor Tool | Cleanmails',
    description: 'Paste text, get emails. Simple as that.',
  },
};

export default function Page() {
  return <EmailExtractClient />;
}
