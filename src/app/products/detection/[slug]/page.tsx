import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Download,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import { ProductCard } from "@/components/products/ProductCard";
import {
  getProductBySlug,
  getProductSlugs,
  getAllProducts,
} from "@/lib/sanity/data";
import { buildBreadcrumbSchema, buildProductSchema } from "@/lib/seo/schemas";

export async function generateStaticParams() {
  const slugs = await getProductSlugs("detection");
  return slugs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  const wavelength = product.keySpecs.wavelengthRange
    ? ` — ${product.keySpecs.wavelengthRange}`
    : "";
  return {
    title: `${product.name}${wavelength} Photodiode`,
    description: `${product.shortDescription} Part number ${product.partNumber}. Request a quote from Opto Diode Corporation.`,
    alternates: {
      canonical: `/products/detection/${product.slug}`,
    },
    openGraph: {
      url: `https://optodiode.com/products/detection/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const relatedProducts = product.relatedProducts
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof allProducts;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", item: "https://optodiode.com" },
    { name: "Products", item: "https://optodiode.com/products" },
    { name: "Detection", item: "https://optodiode.com/products/detection" },
    { name: product.name },
  ]);

  const productSchema = buildProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <Container className="py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-primary">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/products/${product.category}`}
              className="hover:text-primary capitalize"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* Product Header */}
      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Image */}
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Product image
                  </div>
                )}
                {product.isFeatured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-white">Featured</Badge>
                  </div>
                )}
              </div>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal direction="right">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs uppercase">
                    {product.subcategory.replace(/-/g, " ")}
                  </Badge>
                  {product.isNew && (
                    <Badge className="bg-primary text-white text-xs">New</Badge>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-muted-foreground mb-4">
                  Part Number: {product.partNumber}
                </p>

                <p className="text-base text-muted-foreground mb-6">
                  {product.description}
                </p>

                {/* Key Specs Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {product.keySpecs.wavelengthRange && (
                    <div className="rounded-lg bg-muted p-3">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                        Wavelength Range
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {product.keySpecs.wavelengthRange}
                      </span>
                    </div>
                  )}
                  {product.keySpecs.activeArea && (
                    <div className="rounded-lg bg-muted p-3">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                        Active Area
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {product.keySpecs.activeArea}
                      </span>
                    </div>
                  )}
                  {product.keySpecs.responsivity && (
                    <div className="rounded-lg bg-muted p-3">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                        Responsivity
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {product.keySpecs.responsivity}
                      </span>
                    </div>
                  )}
                  {product.keySpecs.packageType && (
                    <div className="rounded-lg bg-muted p-3">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground block mb-0.5">
                        Package
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {product.keySpecs.packageType}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/request-quote"
                    className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white")}
                  >
                    Request Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  {product.datasheetUrl && (
                    <a
                      href={product.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                    >
                      <Download className="mr-2 w-4 h-4" />
                      Download Datasheet
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Tabs Section */}
      <section className="pb-16">
        <Container>
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 mb-8">
              <TabsTrigger
                value="specs"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-6 py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-6 py-3"
              >
                Features
              </TabsTrigger>
              <TabsTrigger
                value="applications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-6 py-3"
              >
                Applications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs">
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left text-xs font-semibold text-foreground px-4 py-3">
                        Parameter
                      </th>
                      <th className="text-left text-xs font-semibold text-foreground px-4 py-3">
                        Value
                      </th>
                      <th className="text-left text-xs font-semibold text-foreground px-4 py-3">
                        Unit
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.specs.map((spec, i) => (
                      <tr
                        key={spec.name}
                        className={i % 2 === 0 ? "bg-card" : "bg-muted/50"}
                      >
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {spec.name}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-foreground">
                          {spec.value}
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {spec.unit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="features">
              <div className="grid sm:grid-cols-2 gap-3">
                {product.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 rounded-lg bg-card border border-border p-4"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.applications.map((app) => (
                  <Link
                    key={app}
                    href={`/applications/${app}`}
                    className="group flex items-center gap-3 rounded-lg bg-card border border-border p-4 hover:border-primary/30 transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </span>
                    <span className="text-sm font-medium text-foreground capitalize group-hover:text-primary transition-colors">
                      {app.replace(/-/g, " ")}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                  </Link>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <Container>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Related Products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-12 bg-surface-dark">
        <Container className="text-center">
          <h2 className="text-xl font-bold text-white mb-2">
            Need Help Selecting the Right Product?
          </h2>
          <p className="text-muted-foreground mb-6">
            Our application engineers are ready to assist.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white")}
          >
            Talk to an Engineer
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}
