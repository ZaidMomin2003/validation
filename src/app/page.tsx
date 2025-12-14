'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-dashboard-image');

  return (
    <>
      <HeroHeader />
      <main className="flex-1">
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
          <BackgroundRippleEffect />
          <div className="container relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Boost Deliverability, Not Your Bounce Rate.
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Tired of your meticulously crafted emails ending up in the void? A dirty email list silently sabotages your campaigns, hurting your sender reputation and wasting your budget. VeriFlow cuts through the noise, ensuring your messages reach real people, every single time.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg">
                  <Link href="/bulk-validate">Get Started for Free</Link>
                </Button>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-muted/10 p-2 ring-1 ring-inset ring-foreground/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                {heroImage && (
                    <Image
                        src={heroImage.imageUrl}
                        alt={heroImage.description}
                        data-ai-hint={heroImage.imageHint}
                        width={2432}
                        height={1442}
                        className="rounded-md shadow-2xl ring-1 ring-foreground/10"
                    />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
