"use client";

import { Container } from "@/components/layout/Container";
import { StatCounter } from "@/components/common/StatCounter";

const stats = [
  { value: 40, suffix: "+", label: "Years of Excellence" },
  { value: 1000, suffix: "+", label: "Products Available" },
  { value: 6, label: "Industries Served" },
  { value: 100, suffix: "%", label: "Quality Commitment" },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-surface-dark relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Red accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <Container className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
