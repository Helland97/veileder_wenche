import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureBuilder } from "sanity/structure";
import { schemaTypes } from "@/sanity/schemas";

const singletonTypes = new Set(["homepage", "aboutPage", "contactPage", "bookingPage"]);

const structure = (S: StructureBuilder) =>
  S.list()
    .title("Innhold")
    .items([
      // Singleton pages — open the editor directly
      S.listItem()
        .title("Hjem")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Om meg")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Kontakt")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
      S.listItem()
        .title("Bestill time")
        .id("bookingPage")
        .child(S.document().schemaType("bookingPage").documentId("bookingPage")),

      S.divider(),

      // List types — can have multiple documents
      ...S.documentTypeListItems().filter(
        (item) => !singletonTypes.has(item.getId()!)
      ),
    ]);

export default defineConfig({
  name: "wenche-veileder",
  title: "Wenche Veileder",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
