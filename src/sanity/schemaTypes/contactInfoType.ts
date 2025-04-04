import { defineField, defineType } from "sanity";

export const contactInfoType = defineType({
  name: "contactInfo",
  title: "Información de Contacto",
  type: "document",
  fields: [
    defineField({
        name: 'name',
        title: 'Nombre del país al que pertence',
        type: 'string',
      }),
    defineField({
      name: "country",
      title: "País",
      type: "reference",
      to: [{ type: "country" }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required().error("El país es obligatorio"),
      description: "El país al que pertenece esta información de contacto",
    }),
    defineField({
      name: "callcenter",
      title: "Call Center",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El número de call center es obligatorio"),
      description:
        "Número de teléfono del call center (por ejemplo, +503 1234 5678)",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El número de WhatsApp es obligatorio"),
      description:
        "Número de WhatsApp con código de país (por ejemplo, +503 1234 5678)",
    }),
    defineField({
      name: "direccion",
      title: "Dirección",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .error("La dirección debe tener al menos 10 caracteres"),
      description: "Dirección física de la oficina o sede",
    }),
    defineField({
      name: "correo_electronico",
      title: "Correo Electrónico",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          .error("Debe ser un correo electrónico válido"),
      description:
        "Correo electrónico de contacto (por ejemplo, contacto@empresa.com)",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",

      description:
        "Enlace al perfil de LinkedIn (por ejemplo, https://linkedin.com/company/empresa)",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",

      description:
        "Enlace al perfil de Instagram (por ejemplo, https://instagram.com/empresa)",
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",

      description:
        "Enlace al perfil de Facebook (por ejemplo, https://facebook.com/empresa)",
    }),
    defineField({
      name: "tiktok",
      title: "TikTok",
      type: "url",

      description:
        "Enlace al perfil de TikTok (por ejemplo, https://tiktok.com/@empresa)",
    }),
    defineField({
      name: "created_at",
      title: "Fecha de Creación",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "correo_electronico",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Sin país asignado",
        subtitle,
      };
    },
  },
});
