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
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'product_code',
      title: 'Código del Producto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategoría',
      type: 'reference',
      to: [{ type: 'subcategory' }],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
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
      subcategory: 'subcategory.subcategory_name',
      category: 'subcategory.category.category',
    },
    prepare({ title, media, subcategory, category }) {
      return {
        title,
        media,
        subtitle: subcategory ? `${subcategory}${category ? ` (${category})` : ''}` : 'Sin subcategoría',
      };
    },
  },
});