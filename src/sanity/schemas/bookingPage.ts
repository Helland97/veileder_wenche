const bookingPage = {
  name: "bookingPage",
  title: "Bestill time",
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
      name: "confirmationTitle",
      title: "Bekreftelse overskrift",
      type: "string",
      description: "Tekst som vises etter fullført bestilling",
    },
    {
      name: "confirmationText",
      title: "Bekreftelse tekst",
      type: "text",
      rows: 2,
    },
  ],
};

export default bookingPage;
