const service = {
  name: "service",
  title: "Tjeneste",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Kort beskrivelse",
      type: "text",
      rows: 3,
    },
    {
      name: "body",
      title: "Innhold",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "price",
      title: "Pris",
      type: "number",
    },
    {
      name: "duration",
      title: "Varighet (minutter)",
      type: "number",
    },
    {
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "order",
      title: "Rekkefølge",
      type: "number",
    },
  ],
  orderings: [
    {
      title: "Rekkefølge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
};

export default service;
