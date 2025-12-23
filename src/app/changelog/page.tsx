
'use client';

import { CheckCircle, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const builtFeatures = [
  {
    name: 'Secure User Authentication',
    description: 'Sign up and sign in using Email & Password or Google.',
    version: 'v1.0.0',
  },
  {
    name: 'Real-time List Management',
    description: 'Your email lists are now synced across all devices using Firestore.',
    version: 'v1.1.0',
  },
  {
    name: 'Bulk Email Validation',
    description: 'Upload CSV or XLSX files to validate your email lists.',
    version: 'v1.2.0',
  },
  {
    name: 'Profile & Password Management',
    description: 'Users can update their name, change their password, and delete their account.',
    version: 'v1.3.0',
  },
  {
    name: 'Support & Feedback Forms',
    description: 'Dedicated forms for users to submit support requests and feedback.',
    version: 'v1.4.0',
  },
];

const inProgressFeatures = [
  {
    name: 'Real-time Validation Progress',
    description: 'See the progress of your list validation update in real-time without refreshing.',
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
  {
    name: 'Expanded Export Options',
    description: 'Download your validation results in additional formats like JSON and TXT.',
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
            Stay updated with the latest features, improvements, and bug fixes we've rolled out.
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
