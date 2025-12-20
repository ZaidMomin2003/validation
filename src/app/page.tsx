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
      <div className="relative overflow-hidden">
        <div
          className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
          style={{
            background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
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
        <HowItWorksSection />
        <div className="py-20">
          <BentoGridThirdDemo />
        </div>
        <PricingSection />
        <FaqSection />
        <ContactUsSection />
        <Footer />
      </div>
    </div>
  );
}
