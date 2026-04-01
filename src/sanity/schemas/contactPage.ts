const contactPage = {
  name: "contactPage",
  title: "Kontakt",
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
      type: "text",
      rows: 2,
    },
    {
      name: "email",
      title: "E-post",
      type: "string",
    },
    {
      name: "phone",
      title: "Telefon",
      type: "string",
    },
    {
      name: "locationText",
      title: "Beliggenhet / møtested tekst",
      type: "text",
      rows: 3,
    },
  ],
};

export default contactPage;
