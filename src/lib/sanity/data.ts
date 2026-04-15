/**
 * Unified data access layer.
 *
 * Tries Sanity first. If the Sanity project is not configured (projectId is
 * "placeholder") or the fetch fails, falls back to the static TypeScript data
 * in src/data/. This means the site works identically without Sanity — and
 * seamlessly switches to CMS data once a real project is connected.
 */

import { sanityFetch } from "./client";
import {
  allProductsQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  featuredProductsQuery,
  productSlugsQuery,
  allIndustriesQuery,
  industryBySlugQuery,
  industrySlugsQuery,
  allBlogPostsQuery,
  blogPostBySlugQuery,
  latestBlogPostsQuery,
  allAppNotesQuery,
  allWhitepapersQuery,
  allGlossaryTermsQuery,
  allNewsEventsQuery,
  newsEventBySlugQuery,
  newsEventSlugsQuery,
  companyInfoQuery,
  allCertificationsQuery,
  allTeamMembersQuery,
  siteSettingsQuery,
} from "./queries";

// Static data imports (fallback)
import {
  allProducts as staticProducts,
  getProductBySlug as staticGetProductBySlug,
  getProductsByCategory as staticGetProductsByCategory,
  getFeaturedProducts as staticGetFeaturedProducts,
  getProductsByIndustry as staticGetProductsByIndustry,
  productFamilies as staticProductFamilies,
} from "@/data/products";
import type { Product, ProductCategory, IndustryVertical } from "@/data/products/types";
import type { BlogPost, AppNote, Whitepaper, GlossaryTerm, Certification } from "@/data/resources";
import type { NewsEvent } from "@/data/news-events";
import { newsEvents as staticNewsEvents } from "@/data/news-events";
import { industries as staticIndustries } from "@/data/industries";
import {
  blogPosts as staticBlogPosts,
  appNotes as staticAppNotes,
  whitepapers as staticWhitepapers,
  glossaryTerms as staticGlossaryTerms,
  certifications as staticCertifications,
} from "@/data/resources";

// ─── Products ───────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>(allProductsQuery);
  return data ?? staticProducts;
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const data = await sanityFetch<Product[]>(productsByCategoryQuery, { category });
  return data ?? staticGetProductsByCategory(category);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const data = await sanityFetch<Product | null>(productBySlugQuery, { slug });
  return data ?? staticGetProductBySlug(slug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await sanityFetch<Product[]>(featuredProductsQuery);
  return data ?? staticGetFeaturedProducts();
}

export async function getProductSlugs(category: string): Promise<{ slug: string }[]> {
  const data = await sanityFetch<{ slug: string }[]>(productSlugsQuery, { category });
  if (data) return data;
  return staticGetProductsByCategory(category as ProductCategory).map((p) => ({
    slug: p.slug,
  }));
}

export async function getProductsByIndustry(industry: IndustryVertical): Promise<Product[]> {
  // For now, always use static data for industry-product matching
  // since the Sanity query would need to resolve industry references
  return staticGetProductsByIndustry(industry);
}

export function getProductFamilies() {
  return staticProductFamilies;
}

// ─── Industries ─────────────────────────────────────────────────────

export async function getAllIndustries() {
  const data = await sanityFetch(allIndustriesQuery);
  return data ?? staticIndustries;
}

export async function getIndustryBySlug(slug: string) {
  const data = await sanityFetch(industryBySlugQuery, { slug });
  return data ?? staticIndustries.find((i) => i.slug === slug);
}

export async function getIndustrySlugs(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<{ slug: string }[]>(industrySlugsQuery);
  return data ?? staticIndustries.map((i) => ({ slug: i.slug }));
}

// ─── Blog ───────────────────────────────────────────────────────────

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await sanityFetch<BlogPost[]>(allBlogPostsQuery);
  return data ?? staticBlogPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await sanityFetch<BlogPost>(blogPostBySlugQuery, { slug });
  return data ?? staticBlogPosts.find((p) => p.slug === slug) ?? null;
}

export async function getLatestBlogPosts(): Promise<BlogPost[]> {
  const data = await sanityFetch<BlogPost[]>(latestBlogPostsQuery);
  return data ?? staticBlogPosts.slice(0, 3);
}

// ─── Resources ──────────────────────────────────────────────────────

export async function getAllAppNotes(): Promise<AppNote[]> {
  const data = await sanityFetch<AppNote[]>(allAppNotesQuery);
  return data ?? staticAppNotes;
}

export async function getAllWhitepapers(): Promise<Whitepaper[]> {
  const data = await sanityFetch<Whitepaper[]>(allWhitepapersQuery);
  return data ?? staticWhitepapers;
}

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  const data = await sanityFetch<GlossaryTerm[]>(allGlossaryTermsQuery);
  return data ?? staticGlossaryTerms;
}

// ─── News & Events ──────────────────────────────────────────────────

export async function getAllNewsEvents(): Promise<NewsEvent[]> {
  const data = await sanityFetch<NewsEvent[]>(allNewsEventsQuery);
  return data ?? staticNewsEvents;
}

export async function getNewsEventBySlug(slug: string): Promise<NewsEvent | null> {
  const data = await sanityFetch<NewsEvent | null>(newsEventBySlugQuery, { slug });
  if (data) return data;
  return staticNewsEvents.find((e) => e.slug === slug) ?? null;
}

export async function getNewsEventSlugs(): Promise<{ slug: string }[]> {
  const data = await sanityFetch<{ slug: string }[]>(newsEventSlugsQuery);
  if (data && data.length > 0) return data;
  return staticNewsEvents.map((e) => ({ slug: e.slug }));
}

// ─── Company ────────────────────────────────────────────────────────

export async function getCompanyInfo() {
  return sanityFetch(companyInfoQuery);
}

export async function getAllCertifications(): Promise<Certification[]> {
  const data = await sanityFetch<Certification[]>(allCertificationsQuery);
  return data ?? staticCertifications;
}

export async function getAllTeamMembers() {
  return sanityFetch(allTeamMembersQuery);
}

// ─── Site Settings ──────────────────────────────────────────────────

export async function getSiteSettings() {
  return sanityFetch(siteSettingsQuery);
}
