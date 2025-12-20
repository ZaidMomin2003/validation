'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import HeroSection from '@/components/layout/hero-section';
import { BentoGridThirdDemo } from '@/components/layout/feature-section';
import { FaqSection } from '@/components/layout/faq-section';
import PricingSection from '@/components/layout/pricing-section';
import { LinkPreviewDemo } from '@/components/layout/link-preview-demo';
import HowItWorksSection from '@/components/layout/how-it-works-section';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="bg-neutral-950 pt-[42px]">
      <HeroHeader />
      <HeroSection />
      <LinkPreviewDemo />
      <HowItWorksSection />
      <div className="py-20">
        <BentoGridThirdDemo />
      </div>
      <PricingSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
