'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import HeroSection from '@/components/layout/hero-section';
import { BentoGridThirdDemo } from '@/components/layout/feature-section';

export default function Home() {
  return (
    <div className="bg-neutral-950">
      <HeroHeader />
      <HeroSection />
      <div className="py-20">
        <BentoGridThirdDemo />
      </div>
    </div>
  );
}
