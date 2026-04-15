import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { PillarsShowcase } from "@/components/home/PillarsShowcase";
import { StatsSection } from "@/components/home/StatsSection";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { WhyODC } from "@/components/home/WhyODC";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PillarsShowcase />
      <StatsSection />
      <IndustriesGrid />
      <WhyODC />
      <CTASection />
    </>
  );
}
