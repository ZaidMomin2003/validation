'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, MousePointerClick, Download } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Get Started in Seconds
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Verify your email lists in three simple steps.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card className="bg-card/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">1. Upload Your List</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Drag and drop or select a CSV/XLSX file containing the email
                addresses you want to verify.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MousePointerClick className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">2. Start Validation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Confirm the email column and let our engine perform deep checks, from syntax to server verification.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-white">3. Download Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Once processing is complete, download your clean list with detailed status for every email.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
