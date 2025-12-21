
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardPaste, ShieldCheck, CloudDownload } from 'lucide-react';

export function KeyFeaturesSection() {
  const features = [
    {
      icon: <ClipboardPaste className="h-6 w-6 text-primary" />,
      title: "Extract Emails from Text",
      description: "Simply paste any block of text—a document, an article, or raw data. Our smart parser instantly finds and extracts all email addresses for you."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Validate with Precision",
      description: "Our multi-layered validation process checks syntax, verifies domains, and flags disposable or role-based addresses to ensure your list is clean and effective."
    },
    {
      icon: <CloudDownload className="h-6 w-6 text-primary" />,
      title: "Store & Download Anytime",
      description: "Your cleaned and validated lists are securely stored in your account. Access and download your data as a clean CSV file whenever you need it."
    }
  ];

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            A Powerful, Simple Workflow
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            From raw text to a validated email list in just a few clicks.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
