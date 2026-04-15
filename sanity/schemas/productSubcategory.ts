import { defineField, defineType } from "sanity";

export const productSubcategory = defineType({
  name: "productSubcategory",
  title: "Product Subcategory",
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
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "wavelengthRange",
      title: "Wavelength Range",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "wavelengthRange" },
  },
});
