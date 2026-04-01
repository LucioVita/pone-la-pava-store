import { defineField, defineType } from 'sanity'

export const categoryType = defineType({
    name: 'category',
    title: 'Categorías',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título de la Categoría',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción (Opcional)',
            type: 'text',
        }),
        defineField({
            name: 'image',
            title: 'Imagen de Categoría',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
