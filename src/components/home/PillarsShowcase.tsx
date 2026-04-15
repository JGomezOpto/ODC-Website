"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scan, Lightbulb, Settings } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlowCard } from "@/components/common/GlowCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const pillars = [
  {
    title: "Detection",
    subtitle: "Photodiodes & APDs",
    description:
      "From EUV to mid-infrared — silicon, PbSe, and PbS detectors with unmatched sensitivity for precision measurement.",
    image: "/images/products/silicon-detectors.jpg",
    href: "/products/detection",
    icon: Scan,
    families: ["SXUV", "AXUV", "UVG", "Blue Enhanced", "PbSe", "PbS", "APDs"],
    wavelength: "0.01 nm – 5 μm",
  },
  {
    title: "Emission",
    subtitle: "LEDs & IR Emitters",
    description:
      "Broadband and narrowband emission from UV through infrared. GaAlAs, InGaN, and AlInGaP technologies.",
    image: "/images/products/emission-banner.jpg",
    href: "/products/emission",
    icon: Lightbulb,
    families: ["UV LEDs", "Visible LEDs", "IR LEDs", "IR Emitters"],
    wavelength: "320 nm – 5 μm",
  },
  {
    title: "Integration",
    subtitle: "Custom Solutions",
    description:
      "Complete opto-electronic assemblies tailored to your specifications. From prototype to high-volume production.",
    image: "/images/products/integration-banner.jpg",
    href: "/products/integration",
    icon: Settings,
    families: ["Custom Assemblies", "Detector Modules", "Emitter Modules"],
    wavelength: "Custom Range",
  },
];

export function PillarsShowcase() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <Container>
        <SectionHeading
          subtitle="Our Products"
          title="Three Pillars of Photonics"
          description="Comprehensive solutions spanning detection, emission, and custom integration — engineered for the most demanding applications."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.15}>
              <Link href={pillar.href} className="block h-full">
                <GlowCard className="h-full">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={pillar.image}
                      alt={pillar.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <pillar.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                      {pillar.subtitle}
                    </p>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {pillar.description}
                    </p>

                    {/* Wavelength badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {pillar.wavelength}
                    </div>

                    {/* Product families */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pillar.families.map((f) => (
                        <span
                          key={f}
                          className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground"
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Explore {pillar.title}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </GlowCard>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
