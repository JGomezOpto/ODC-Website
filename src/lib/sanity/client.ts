import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(sanityConfig);

// Preview client (no CDN, includes drafts)
export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

const builder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}

/**
 * Helper to fetch from Sanity with automatic fallback.
 * In development or when Sanity is not configured, returns null
 * so pages can fall back to static data.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (sanityConfig.projectId === "placeholder") {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    console.warn("[Sanity] Fetch failed, falling back to static data");
    return null;
  }
}
