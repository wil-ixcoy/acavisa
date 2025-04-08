import { defineField, defineType } from 'sanity';

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategoría de Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'subcategory_name',
      title: 'Nombre de la Subcategoría',
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
      name: 'category',
      title: 'Categoría Padre',
      type: 'reference',
      to: [{ type: 'productCategory' }],
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
      title: 'subcategory_name',
      media: 'image',
      category: 'category.category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category ? `Categoría: ${category}` : 'Sin categoría',
      };
    },
  },
});