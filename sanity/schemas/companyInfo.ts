import { defineField, defineType } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  // Singleton — only one document of this type
  fields: [
    defineField({
      name: "mission",
      title: "Mission Statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "vision",
      title: "Vision Statement",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "founded",
      title: "Founded Year",
      type: "number",
    }),
    defineField({
      name: "stats",
      title: "Company Statistics",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          title: "Stat",
          fields: [
            defineField({ name: "label", type: "string", title: "Label" }),
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "suffix", type: "string", title: "Suffix (e.g. +, Years)" }),
          ],
        },
      ],
    }),
    defineField({
      name: "timeline",
      title: "Company Timeline",
      type: "array",
      of: [
        {
          type: "object",
          name: "milestone",
          title: "Milestone",
          fields: [
            defineField({ name: "year", type: "string", title: "Year" }),
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
          preview: {
            select: { title: "title", subtitle: "year" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Company Information" };
    },
  },
});
