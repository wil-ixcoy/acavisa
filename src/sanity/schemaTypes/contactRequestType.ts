import { defineField, defineType } from 'sanity';

export const contactRequestType = defineType({
  name: 'contactRequest',
  title: 'Mensaje de Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Nombre Completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Correo Electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'message',
      title: 'Mensaje',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'reference',
      to: [{ type: 'country' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'created_at',
      title: 'Fecha de Creación',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'email',
    },
  },
});