"use client";

import Image from "next/image";
import { Shield, Zap, Users, FlaskConical } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const differentiators = [
  {
    icon: Shield,
    title: "Zero Defects Quality",
    description:
      "ISO 9001:2015 certified manufacturing with comprehensive quality controls and full traceability from wafer to packaged device.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description:
      "From concept to functional prototype in weeks. Our in-house fabrication enables fast iteration and custom design.",
  },
  {
    icon: FlaskConical,
    title: "Harsh Environment Expertise",
    description:
      "ITAR registered and space-heritage qualified. Our detectors operate in extreme radiation, temperature, and vacuum conditions.",
  },
  {
    icon: Users,
    title: "Application Engineering",
    description:
      "Dedicated application engineers work with you to select, customize, and optimize photonic solutions for your specific needs.",
  },
];

export function WhyODC() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <ScrollReveal direction="left">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/manufacturing/clean-room.jpg"
                alt="Opto Diode manufacturing clean room"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
            </div>
          </ScrollReveal>

          {/* Content side */}
          <div>
            <SectionHeading
              subtitle="Why Opto Diode"
              title="Trusted by Industry Leaders"
              description="Over four decades of photonics excellence, serving the world's most demanding applications."
              align="left"
            />

            <div className="grid sm:grid-cols-2 gap-6">
              {differentiators.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.1}>
                  <div className="flex gap-3">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
