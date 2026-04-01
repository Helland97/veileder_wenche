const aboutPage = {
  name: "aboutPage",
  title: "Om meg",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Sidetittel",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Undertittel",
      type: "string",
    },
    {
      name: "backgroundTitle",
      title: "Min bakgrunn - tittel",
      type: "string",
    },
    {
      name: "backgroundText",
      title: "Min bakgrunn - tekst",
      type: "text",
      rows: 4,
    },
    {
      name: "lecturerTitle",
      title: "Som foreleser - tittel",
      type: "string",
    },
    {
      name: "lecturerText",
      title: "Som foreleser - tekst",
      type: "text",
      rows: 4,
    },
    {
      name: "counselorTitle",
      title: "Som veileder - tittel",
      type: "string",
    },
    {
      name: "counselorText",
      title: "Som veileder - tekst",
      type: "text",
      rows: 4,
    },
    {
      name: "image",
      title: "Profilbilde",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "values",
      title: "Mine verdier",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Tittel", type: "string" },
            { name: "text", title: "Tekst", type: "text", rows: 3 },
          ],
        },
      ],
    },
  ],
};

export default aboutPage;
