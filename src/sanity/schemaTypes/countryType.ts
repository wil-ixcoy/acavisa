import { defineField, defineType } from 'sanity';

export const countryType = defineType({
  name: 'country',
  title: 'País',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      readOnly: true,
      initialValue: () => crypto.randomUUID(),
    }),
   
    defineField({
      name: 'country_name',
      title: 'Nombre del país',
      type: 'string',
    }),
    defineField({
      name: 'country_flag',
      title: 'Bandera',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }),
      ],
    }),
    defineField({
      name: 'country_code',
      title: 'Código de país',
      type: 'string',
    }),

    defineField({
      name: 'created_at',
      title: 'Fecha de creación',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'country_name',
      media: 'country_flag',
    },
  },
});
