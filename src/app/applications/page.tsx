import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Applications",
  description: "Photonic solutions for semiconductor, aerospace, medical, industrial, fire/flame/gas detection, and food analysis applications.",
};

export default function ApplicationsPage() {
  return (
    <>
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading
            subtitle="Applications"
            title="Industries We Serve"
            description="Over four decades of photonics expertise, trusted across the world's most demanding industries."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <ScrollReveal key={industry.id} delay={i * 0.1}>
                <Link href={`/applications/${industry.slug}`} className="group block">
                  <div className="relative h-72 rounded-2xl overflow-hidden">
                    <Image src={industry.heroImage} alt={industry.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/70 transition-all" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-2xl transition-colors" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">{industry.tagline}</p>
                      <h2 className="text-xl font-bold text-white mb-2">{industry.name}</h2>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-3">{industry.description}</p>
                      <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
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
