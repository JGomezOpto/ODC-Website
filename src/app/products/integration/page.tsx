import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cog, Package, Microscope, Zap, HeartPulse, Shield, Factory, Leaf, FlaskConical, Cpu } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { StatCounter } from "@/components/common/StatCounter";
import { GlowCard } from "@/components/common/GlowCard";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo/schemas";

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", item: "https://optodiode.com" },
  { name: "Products", item: "https://optodiode.com/products" },
  { name: "Custom Integration Solutions", item: "https://optodiode.com/products/integration" },
]);

const INTEGRATION_FAQS = [
  {
    q: "What is a custom opto-electronic assembly?",
    a: "A custom opto-electronic assembly combines detectors, emitters, optics, and electronics into a single, application-specific module. Opto Diode integrates its own USA-manufactured photodiodes, LEDs, and IR emitters with custom amplifier circuits, lenses, and hermetic packaging—delivering a complete photonic sub-system tailored to your wavelength, sensitivity, and form-factor requirements.",
  },
  {
    q: "What wavelengths can Opto Diode integrate into a custom assembly?",
    a: "Opto Diode can integrate detectors and emitters spanning 1 nm EUV/soft X-ray through 12 µm mid-infrared. This covers silicon photodiodes (1–1100 nm), deep-UV LEDs (210–400 nm), visible and NIR LEDs, PbSe detectors (1–5 µm), and thermal IR emitters (1–12 µm)—all sourced from our in-house product portfolio.",
  },
  {
    q: "What packaging options are available for custom opto-electronic modules?",
    a: "We offer TO-can hermetic packages (TO-5, TO-8, TO-18, TO-46 and custom variants), surface-mount modules, fiber-coupled assemblies, multi-element detector arrays, PCB-integrated hybrids, and windowed or lens-coupled configurations. Hermetically sealed packages are available for harsh environments, vacuum systems, and space-qualified applications.",
  },
  {
    q: "What is the minimum order quantity for a custom integration project?",
    a: "There is no minimum order quantity for custom assemblies. We support single-unit prototype builds through volume production runs of 100,000+ units per year, with the same ISO 9001:2015 quality controls applied at every scale.",
  },
  {
    q: "Are Opto Diode custom assemblies ITAR compliant?",
    a: "Yes. Opto Diode Corporation is ITAR registered and manufactures all products in the USA. We can supply ITAR-compliant custom assemblies for defense, aerospace, and government programs. Contact sales@optodiode.com for compliance documentation specific to your program.",
  },
  {
    q: "How long does a custom integration project take from specification to delivery?",
    a: "Prototype assemblies typically have a 4–8 week lead time from approved specifications. Production lead times depend on complexity, volume, and component availability, and are established during the design phase. Our application engineers work closely with customers throughout the process to meet program schedules.",
  },
];

const faqSchema = buildFAQSchema(INTEGRATION_FAQS);

export const metadata: Metadata = {
  title: "Custom Opto-Electronic Integration & OEM Assemblies",
  description:
    "Hermetically sealed custom opto-electronic assemblies, detector–emitter matched pairs, and OEM photonic modules. ISO 9001:2015 certified. From prototype to volume production.",
};

const process = [
  { icon: Microscope, title: "Consult", description: "Discuss your requirements with our application engineers to identify the optimal solution." },
  { icon: Cog, title: "Design", description: "Our team designs custom assemblies using our full portfolio of detectors, emitters, and optics." },
  { icon: Package, title: "Prototype", description: "Rapid prototyping in our in-house facilities with iterative refinement until specs are met." },
  { icon: Zap, title: "Production", description: "Scale from prototype to high-volume production with ISO 9001 certified quality controls." },
];

const applications = [
  {
    icon: HeartPulse,
    title: "Medical Diagnostics",
    description: "Pulse oximetry, blood glucose analysis, photoplethysmography, and clinical instrument modules requiring FDA-traceable, tightly matched detector–emitter pairs.",
  },
  {
    icon: Shield,
    title: "Defense & Aerospace",
    description: "ITAR-compliant opto-electronic assemblies for targeting, guidance, countermeasure, and electro-optical sensor systems with hermetic packaging for extreme environments.",
  },
  {
    icon: Factory,
    title: "Industrial Automation",
    description: "Flame detection, machine vision, laser alignment, and process control modules built for continuous operation in high-vibration, high-temperature industrial settings.",
  },
  {
    icon: Leaf,
    title: "Environmental Monitoring",
    description: "Multi-gas NDIR sensors, atmospheric LIDAR receivers, and spectroscopic assemblies for pollution monitoring and climate research instrumentation.",
  },
  {
    icon: FlaskConical,
    title: "Scientific Instrumentation",
    description: "High-sensitivity modules for synchrotron beamlines, spectrophotometers, fluorescence imaging systems, and laboratory analytical instruments.",
  },
  {
    icon: Cpu,
    title: "Semiconductor Manufacturing",
    description: "EUV and DUV process-control sensors, wafer inspection photodetectors, and photolithography alignment modules for sub-10 nm node fabrication tools.",
  },
];

export default function IntegrationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/products/integration-banner.jpg" alt="Custom Integration" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <Container className="relative">
          <nav className="text-xs text-muted-foreground mb-4">
            <a href="/" className="hover:text-primary">Home</a><span className="mx-1.5">/</span>
            <a href="/products" className="hover:text-primary">Products</a><span className="mx-1.5">/</span>
            <span className="text-foreground">Integration</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Custom Solutions</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">Integration</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            Complete opto-electronic assemblies tailored to your specifications. Leveraging 40+ years of photonics expertise from prototype to high-volume production.
          </p>
          <Link href="/request-quote" className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white")}>
            Start a Custom Project <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <SectionHeading subtitle="How It Works" title="Our Process" description="From concept to production in four streamlined steps." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-xs font-semibold text-primary mb-1">Step {i + 1}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <Image src="/images/manufacturing/assembly.jpg" alt="Assembly facilities" width={600} height={400} className="rounded-2xl w-full" />
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-3xl font-bold text-foreground mb-4">Capabilities</h2>
              <ul className="space-y-3">
                {["Custom detector modules with integrated amplification", "Matched emitter-detector pairs for specific wavelengths", "Multi-element detector arrays", "Hermetic packaging for harsh environments", "ITAR-compliant assemblies for defense applications", "Prototype quantities to 100,000+ units"].map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    {cap}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats / Trust Bar */}
      <section className="py-12 bg-primary/5 border-y border-border">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value={40} suffix="+" label="Years of Photonics Expertise" />
            <StatCounter value={100} suffix="k+" label="Max Units per Production Run" />
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">ISO</div>
              <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">9001:2015 Certified</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">ITAR</div>
              <div className="mt-2 text-sm sm:text-base text-muted-foreground font-medium">Registered Manufacturer</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <SectionHeading
            subtitle="Industries Served"
            title="Application Markets"
            description="Opto Diode custom assemblies are engineered for demanding environments across the world's most precision-driven industries."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app, i) => (
              <ScrollReveal key={app.title} delay={i * 0.08}>
                <GlowCard className="p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <app.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{app.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
                </GlowCard>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-16 bg-card border-t border-border">
        <Container>
          <h2 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl">
            {INTEGRATION_FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-lg border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
