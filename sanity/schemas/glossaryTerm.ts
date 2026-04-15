import { defineField, defineType } from "sanity";

export const glossaryTerm = defineType({
  name: "glossaryTerm",
  title: "Glossary Term",
  type: "document",
  fields: [
    defineField({
      name: "term",
      title: "Term",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "definition",
      title: "Definition",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "General Photonics", value: "general" },
          { title: "Photodetectors", value: "photodetectors" },
          { title: "LEDs & Emitters", value: "emitters" },
          { title: "Optics", value: "optics" },
          { title: "Semiconductors", value: "semiconductors" },
          { title: "Measurements", value: "measurements" },
        ],
      },
    }),
    defineField({
      name: "relatedTerms",
      title: "Related Terms",
      type: "array",
      of: [{ type: "reference", to: [{ type: "glossaryTerm" }] }],
    }),
  ],
  preview: {
    select: { title: "term", subtitle: "category" },
  },
  orderings: [
    { title: "Alphabetical", name: "termAsc", by: [{ field: "term", direction: "asc" }] },
  ],
});
