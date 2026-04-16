import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Scan, Lightbulb, Settings, Search, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { GlowCard } from "@/components/common/GlowCard";
import { getProductFamilies } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "Photodiode & LED Emitter Products",
  description:
    "Complete photodetector and LED emitter portfolio: silicon photodiodes (EUV–NIR), PbSe/PbS IR detectors, avalanche photodiodes, UV/IR LED emitters, and custom OEM assemblies.",
};

const pillars = [
  {
    title: "Detection",
    subtitle: "Photodiodes & APDs",
    description:
      "From soft X-ray to mid-infrared, our silicon, PbSe, and PbS detectors deliver unmatched sensitivity for precision measurement across the electromagnetic spectrum.",
    image: "/images/products/silicon-detectors.jpg",
    href: "/products/detection",
    icon: Scan,
    highlights: [
      "SXUV & AXUV: EUV-optimized (0.01\u2013190 nm)",
      "UVG, Blue & Red Enhanced: UV-Vis (190\u20131100 nm)",
      "PbSe & PbS: Infrared (1\u20135 \u03BCm)",
      "APDs & Preamp Modules",
    ],
    wavelength: "0.01 nm \u2013 5 \u03BCm",
    productCount: "9 families",
  },
  {
    title: "Emission",
    subtitle: "LEDs & IR Emitters",
    description:
      "Broadband and narrowband emission from UV through mid-infrared. GaAlAs, InGaN, and AlInGaP technologies optimized for demanding applications.",
    image: "/images/products/emission-banner.jpg",
    href: "/products/emission",
    icon: Lightbulb,
    highlights: [
      "NIR LEDs: 810\u2013940 nm (standard & high power)",
      "Visible LEDs: 469\u2013685 nm",
      "Broadband IR emitters: 2\u20135 \u03BCm",
      "Pulsable, steady-state & high-speed options",
    ],
    wavelength: "469 nm \u2013 5 \u03BCm",
    productCount: "3 families",
  },
  {
    title: "Integration",
    subtitle: "Custom Solutions",
    description:
      "Complete opto-electronic assemblies tailored to your specifications. Our engineers work with you from prototype through high-volume production.",
    image: "/images/products/integration-banner.jpg",
    href: "/products/integration",
    icon: Settings,
    highlights: [
      "Custom detector modules",
      "Emitter assemblies",
      "Matched detector-emitter pairs",
      "Prototype to production",
    ],
    wavelength: "Custom Range",
    productCount: "Tailored",
  },
];

export default function ProductsPage() {
  const productFamilies = getProductFamilies();
  const detectionFamilies = productFamilies.filter(
    (f) => f.category === "detection"
  );
  const emissionFamilies = productFamilies.filter(
    (f) => f.category === "emission"
  );

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/products-banner.jpg"
            alt="Opto Diode Products"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Product Catalog
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Detection. Emission. Integration. — Comprehensive photonic
              solutions engineered for the most demanding environments.
            </p>
            <a
              href="/datasheets/ODC-Product-Catalog.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 hover:bg-card hover:border-primary/40 px-4 py-2.5 text-sm font-medium text-foreground transition-colors"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              Download Product Catalog
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </Container>
      </section>

      {/* Three Pillars */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} delay={i * 0.15}>
                <Link href={pillar.href} className="block h-full">
                  <GlowCard className="h-full">
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                      <div className="absolute bottom-4 left-5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                          <pillar.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs text-primary font-semibold uppercase tracking-wider">
                            {pillar.subtitle}
                          </p>
                          <h2 className="text-2xl font-bold text-white">
                            {pillar.title}
                          </h2>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-sm text-muted-foreground mb-4">
                        {pillar.description}
                      </p>

                      {/* Specs badges */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {pillar.wavelength}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {pillar.productCount}
                        </span>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1.5 mb-5">
                        {pillar.highlights.map((h) => (
                          <li
                            key={h}
                            className="text-xs text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

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

      {/* Product Families Grid */}
      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading
            subtitle="Detection"
            title="Detector Product Families"
            description="Silicon, PbSe, PbS, and avalanche photodiodes spanning soft X-ray to mid-infrared."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {detectionFamilies.map((family, i) => (
              <ScrollReveal key={family.id} delay={i * 0.05}>
                <Link
                  href={`/products/detection?sub=${family.subcategory}`}
                  className="group block rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    {family.subcategory.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {family.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {family.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-primary/80">
                      {family.wavelengthRange}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <SectionHeading
            subtitle="Emission"
            title="Emitter Product Families"
            description="UV, visible, and infrared LEDs plus broadband thermal emitters."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {emissionFamilies.map((family, i) => (
              <ScrollReveal key={family.id} delay={i * 0.05}>
                <Link
                  href={`/products/emission?sub=${family.subcategory}`}
                  className="group block rounded-xl border border-border bg-card p-4 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.08)] transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                    {family.subcategory.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {family.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {family.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-primary/80">
                      {family.wavelengthRange}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
