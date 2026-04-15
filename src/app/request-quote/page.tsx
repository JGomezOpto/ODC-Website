import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a quote for Opto Diode photodetectors, LED emitters, or custom photonic solutions. Minimum order $3,000 for direct orders.",
};

export default function RequestQuotePage() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Request a Quote</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">Get a Custom Quote</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your requirements and our team will provide a detailed quote within 1-2 business days.
            </p>
          </div>

          <ScrollReveal>
            <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
              <ContactForm />
            </div>
          </ScrollReveal>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Minimum order: $3,000 for direct orders.</p>
            <p className="mt-1">
              For smaller quantities, please contact our{" "}
              <a href="/contact" className="text-primary hover:underline">sales team</a>{" "}
              or visit one of our authorized distributors.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
