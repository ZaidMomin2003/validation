
import type { Metadata } from 'next';
import CheckSpamClient from './CheckSpamClient';

export const metadata: Metadata = {
  title: 'Free Spam Checker Tool | Cleanmails',
  description: 'Analyze your email content for spam trigger words before you send. Improve deliverability and avoid the spam folder with our free spam checker.',
  openGraph: {
    title: 'Free Spam Checker Tool | Cleanmails',
    description: 'Test your email content against common spam filters. Get a spam score and recommendations for free.',
     url: 'https://cleanmails.com/check-spam',
    siteName: 'Cleanmails',
  },
  twitter: {
    card: 'summary',
    title: 'Free Spam Checker Tool | Cleanmails',
    description: 'Analyze your email content for spam trigger words before you send.',
  },
};

export default function SpamCheckerPage() {
    return <CheckSpamClient />;
}
