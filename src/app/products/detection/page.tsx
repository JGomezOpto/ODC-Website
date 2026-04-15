import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CategoryPageClient } from "@/components/products/CategoryPageClient";
import { getProductsByCategory, getProductFamilies } from "@/lib/sanity/data";
import { detectionTechnologyGroups } from "@/data/products";

export const metadata: Metadata = {
  title: "Detection Products",
  description:
    "Silicon photodiodes (SXUV, AXUV, UVG), PbSe and PbS infrared detectors, and avalanche photodiodes for EUV to mid-infrared detection.",
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

  return (
    <>
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
    </>
  );
}
