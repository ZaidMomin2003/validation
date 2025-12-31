
'use client';

import { CheckCircle, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const builtFeatures = [
  {
    name: 'Free Spam Checker',
    description: 'Analyze your email content for spam trigger words before you send to improve deliverability. Free for everyone.',
    version: 'v1.7.0',
  },
  {
    name: 'Free Email Extractor',
    description: 'A new tool to instantly pull all email addresses from any block of text. No sign-up required to get started.',
    version: 'v1.7.0',
  },
  {
    name: 'Advanced Security Hardening',
    description: 'Implemented stricter data validation and secured APIs to ensure your data is always protected.',
    version: 'v1.6.0',
  },
  {
    name: 'Modern Dark Theme',
    description: 'The dashboard and landing pages have been redesigned with a sleeker, more modern dark mode for a better user experience.',
    version: 'v1.5.0',
  },
  {
    name: 'Password Visibility Toggle',
    description: 'Added an eye icon to password fields, allowing you to see what you are typing to prevent mistakes.',
    version: 'v1.5.0',
  },
  {
    name: 'Support & Feedback Forms',
    description: 'Dedicated forms for you to submit support requests and share your valuable feedback with us directly.',
    version: 'v1.4.0',
  },
  {
    name: 'Profile & Password Management',
    description: 'You can now update your name, change your password, and manage your account details from your profile page.',
    version: 'v1.3.0',
  },
  {
    name: 'Bulk Email Validation',
    description: 'Upload CSV or XLSX files to validate your email lists in bulk, with detailed downloadable reports.',
    version: 'v1.2.0',
  },
  {
    name: 'Real-time List Management',
    description: 'Your email lists are now synced across all devices using Firestore, so you always have the latest version.',
    version: 'v1.1.0',
  },
  {
    name: 'Secure User Authentication',
    description: 'Sign up and sign in securely using your Email & Password or your Google account.',
    version: 'v1.0.0',
  },
];

const inProgressFeatures = [
  {
    name: 'Real-time Validation Progress',
    description: 'See your list validation update in real-time without needing to refresh the page.',
  },
  {
    name: 'Public API Access',
    description: 'Integrate Cleanmails into your own applications with a simple and powerful API.',
  },
  {
    name: 'Team Collaboration',
    description: 'Invite team members to your account to manage and validate lists together.',
  },
  {
    name: 'Detailed List Analytics',
    description: 'Get deeper insights into your email list quality with advanced analytics and charts.',
  },
];

export default function ChangelogPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight">
            Changelog
          </h1>
          <p className="mt-2 text-muted-foreground">
            Stay updated with the latest features, improvements, and bug fixes we've rolled out for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span>Features Built</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {builtFeatures.map((feature, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{feature.name}</h3>
                      <Badge variant="secondary">{feature.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    {index < builtFeatures.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Construction className="h-6 w-6 text-yellow-500" />
                <span>In Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {inProgressFeatures.map((feature, index) => (
                  <div key={index}>
                    <h3 className="font-semibold">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                     {index < inProgressFeatures.length - 1 && <Separator className="mt-6" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}
