import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ProductCard } from "@/components/products/ProductCard";
import { getIndustrySlugs, getProductsByIndustry } from "@/lib/sanity/data";
import { industries as staticIndustries } from "@/data/industries";
import type { IndustryVertical } from "@/data/products/types";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateStaticParams() {
  const slugs = await getIndustrySlugs();
  return slugs.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = staticIndustries.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `${industry.name} Applications`,
    description: industry.description,
    alternates: { canonical: `/applications/${slug}` },
    openGraph: { url: `https://optodiode.com/applications/${slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = staticIndustries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const products = await getProductsByIndustry(industry.id as IndustryVertical);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://optodiode.com" },
    { name: "Applications", item: "https://optodiode.com/applications" },
    { name: industry.name, item: `https://optodiode.com/applications/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={industry.heroImage} alt={industry.name} fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <Container className="relative">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/applications" className="hover:text-primary">Applications</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{industry.name}</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">{industry.tagline}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">{industry.name}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{industry.description}</p>
        </Container>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-16 lg:py-24 bg-card">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-bold text-foreground mb-6">Challenges</h2>
              <ul className="space-y-4">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-2xl font-bold text-foreground mb-6">Our Solutions</h2>
              <ul className="space-y-4">
                {industry.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Relevant Products */}
      {products.length > 0 && (
        <section className="py-16 lg:py-24">
          <Container>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Recommended Products for {industry.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.slice(0, 6).map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-surface-dark">
        <Container className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need a Custom Solution for {industry.name}?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our engineers specialize in photonic solutions for {industry.name.toLowerCase()} applications.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white")}>
            Contact Our Team <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
