import type { MetadataRoute } from "next";
import { allProducts } from "@/data/products";
import { industries } from "@/data/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://optodiode.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/products/detection`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/products/emission`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/products/integration`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/applications`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/company`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${baseUrl}/request-quote`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/news-events`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];

  const productPages: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${baseUrl}/products/${product.category}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${baseUrl}/applications/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...industryPages];
}
