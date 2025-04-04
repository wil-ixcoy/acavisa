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
      validation: (Rule) => Rule.required().min(5).max(100).error('El título debe tener entre 5 y 100 caracteres'),
    }),

    defineField({
      name: 'content',
      title: 'Contenido',
      type: 'text',
      validation: (Rule) => Rule.required().min(50).error('El contenido debe tener al menos 50 caracteres'),
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
          validation: (Rule) => Rule.required().error('El texto alternativo es obligatorio'),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'postCategory' }],
      options: { disableNew: true },
      validation: (Rule) => Rule.required().error('La categoría es obligatoria'),
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
      category: 'type.category',
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category || 'Sin categoría',
      };
    },
  },
});