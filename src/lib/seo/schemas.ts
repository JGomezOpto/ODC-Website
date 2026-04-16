import type { Product } from "@/data/products/types";
import type { BlogPost } from "@/data/resources";
import type { NewsEvent } from "@/data/news-events";

const BASE_URL = "https://optodiode.com";

// ─── Breadcrumb ──────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(
  items: { name: string; item?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.item ? { item: crumb.item } : {}),
    })),
  };
}

// ─── Product ─────────────────────────────────────────────────────────────────

export function buildProductSchema(product: Product) {
  const additionalProperty = [
    product.keySpecs.wavelengthRange && {
      "@type": "PropertyValue",
      name: "Wavelength Range",
      value: product.keySpecs.wavelengthRange,
    },
    product.keySpecs.activeArea && {
      "@type": "PropertyValue",
      name: "Active Area",
      value: product.keySpecs.activeArea,
    },
    product.keySpecs.responsivity && {
      "@type": "PropertyValue",
      name: "Responsivity",
      value: product.keySpecs.responsivity,
    },
    product.keySpecs.outputPower && {
      "@type": "PropertyValue",
      name: "Output Power",
      value: product.keySpecs.outputPower,
    },
    product.keySpecs.peakWavelength && {
      "@type": "PropertyValue",
      name: "Peak Wavelength",
      value: product.keySpecs.peakWavelength,
    },
    product.keySpecs.packageType && {
      "@type": "PropertyValue",
      name: "Package Type",
      value: product.keySpecs.packageType,
    },
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.partNumber,
    mpn: product.partNumber,
    brand: { "@type": "Brand", name: "Opto Diode Corporation" },
    manufacturer: {
      "@type": "Organization",
      name: "Opto Diode Corporation",
      url: BASE_URL,
    },
    ...(product.image && { image: `${BASE_URL}${product.image}` }),
    ...(additionalProperty.length > 0 && { additionalProperty }),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        description: "Contact for pricing",
      },
      seller: {
        "@type": "Organization",
        name: "Opto Diode Corporation",
        url: BASE_URL,
      },
    },
  };
}

// ─── Blog / TechArticle ───────────────────────────────────────────────────────

export function buildArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author ?? "Opto Diode Corporation",
    },
    publisher: {
      "@type": "Organization",
      name: "Opto Diode Corporation",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/branding/logo.png`,
      },
    },
    url: `${BASE_URL}/resources/blog/${post.slug}`,
    ...(post.featuredImage && {
      image: post.featuredImage.startsWith("http")
        ? post.featuredImage
        : `${BASE_URL}${post.featuredImage}`,
    }),
    keywords: post.tags.join(", "),
    about: {
      "@type": "Thing",
      name: "Photonics",
    },
  };
}

// ─── News / Event ─────────────────────────────────────────────────────────────

export function buildNewsEventSchema(event: NewsEvent) {
  if (event.type === "event") {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      description: event.excerpt,
      startDate: event.date,
      url: `${BASE_URL}/news-events/${event.slug}`,
      organizer: {
        "@type": "Organization",
        name: "Opto Diode Corporation",
        url: BASE_URL,
      },
      ...(event.location && {
        location: {
          "@type": "Place",
          name: event.location,
        },
      }),
      ...(event.featuredImage && {
        image: event.featuredImage.startsWith("http")
          ? event.featuredImage
          : `${BASE_URL}${event.featuredImage}`,
      }),
    };
  }

  // news or product announcement
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: event.title,
    description: event.excerpt,
    datePublished: event.date,
    dateModified: event.date,
    author: {
      "@type": "Organization",
      name: "Opto Diode Corporation",
    },
    publisher: {
      "@type": "Organization",
      name: "Opto Diode Corporation",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/branding/logo.png`,
      },
    },
    url: `${BASE_URL}/news-events/${event.slug}`,
    ...(event.featuredImage && {
      image: event.featuredImage.startsWith("http")
        ? event.featuredImage
        : `${BASE_URL}${event.featuredImage}`,
    }),
  };
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export function buildFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
