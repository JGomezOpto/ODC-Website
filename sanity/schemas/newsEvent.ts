import { defineField, defineType } from "sanity";

export const newsEvent = defineType({
  name: "newsEvent",
  title: "News / Event",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "News", value: "news" },
          { title: "Event", value: "event" },
          { title: "Product Launch", value: "product" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location (for events)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "featuredImage",
    },
  },
  orderings: [
    { title: "Date", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
});
