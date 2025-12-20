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
import {useEffect} from 'react';
import {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';

export default function Home() {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);
  return (
    <div className="bg-neutral-950">
      <HeroHeader />
      <HeroSection />
      <LinkPreviewDemo />
      <HowItWorksSection />
      <div className="py-20">
        <BentoGridThirdDemo />
      </div>
      <PricingSection />
      <FaqSection />
      <ContactUsSection />
      <Footer />
    </div>
  );
}
