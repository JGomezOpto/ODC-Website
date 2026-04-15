import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CategoryPageClient } from "@/components/products/CategoryPageClient";
import { getProductsByCategory, getProductFamilies } from "@/lib/sanity/data";
import type { ListColumn } from "@/components/products/ProductCard";

const emissionListColumns: ListColumn[] = [
  { key: "wavelengthRange", label: "Wavelength", width: "w-28" },
  { key: "outputPower", label: "Output Power", width: "w-24" },
  { key: "packageType", label: "Package", width: "w-20" },
];

export const metadata: Metadata = {
  title: "Emission Products",
  description:
    "UV, visible, and infrared LEDs plus broadband thermal emitters. GaAlAs, InGaN, and AlInGaP technologies for demanding applications.",
};

export default async function EmissionPage({
  searchParams,
}: {
  searchParams: Promise<{ sub?: string }>;
}) {
  const params = await searchParams;
  const products = await getProductsByCategory("emission");
  const families = getProductFamilies().filter((f) => f.category === "emission");

  return (
    <>
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
    </>
  );
}
