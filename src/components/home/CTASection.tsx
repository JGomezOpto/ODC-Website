"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-surface-dark">
      {/* Red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <Container className="relative text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-8">
            Our application engineers are ready to help you find the perfect
            photonic solution. Get a quote or talk to an expert today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/request-quote"
              className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white px-8 h-12")}
            >
              Request a Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-white/20 text-white hover:bg-white/10 px-8 h-12")}
            >
              <MessageCircle className="mr-2 w-4 h-4" />
              Contact Us
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
