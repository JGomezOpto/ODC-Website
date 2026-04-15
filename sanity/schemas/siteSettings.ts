import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "logoDark",
      title: "Logo (Dark Mode)",
      type: "image",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "object",
      fields: [
        defineField({ name: "phone", type: "string", title: "Phone" }),
        defineField({ name: "customerService", type: "string", title: "Customer Service Phone" }),
        defineField({ name: "email", type: "string", title: "Email" }),
        defineField({ name: "address", type: "text", title: "Address", rows: 3 }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media Links",
      type: "object",
      fields: [
        defineField({ name: "linkedin", type: "url", title: "LinkedIn" }),
        defineField({ name: "twitter", type: "url", title: "Twitter/X" }),
        defineField({ name: "youtube", type: "url", title: "YouTube" }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", type: "string", title: "Default Meta Title" }),
        defineField({ name: "metaDescription", type: "text", title: "Default Meta Description", rows: 2 }),
        defineField({ name: "ogImage", type: "image", title: "Default OG Image" }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
