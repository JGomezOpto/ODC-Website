import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, FileText, GraduationCap, Shield, Newspaper } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description: "Technical resources: blog, application notes, whitepapers, photonics glossary, and compliance documentation from Opto Diode Corporation.",
};

const resources = [
  {
    title: "Blog",
    description: "Latest insights on photonics technology, product updates, and industry news.",
    icon: Newspaper,
    href: "/resources/blog",
    count: "8+ articles",
  },
  {
    title: "Application Notes",
    description: "Technical guides for applying our products in real-world scenarios.",
    icon: FileText,
    href: "/resources/application-notes",
    count: "8 notes",
  },
  {
    title: "Whitepapers",
    description: "In-depth research publications on photodiode performance and characterization.",
    icon: BookOpen,
    href: "/resources/whitepapers",
    count: "9 papers",
  },
  {
    title: "Glossary",
    description: "200+ photonics terms explained — from responsivity to quantum efficiency.",
    icon: GraduationCap,
    href: "/resources/glossary",
    count: "200+ terms",
  },
  {
    title: "Compliance & Regulatory",
    description: "ISO 9001, ITAR, RoHS, REACH certifications and compliance documentation.",
    icon: Shield,
    href: "/resources/compliance",
    count: "6 certifications",
  },
];

export default function ResourcesPage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Resources"
          title="Technical Resources"
          description="Explore our library of technical content to support your photonics projects."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource, i) => (
            <ScrollReveal key={resource.title} delay={i * 0.1}>
              <Link href={resource.href} className="group block h-full">
                <div className="h-full rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <resource.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{resource.count}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
