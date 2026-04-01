const testimonial = {
  name: "testimonial",
  title: "Anbefaling",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Navn",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "quote",
      title: "Sitat",
      type: "text",
      rows: 4,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "role",
      title: "Rolle / Kontekst",
      type: "string",
      description: "F.eks. 'Klient' eller 'Kollega'",
    },
  ],
};

export default testimonial;
