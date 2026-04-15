import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "odc-studio",
  title: "Opto Diode Corporation",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Products
            S.listItem()
              .title("Products")
              .child(
                S.list()
                  .title("Products")
                  .items([
                    S.documentTypeListItem("product").title("All Products"),
                    S.documentTypeListItem("productCategory").title("Categories"),
                    S.documentTypeListItem("productSubcategory").title("Subcategories"),
                  ])
              ),

            S.divider(),

            // Industries
            S.documentTypeListItem("industry").title("Industries"),

            S.divider(),

            // Content
            S.listItem()
              .title("Content")
              .child(
                S.list()
                  .title("Content")
                  .items([
                    S.documentTypeListItem("blogPost").title("Blog Posts"),
                    S.documentTypeListItem("applicationNote").title("Application Notes"),
                    S.documentTypeListItem("whitepaper").title("Whitepapers"),
                    S.documentTypeListItem("glossaryTerm").title("Glossary"),
                    S.documentTypeListItem("newsEvent").title("News & Events"),
                  ])
              ),

            S.divider(),

            // Company
            S.listItem()
              .title("Company")
              .child(
                S.list()
                  .title("Company")
                  .items([
                    S.documentTypeListItem("teamMember").title("Team Members"),
                    S.documentTypeListItem("certification").title("Certifications"),
                    // Singleton: Company Info
                    S.listItem()
                      .title("Company Info")
                      .child(
                        S.document()
                          .schemaType("companyInfo")
                          .documentId("companyInfo")
                      ),
                  ])
              ),

            S.divider(),

            // Settings (Singleton)
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
