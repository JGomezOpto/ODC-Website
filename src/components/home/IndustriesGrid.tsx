"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";

const industries = [
  {
    name: "Semiconductors",
    description: "EUV/DUV lithography & wafer inspection",
    image: "/images/industries/semiconductor.jpg",
    href: "/applications/semiconductor",
  },
  {
    name: "Aerospace & Defense",
    description: "Space-qualified detectors & covert IR",
    image: "/images/industries/aerospace-defense.jpg",
    href: "/applications/aerospace-defense",
  },
  {
    name: "Medical Diagnostics",
    description: "Fluorescence microscopy & diagnostics",
    image: "/images/industries/medical.jpg",
    href: "/applications/medical",
  },
  {
    name: "Fire, Flame & Gas",
    description: "IR detection & environmental monitoring",
    image: "/images/industries/fire-flame-gas.jpg",
    href: "/applications/fire-flame-gas",
  },
  {
    name: "Industrial",
    description: "Machine vision & process control",
    image: "/images/industries/industrial.jpg",
    href: "/applications/industrial",
  },
  {
    name: "Food Analysis",
    description: "NIR/MIR spectroscopy & quality control",
    image: "/images/industries/food-analysis.jpg",
    href: "/applications/food-analysis",
  },
];

export function IndustriesGrid() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <Container>
        <SectionHeading
          subtitle="Applications"
          title="Industries We Serve"
          description="Photonic solutions trusted across the world's most demanding industries."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.name} delay={i * 0.1}>
              <Link href={industry.href} className="block group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-56 lg:h-64 rounded-xl overflow-hidden"
                >
                  <Image
                    src={industry.image}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all" />

                  {/* Red accent on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/40 rounded-xl transition-colors" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {industry.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
