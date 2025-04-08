import { defineField, defineType } from "sanity";

export const headerAdType = defineType({
  name: "headerAd",
  title: "Anuncio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Texto",
      type: "text",
      description: "Texto descriptivo del anuncio",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Texto alternativo",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "startDate",
      title: "Fecha de inicio",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Fecha de fin",
      type: "datetime",
      validation: (Rule) =>
        Rule.required().custom((endDate, context) => {
          const startDate = context.document?.startDate as string | undefined;
          if (!endDate || !startDate) {
            return true;
          }

          const end = new Date(String(endDate));
          const start = new Date(String(startDate));

          if (isNaN(end.getTime()) || isNaN(start.getTime())) {
            return "Las fechas no son válidas";
          }

          return end >= start
            ? true
            : "La fecha de fin debe ser mayor o igual a la fecha de inicio";
        }),
    }),
    defineField({
      name: "link",
      title: "Enlace",
      type: "url",
      description: "URL a la que redirige el anuncio",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "country",
      title: "País",
      type: "reference",
      to: [{ type: "country" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      country: "country.country_name",
    },
    prepare({ title, media, country }) {
      return {
        title: title,
        subtitle: country ? `País: ${country}` : "Sin país",
        media: media,
      };
    },
  },
});