import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-image');

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Easy Check',
      description:
        'Fast, local-only checks for syntax, duplicates, and disposable domains. No network calls, instant results.',
      badge: 'Fast',
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: 'Targeted Check',
      description:
        'Includes all Easy checks plus DNS validation. Verifies domain existence and MX records for higher accuracy.',
      badge: 'Balanced',
    },
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: 'Ultra-Targeted Check',
      description:
        'The deepest verification. Includes all previous checks plus a direct SMTP handshake to confirm mailbox existence without sending an email.',
      badge: 'Deepest',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Clean Your Email Lists with Confidence
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    VeriFlow offers powerful, multi-layered email verification
                    to reduce bounce rates and improve campaign performance.
                    From fast syntax checks to deep SMTP verification.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/dashboard">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                {heroImage && (
                  <Image
                    src={heroImage.imageUrl}
                    width={600}
                    height={400}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Our Features
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  Three Levels of Verification
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the right level of verification for your needs, from
                  lightning-fast syntax checks to comprehensive mailbox probing.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
              {features.map((feature) => (
                <Card key={feature.title} className="text-left">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      {feature.icon}
                      <Badge variant="outline">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="font-headline pt-4">{feature.title}</CardTitle>
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

        {/* Disclaimer Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Important to Know
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We strive for accuracy, but email verification is
                probabilistic. Here are a few key points to keep in mind.
              </p>
            </div>
            <div className="mx-auto w-full max-w-4xl">
              <ul className="grid gap-4 md:grid-cols-2">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <span>
                    <strong>Reduces Risk, Not a Guarantee:</strong> Our results
                    dramatically reduce bounce risk but cannot guarantee 100%
                    delivery.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <span>
                    <strong>Provider Limitations:</strong> Some email providers
                    (like Gmail, Yahoo) limit SMTP responses to prevent this
                    type of probing, which can affect Ultra-Targeted results.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>
                    <strong>Catch-All Domains:</strong> Some domains are
                    configured to accept all emails, regardless of the local
                    part. We identify these as 'catch-all'.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <span>
                    <strong>Ultra Mode Speed:</strong> Deeper checks require more
                    time. Ultra-Targeted mode is significantly slower due to
                    network latency and rate limiting.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
