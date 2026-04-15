import { detectionProducts } from "./detection";
import { emissionProducts } from "./emission";
import type { Product, ProductCategory, ProductFamily, IndustryVertical } from "./types";

export type { Product, ProductCategory, ProductFamily, IndustryVertical };
export { detectionProducts, emissionProducts };

export const allProducts: Product[] = [...detectionProducts, ...emissionProducts];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return allProducts.filter((p) => p.subcategory === subcategory);
}

export function getProductsByIndustry(industry: IndustryVertical): Product[] {
  return allProducts.filter((p) => p.applications.includes(industry));
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.isFeatured);
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.partNumber.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.subcategory.toLowerCase().includes(lower)
  );
}

export const productFamilies: ProductFamily[] = [
  {
    id: "sxuv",
    slug: "sxuv",
    name: "SXUV Series",
    category: "detection",
    subcategory: "sxuv",
    description: "EUV-optimized photodiodes with integrated thin film filters for 1\u2013190 nm",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "1\u2013190 nm",
    productCount: 2,
  },
  {
    id: "axuv",
    slug: "axuv",
    name: "AXUV Series",
    category: "detection",
    subcategory: "axuv",
    description: "100% internal quantum efficiency detectors for soft X-ray to VUV",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "0.01\u2013190 nm",
    productCount: 2,
  },
  {
    id: "uvg",
    slug: "uvg",
    name: "UVG Series",
    category: "detection",
    subcategory: "uvg",
    description: "Reliable UV detectors optimized for 190\u2013400 nm",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "190\u2013400 nm",
    productCount: 1,
  },
  {
    id: "blue-enhanced",
    slug: "blue-enhanced",
    name: "Blue Enhanced",
    category: "detection",
    subcategory: "blue-enhanced",
    description: "High responsivity in the blue-green visible region",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "400\u20131000 nm",
    productCount: 1,
  },
  {
    id: "red-enhanced",
    slug: "red-enhanced",
    name: "Red Enhanced",
    category: "detection",
    subcategory: "red-enhanced",
    description: "Extended sensitivity in the red and near-infrared region",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "400\u20131100 nm",
    productCount: 1,
  },
  {
    id: "pbse",
    slug: "pbse",
    name: "PbSe Detectors",
    category: "detection",
    subcategory: "pbse",
    description: "High-sensitivity lead selenide infrared detectors for 1\u20135 \u03BCm",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "1\u20135 \u03BCm",
    productCount: 1,
  },
  {
    id: "pbs",
    slug: "pbs",
    name: "PbS Detectors",
    category: "detection",
    subcategory: "pbs",
    description: "Broadband lead sulfide infrared detectors for 1\u20133 \u03BCm",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "1\u20133 \u03BCm",
    productCount: 1,
  },
  {
    id: "apd",
    slug: "apd",
    name: "Avalanche Photodiodes",
    category: "detection",
    subcategory: "apd",
    description: "High-gain, low-noise APDs for low-light detection",
    image: "/images/products/silicon-detectors.jpg",
    wavelengthRange: "400\u20131700 nm",
    productCount: 1,
  },
  {
    id: "ir-led",
    slug: "ir-led",
    name: "IR LEDs",
    category: "emission",
    subcategory: "ir-led",
    description: "High-power infrared LEDs from 850\u2013940 nm",
    image: "/images/products/emission-banner.jpg",
    wavelengthRange: "850\u2013940 nm",
    productCount: 2,
  },
  {
    id: "uv-led",
    slug: "uv-led",
    name: "UV LEDs",
    category: "emission",
    subcategory: "uv-led",
    description: "UV-A and UV-B LEDs for curing and fluorescence",
    image: "/images/products/emission-banner.jpg",
    wavelengthRange: "320\u2013365 nm",
    productCount: 1,
  },
  {
    id: "visible-led",
    slug: "visible-led",
    name: "Visible LEDs",
    category: "emission",
    subcategory: "visible-led",
    description: "High-brightness visible LEDs across the spectrum",
    image: "/images/products/emission-banner.jpg",
    wavelengthRange: "400\u2013700 nm",
    productCount: 1,
  },
  {
    id: "ir-emitter",
    slug: "ir-emitter",
    name: "IR Emitters",
    category: "emission",
    subcategory: "ir-emitter",
    description: "Broadband thermal infrared emitters for gas sensing",
    image: "/images/products/emission-banner.jpg",
    wavelengthRange: "2\u20135 \u03BCm",
    productCount: 1,
  },
];
