import { defineField, defineType } from 'sanity';

export const productCategoryType = defineType({
  name: 'productCategory',
  title: 'Categoría de Producto',
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
      name: 'category',
      title: 'Nombre de la Categoría',
      type: 'string',
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
