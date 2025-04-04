import { defineField, defineType } from 'sanity';

export const postCategoryType = defineType({
  name: 'postCategory',
  title: 'Categoría de Post',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la categoría',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'País',
      type: 'reference',
      to: [{ type: 'country' }],
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
      title: 'name',
    },
  },
});
