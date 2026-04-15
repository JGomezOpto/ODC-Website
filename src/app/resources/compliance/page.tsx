import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Download, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { getAllCertifications } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "Compliance & Regulatory",
  description:
    "ISO 9001:2015, ITAR, AS9100, RoHS, REACH certifications and compliance documentation from Opto Diode Corporation.",
};

export default async function CompliancePage() {
  const certs = await getAllCertifications();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Compliance & Regulatory"
          title="Certifications & Standards"
          description="Meeting the most stringent quality and regulatory requirements across all markets we serve."
        />

        <nav className="text-xs text-muted-foreground mb-10">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/resources" className="hover:text-primary">
            Resources
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-foreground">Compliance</span>
        </nav>

        {certs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {certs.map((cert, i) => (
              <ScrollReveal key={cert._id} delay={i * 0.08}>
                <div className="h-full rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] transition-all flex flex-col">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground mb-2">
                    {cert.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {cert.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border">
                    <span className="inline-flex items-center gap-1 text-green-400">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Active
                    </span>
                    {cert.certificateUrl && (
                      <a
                        href={cert.certificateUrl}
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Certificate
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No certifications available. Check back soon.
          </p>
        )}

        <ScrollReveal>
          <div className="max-w-3xl mx-auto mt-16 rounded-xl border border-border bg-card p-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Need Compliance Documentation?
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Contact us for certificates of conformance, material declarations,
              conflict mineral reports, or other compliance documentation for
              your specific requirements.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium h-9 px-6 transition-colors"
            >
              Request Documentation
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
