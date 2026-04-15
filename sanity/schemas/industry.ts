import { defineField, defineType } from "sanity";

export const industry = defineType({
  name: "industry",
  title: "Industry Vertical",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "challenges",
      title: "Challenges",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "solutions",
      title: "Solutions",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relevantCategories",
      title: "Relevant Product Subcategories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "productSubcategory" }] }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", media: "heroImage" },
  },
});
