import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBar } from "@/components/home/TrustBar";
import { PillarsShowcase } from "@/components/home/PillarsShowcase";
import { StatsSection } from "@/components/home/StatsSection";
import { IndustriesGrid } from "@/components/home/IndustriesGrid";
import { WhyODC } from "@/components/home/WhyODC";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: {
    absolute:
      "Opto Diode Corporation | Silicon Photodiode & EUV Detector Manufacturer",
  },
  description:
    "USA manufacturer of silicon photodiodes, EUV/XUV detectors (AXUV/SXUV), PbSe/PbS IR detectors, APDs, and UV/IR LED emitters. ISO 9001:2015 · ITAR registered · Camarillo, CA.",
  alternates: { canonical: "https://optodiode.com" },
  openGraph: { url: "https://optodiode.com" },
};

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
