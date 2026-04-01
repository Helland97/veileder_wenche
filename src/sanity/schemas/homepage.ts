const homepage = {
  name: "homepage",
  title: "Hjem",
  type: "document",
  // Singleton: only one homepage document
  fields: [
    {
      name: "heroTitle",
      title: "Overskrift",
      type: "string",
      description: "Hovedoverskrift på forsiden",
    },
    {
      name: "heroHighlight",
      title: "Uthevet tekst",
      type: "string",
      description: "Teksten som vises i grønt i overskriften",
    },
    {
      name: "heroText",
      title: "Introduksjonstekst",
      type: "text",
      rows: 3,
    },
    {
      name: "aboutTitle",
      title: "Om-seksjon tittel",
      type: "string",
    },
    {
      name: "aboutText",
      title: "Om-seksjon tekst",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "aboutImage",
      title: "Om-seksjon bilde",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "ctaTitle",
      title: "Bunntekst overskrift",
      type: "string",
      description: "Overskrift i 'Klar for å ta neste steg?' seksjonen",
    },
    {
      name: "ctaText",
      title: "Bunntekst",
      type: "text",
      rows: 2,
    },
  ],
};

export default homepage;
