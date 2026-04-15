import { groq } from "next-sanity";

// ─── Products ───────────────────────────────────────────────────────

export const allProductsQuery = groq`
  *[_type == "product"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    partNumber,
    shortDescription,
    description,
    "category": category->slug.current,
    "categoryName": category->name,
    "subcategory": subcategory->slug.current,
    "subcategoryName": subcategory->name,
    "image": image.asset->url,
    keySpecs,
    features,
    isFeatured,
    isNew,
    "applications": applications[]->slug.current
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $category] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    partNumber,
    shortDescription,
    "category": category->slug.current,
    "subcategory": subcategory->slug.current,
    "subcategoryName": subcategory->name,
    "image": image.asset->url,
    keySpecs,
    features,
    isFeatured,
    isNew,
    "applications": applications[]->slug.current
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    partNumber,
    description,
    shortDescription,
    "category": category->slug.current,
    "categoryName": category->name,
    "subcategory": subcategory->slug.current,
    "subcategoryName": subcategory->name,
    "image": image.asset->url,
    specs,
    keySpecs,
    features,
    "applications": applications[]->{
      name,
      "slug": slug.current
    },
    "relatedProducts": relatedProducts[]->{
      _id,
      name,
      "slug": slug.current,
      partNumber,
      shortDescription,
      "category": category->slug.current,
      "image": image.asset->url,
      keySpecs
    },
    "datasheetUrl": datasheet.asset->url,
    isFeatured,
    isNew
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && isFeatured == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    partNumber,
    shortDescription,
    "category": category->slug.current,
    "image": image.asset->url,
    keySpecs,
    isNew
  }
`;

export const productSlugsQuery = groq`
  *[_type == "product" && category->slug.current == $category] {
    "slug": slug.current
  }
`;

// ─── Product Categories ─────────────────────────────────────────────

export const allCategoriesQuery = groq`
  *[_type == "productCategory"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "heroImage": heroImage.asset->url
  }
`;

export const subcategoriesByCategoryQuery = groq`
  *[_type == "productSubcategory" && parentCategory->slug.current == $category] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    wavelengthRange
  }
`;

// ─── Industries ─────────────────────────────────────────────────────

export const allIndustriesQuery = groq`
  *[_type == "industry"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    "heroImage": heroImage.asset->url
  }
`;

export const industryBySlugQuery = groq`
  *[_type == "industry" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    "heroImage": heroImage.asset->url,
    challenges,
    solutions,
    "relevantCategories": relevantCategories[]->slug.current
  }
`;

export const industrySlugsQuery = groq`
  *[_type == "industry"] { "slug": slug.current }
`;

// ─── Blog ───────────────────────────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset->url,
    tags,
    "author": author->{name, "photo": photo.asset->url}
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset->url,
    body,
    tags,
    "author": author->{name, jobTitle, "photo": photo.asset->url},
    "relatedProducts": relatedProducts[]->{
      _id,
      name,
      "slug": slug.current,
      partNumber,
      "category": category->slug.current,
      "image": image.asset->url
    }
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "featuredImage": featuredImage.asset->url,
    tags
  }
`;

// ─── Application Notes ──────────────────────────────────────────────

export const allAppNotesQuery = groq`
  *[_type == "applicationNote"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    summary,
    "pdfUrl": pdf.asset->url,
    publishedAt,
    "relatedProducts": relatedProducts[]->{name, "slug": slug.current}
  }
`;

// ─── Whitepapers ────────────────────────────────────────────────────

export const allWhitepapersQuery = groq`
  *[_type == "whitepaper"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    abstract,
    authors,
    "pdfUrl": pdf.asset->url,
    publishedAt
  }
`;

// ─── Glossary ───────────────────────────────────────────────────────

export const allGlossaryTermsQuery = groq`
  *[_type == "glossaryTerm"] | order(term asc) {
    _id,
    term,
    definition,
    category
  }
`;

// ─── News & Events ──────────────────────────────────────────────────

export const allNewsEventsQuery = groq`
  *[_type == "newsEvent"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    location,
    "excerpt": pt::text(body[0..1]),
    "featuredImage": featuredImage.asset->url
  }
`;

export const newsEventBySlugQuery = groq`
  *[_type == "newsEvent" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    type,
    date,
    location,
    body,
    "featuredImage": featuredImage.asset->url
  }
`;

export const newsEventSlugsQuery = groq`
  *[_type == "newsEvent"] { "slug": slug.current }
`;

// ─── Company ────────────────────────────────────────────────────────

export const companyInfoQuery = groq`
  *[_type == "companyInfo"][0] {
    mission,
    vision,
    founded,
    stats,
    timeline
  }
`;

export const allCertificationsQuery = groq`
  *[_type == "certification"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "logo": logo.asset->url,
    "certificateUrl": certificate.asset->url,
    validUntil
  }
`;

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    jobTitle,
    "photo": photo.asset->url,
    bio
  }
`;

// ─── Site Settings ──────────────────────────────────────────────────

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    "logo": logo.asset->url,
    "logoDark": logoDark.asset->url,
    contact,
    social,
    seo {
      metaTitle,
      metaDescription,
      "ogImage": ogImage.asset->url
    }
  }
`;
