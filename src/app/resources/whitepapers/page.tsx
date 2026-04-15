import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Download, Calendar, Users } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { getAllWhitepapers } from "@/lib/sanity/data";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "Research publications on photodiode performance, infrared detector characterization, and photonic system design from Opto Diode Corporation.",
};

export default async function WhitepapersPage() {
  const papers = await getAllWhitepapers();

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading
          subtitle="Whitepapers"
          title="Research Publications"
          description="In-depth research on photonic device performance and characterization."
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
          <span className="text-foreground">Whitepapers</span>
        </nav>

        {papers.length > 0 ? (
          <div className="space-y-4 max-w-4xl mx-auto">
            {papers.map((paper, i) => (
              <ScrollReveal key={paper._id} delay={i * 0.06}>
                <div className="group rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.08)] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {paper.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-3">
                        {paper.abstract}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        {paper.authors.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            {paper.authors.join(", ")}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(paper.publishedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long" }
                          )}
                        </span>
                        {paper.pdfUrl && (
                          <a
                            href={paper.pdfUrl}
                            className="inline-flex items-center gap-1 text-primary hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No whitepapers yet. Check back soon.
          </p>
        )}
      </Container>
    </section>
  );
}
