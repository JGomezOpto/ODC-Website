import { defineField, defineType } from "sanity";

export const whitepaper = defineType({
  name: "whitepaper",
  title: "Whitepaper",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "abstract",
      title: "Abstract",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "pdf",
      title: "PDF Document",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "abstract" },
  },
});
