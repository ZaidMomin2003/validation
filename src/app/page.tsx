
import { HeroSection } from "@/components/layout/hero-section";
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <Footer />
    </div>
  );
}
