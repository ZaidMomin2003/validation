
'use client';
import { HeroHeader } from '@/components/layout/HeroHeader';
import HeroSection from '@/components/layout/hero-section';
import { FaqSection } from '@/components/layout/faq-section';
import PricingSection from '@/components/layout/pricing-section';
import { LinkPreviewDemo } from '@/components/layout/link-preview-demo';
import Footer from '@/components/layout/footer';
import ContactUsSection from '@/components/layout/contact-us-section';
import {useEffect, useState}from 'react';
import {initParticlesEngine} from '@tsparticles/react';
import {loadSlim} from '@tsparticles/slim';
import StatsSection from '@/components/layout/stats-section';
import BlogShowcase from '@/components/layout/blog-showcase';
import { ToolsShowcase } from '@/components/layout/tools-showcase';
import { ThemeProvider } from '@/components/theme-provider';

export default function Home() {

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });

  }, []);

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
          <StatsSection />
          <PricingSection />
          <FaqSection />
          <BlogShowcase />
          <ContactUsSection />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
