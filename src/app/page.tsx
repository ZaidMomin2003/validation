'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import HeroSection from '@/components/layout/hero-section';
import { BentoGridThirdDemo } from '@/components/layout/feature-section';

export default function Home() {
  return (
    <>
      <HeroHeader />
      <HeroSection />
      <BentoGridThirdDemo />
    </>
  );
}
