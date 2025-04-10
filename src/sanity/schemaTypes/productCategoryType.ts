import { defineField, defineType } from 'sanity';

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Categoría de Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Nombre de la Categoría',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
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
      name: 'position',
      title: 'Posición',
      type: 'number',
      description: 'Define el orden de la categoría en el diseño (menor número = mayor prioridad).',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'reference',
      to: [{ type: 'country' }],
      options: {
        disableNew: true,
      },
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
      title: 'category',
      media: 'image',
    },
  },
});