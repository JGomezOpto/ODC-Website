import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CategoryPageClient } from "@/components/products/CategoryPageClient";
import { getProductsByCategory, getProductFamilies } from "@/lib/sanity/data";
import { detectionTechnologyGroups } from "@/data/products";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo/schemas";

const DETECTION_FAQS = [
  {
    q: "What is the difference between SXUV and AXUV photodiodes?",
    a: "SXUV photodiodes are optimized for EUV lithography at 13.5 nm and related semiconductor process control applications, offering high responsivity in the 1–40 nm range. AXUV photodiodes are designed for absolute power measurements across a broader 1–190 nm soft X-ray and EUV range, serving plasma diagnostics and synchrotron beamline monitoring.",
  },
  {
    q: "What is the full spectral range of Opto Diode silicon photodiodes?",
    a: "Opto Diode silicon photodiodes cover a spectral range from approximately 1 nm soft X-ray (SXUV/AXUV series) through 190 nm deep UV (UVG series), the full visible spectrum, and into the near-infrared up to 1100 nm. PbSe and PbS detectors extend coverage further into the mid-infrared (1–5 µm).",
  },
  {
    q: "What is the difference between PbSe and PbS infrared detectors?",
    a: "PbSe (lead selenide) detectors cover 1–5 µm and are ideal for mid-infrared gas analysis, flame detection, and industrial process monitoring. PbS (lead sulfide) detectors cover 1–3 µm and are preferred for NIR sensing, moisture analysis, and lower-cost infrared applications requiring high sensitivity in the short-wave infrared.",
  },
  {
    q: "Are Opto Diode photodetectors ITAR compliant?",
    a: "Yes. Opto Diode Corporation is ITAR registered and can supply ITAR-compliant photodetectors for defense, aerospace, and government applications. Please contact sales@optodiode.com for ITAR documentation and compliance information specific to your application.",
  },
];

export const metadata: Metadata = {
  title: "Silicon Photodiodes, EUV/XUV & IR Detectors",
  description:
    "USA-made silicon photodiodes (AXUV, SXUV, UVG, blue/red-enhanced), PbSe/PbS IR detectors (1–5 µm), and APDs. ITAR compliant, ISO 9001:2015. EUV 13.5 nm specialists.",
  alternates: { canonical: "/products/detection" },
};

export default async function DetectionPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string; tech?: string }>;
}) {
  const params = await searchParams;
  const products = await getProductsByCategory("detection");
  const families = getProductFamilies().filter((f) => f.category === "detection");

  // Support both ?sub=sxuv (subcategory) and ?tech=silicon-photodiodes (technology group)
  const initialFilter = params.tech || params.sub || null;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://optodiode.com" },
    { name: "Products", item: "https://optodiode.com/products" },
    { name: "Detection Products", item: "https://optodiode.com/products/detection" },
  ]);
  const faqSchema = buildFAQSchema(DETECTION_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/products/detection-microscope.jpg"
            alt="Detection Products"
            fill
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        </div>
        <Container className="relative">
          <nav className="text-xs text-muted-foreground mb-4">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-1.5">/</span>
            <a href="/products" className="hover:text-primary">Products</a>
            <span className="mx-1.5">/</span>
            <span className="text-foreground">Detection</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            Photodiodes & APDs
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            Detection Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            From soft X-ray to mid-infrared — silicon, PbSe, and PbS detectors
            with 100% internal quantum efficiency and unmatched precision.
          </p>
        </Container>
      </section>

      <CategoryPageClient
        products={products}
        families={families}
        initialFilter={initialFilter}
        categoryName="Detection"
        technologyGroups={detectionTechnologyGroups}
      />

      {/* FAQ Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="py-16 bg-card border-t border-border">
        <Container>
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl">
            {DETECTION_FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-lg border border-border p-5">
                <h3 className="text-sm font-semibold text-foreground mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
