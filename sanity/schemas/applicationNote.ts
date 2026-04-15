import { defineField, defineType } from "sanity";

export const applicationNote = defineType({
  name: "applicationNote",
  title: "Application Note",
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
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
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
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "industries",
      title: "Related Industries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "industry" }] }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "summary" },
  },
});
