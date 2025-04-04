import { defineField, defineType } from 'sanity';

export const postType = defineType({
  name: 'post',
  title: 'Publicación',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'postCategory' }],
      options: { disableNew: true },
    }),
    defineField({
      name: 'created_at',
      title: 'Fecha de creación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
});
