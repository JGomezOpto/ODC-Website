import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CategoryPageClient } from "@/components/products/CategoryPageClient";
import { getProductsByCategory, getProductFamilies } from "@/lib/sanity/data";
import type { ListColumn } from "@/components/products/ProductCard";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo/schemas";

const EMISSION_FAQS = [
  {
    q: "What wavelength range do Opto Diode LED emitters cover?",
    a: "Opto Diode LED emitters span from 365 nm UV through 5 µm mid-infrared. The range includes InGaN UV/visible LEDs (365–530 nm), AlInGaP visible LEDs (590–660 nm), GaAlAs near-infrared LEDs (810–940 nm), and broadband MIR thermal emitters (2–5 µm) for gas sensing and spectroscopy.",
  },
  {
    q: "Do you offer IR LED emitters for NDIR gas sensing?",
    a: "Yes. Opto Diode offers a range of 2–5 µm mid-infrared LED emitters optimized for NDIR (non-dispersive infrared) gas sensing. These MIR emitters pair with PbSe detectors to detect CO₂, methane, hydrocarbons, and other target gases in industrial, environmental, and safety monitoring systems.",
  },
  {
    q: "What LED semiconductor technologies are available?",
    a: "Opto Diode offers four LED technologies: GaAlAs for 810–940 nm NIR emission, InGaN for 365–530 nm UV and blue-green, AlInGaP for 590–660 nm visible emission, and broadband MIR thermal emitters for 2–5 µm mid-infrared. All are available in TO-can, SMD, and custom package configurations.",
  },
  {
    q: "Can Opto Diode supply LEDs at custom wavelengths or in custom packages?",
    a: "Yes. Our applications engineering team works with OEM customers to develop custom LED wavelengths, matched detector–emitter pairs, and hermetically sealed assemblies tailored to specific sensing requirements. Contact sales@optodiode.com to discuss your application.",
  },
];

const emissionListColumns: ListColumn[] = [
  { key: "wavelengthRange", label: "Wavelength", width: "w-28" },
  { key: "outputPower", label: "Output Power", width: "w-24" },
  { key: "packageType", label: "Package", width: "w-20" },
];

export const metadata: Metadata = {
  title: "UV & Infrared LED Emitters — 365 nm to 5 µm",
  description:
    "GaAlAs NIR LEDs (810–940 nm), InGaN UV LEDs (365–530 nm), AlInGaP visible LEDs, and MIR broadband emitters (2–5 µm) for NDIR gas sensing. OEM & custom assemblies.",
  alternates: { canonical: "/products/emission" },
};

export default async function EmissionPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string }>;
}) {
  const params = await searchParams;
  const products = await getProductsByCategory("emission");
  const families = getProductFamilies().filter((f) => f.category === "emission");

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://optodiode.com" },
    { name: "Products", item: "https://optodiode.com/products" },
    { name: "Emission Products", item: "https://optodiode.com/products/emission" },
  ]);
  const faqSchema = buildFAQSchema(EMISSION_FAQS);

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
            src="/images/products/emission-banner.jpg"
            alt="Emission Products"
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
            <span className="text-foreground">Emission</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">
            LEDs & IR Emitters
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
            Emission Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Broadband and narrowband emission from UV through mid-infrared.
            High-power LEDs and thermal emitters for sensing, illumination, and
            spectroscopy.
          </p>
        </Container>
      </section>

      <CategoryPageClient
        products={products}
        families={families}
        initialFilter={params.sub || null}
        categoryName="Emission"
        listColumns={emissionListColumns}
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
            {EMISSION_FAQS.map(({ q, a }) => (
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
