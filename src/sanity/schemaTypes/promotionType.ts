import { defineField, defineType } from "sanity";

export const promotionType = defineType({
  name: "promotion",
  title: "Promoción",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen Principal",
      type: "image",
      options: {
        hotspot: true,
        accept: "image/*",
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
      name: "subItems",
      title: "Subítems",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Título de la promoción",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Descripción de la promoción",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Icono de la promoción",
              type: "image",
              options: {
                hotspot: true,
                accept: "image/*",
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
              name: "url",
              title: "URL de la promoción",
              type: "url",
              description: "Enlace al que redirige la promoción (opcional)",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https"],
                  allowRelative: false,
                }),
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3).required(),
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