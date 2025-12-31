
'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import HeroSection from '@/components/layout/hero-section';
import { BentoGridThirdDemo } from '@/components/layout/feature-section';
import { FaqSection } from '@/components/layout/faq-section';
import PricingSection from '@/components/layout/pricing-section';
import { LinkPreviewDemo } from '@/components/layout/link-preview-demo';
import HowItWorksSection from '@/components/layout/how-it-works-section';
import Footer from '@/components/layout/footer';
import ContactUsSection from '@/components/layout/contact-us-section';
import {useEffect, useState} from 'react';
import {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';
import ParallaxScrollDemo from '@/components/layout/parallax-scroll-demo';
import StatsSection from '@/components/layout/stats-section';
import BlogShowcase from '@/components/layout/blog-showcase';
import { ToolsShowcase } from '@/components/layout/tools-showcase';
import { ThemeProvider } from '@/components/theme-provider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, PartyPopper, CheckCircle } from 'lucide-react';

export default function Home() {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });

    const promoTimer = setTimeout(() => {
        setShowPromo(true);
    }, 4000); // Show popup after 4 seconds

    return () => clearTimeout(promoTimer);
  }, []);

  const promoFeatures = [
    "500,000 Verifications/Year",
    "Bulk List Cleaning",
    "Unlimited Email Extraction",
    "Priority Support",
    "Lifetime Access & Updates",
  ];

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="dark landing-page bg-background text-foreground">
        <HeroHeader />
        <HeroSection />
        <div className="relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
            style={{
              background: `radial-gradient(circle at center, #3b82f6, transparent 70%)`,
            }}
          />
          <div
            className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
            style={{
              background: `radial-gradient(circle at center, #3b82f6, transparent 70%)`,
            }}
          />
          <div
              className="absolute -bottom-1/2 left-1/3 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]"
              style={{
                  background: `radial-gradient(circle at center, #38BDF8, transparent 70%)`,
              }}
          />
          <div
              className="absolute top-1/2 right-1/4 h-[400px] w-[600px] rounded-full opacity-10 blur-[100px]"
              style={{
                  background: `radial-gradient(circle at center, #4F46E5, transparent 70%)`,
              }}
          />
          <LinkPreviewDemo />
          <ToolsShowcase />
          <HowItWorksSection />
          <StatsSection />
          <div className="py-20">
            <BentoGridThirdDemo />
          </div>
          <PricingSection />
          <FaqSection />
          <BlogShowcase />
          <ContactUsSection />
          <Footer />
        </div>
      </div>
      <Dialog open={showPromo} onOpenChange={setShowPromo}>
        <DialogContent className="w-11/12 max-w-md rounded-2xl bg-card/80 dark:bg-zinc-900/80 backdrop-blur-lg border-primary/20 text-white shadow-2xl">
            <DialogHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <PartyPopper className="h-8 w-8 text-primary" />
                </div>
                <DialogTitle className="text-center text-2xl font-bold">Unlock Our New Year Lifetime Deal!</DialogTitle>
                <DialogDescription className="text-center text-base">
                    For a limited time, get lifetime access to Cleanmails for a single payment.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                 <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-center">
                    <p className="text-4xl font-bold text-amber-400">$69</p>
                    <p className="text-base font-medium text-muted-foreground">One-Time Payment</p>
                </div>
                <ul className="space-y-2 text-sm">
                    {promoFeatures.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <DialogFooter className="sm:justify-center">
                <Button asChild size="lg" className="w-full">
                    <Link href="/pricing">
                        Claim This Offer <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
