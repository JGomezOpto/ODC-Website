import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cog, Package, Microscope, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export const metadata: Metadata = {
  title: "Integration & Custom Solutions",
  description: "Custom opto-electronic assemblies and photonic solutions. From prototype to high-volume production, tailored to your specifications.",
};

const process = [
  { icon: Microscope, title: "Consult", description: "Discuss your requirements with our application engineers to identify the optimal solution." },
  { icon: Cog, title: "Design", description: "Our team designs custom assemblies using our full portfolio of detectors, emitters, and optics." },
  { icon: Package, title: "Prototype", description: "Rapid prototyping in our in-house facilities with iterative refinement until specs are met." },
  { icon: Zap, title: "Production", description: "Scale from prototype to high-volume production with ISO 9001 certified quality controls." },
];

export default function IntegrationPage() {
  return (
    <>
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
    </>
  );
}
