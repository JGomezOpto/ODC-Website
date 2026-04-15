import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
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
      name: "partNumber",
      title: "Part Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subcategory",
      title: "Subcategory",
      type: "reference",
      to: [{ type: "productSubcategory" }],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      description: "One-line summary for product cards",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          name: "spec",
          title: "Specification",
          fields: [
            defineField({ name: "name", type: "string", title: "Spec Name" }),
            defineField({ name: "value", type: "string", title: "Value" }),
            defineField({ name: "unit", type: "string", title: "Unit" }),
          ],
          preview: {
            select: { title: "name", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "keySpecs",
      title: "Key Specs (shown on cards)",
      type: "object",
      fields: [
        defineField({ name: "wavelengthRange", type: "string", title: "Wavelength Range" }),
        defineField({ name: "activeArea", type: "string", title: "Active Area" }),
        defineField({ name: "responsivity", type: "string", title: "Responsivity" }),
        defineField({ name: "packageType", type: "string", title: "Package Type" }),
      ],
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applications",
      title: "Industry Applications",
      type: "array",
      of: [{ type: "reference", to: [{ type: "industry" }] }],
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "datasheet",
      title: "Datasheet PDF",
      type: "file",
      options: { accept: ".pdf" },
    }),
    defineField({
      name: "isNew",
      title: "New Product?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isFeatured",
      title: "Featured Product?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "partNumber",
      media: "image",
    },
  },
  orderings: [
    { title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Part Number", name: "partNumberAsc", by: [{ field: "partNumber", direction: "asc" }] },
  ],
});
