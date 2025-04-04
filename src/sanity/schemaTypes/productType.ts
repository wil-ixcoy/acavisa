import { defineField, defineType } from 'sanity';

export const productType = defineType({
  name: 'product',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'product_name',
      title: 'Nombre del Producto',
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
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'product_code',
      title: 'Código del Producto',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'productCategory' }],
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
      title: 'product_name',
      media: 'image',
    },
  },
});
