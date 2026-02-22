import { defineField, defineType } from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nombre del Producto',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL)',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Categoría',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
            name: 'image',
            title: 'Imagen del Producto',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'stock',
            title: 'Stock disponible',
            type: 'number',
            initialValue: 0,
            validation: (Rule) => Rule.min(0),
        }),
        defineField({
            name: 'variants',
            title: 'Variantes (Colores/Modelos)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Nombre del color/variante (Ej: Verde Hamertone)' },
                        { name: 'image', type: 'image', title: 'Imagen específica', options: { hotspot: true } },
                        { name: 'stock', type: 'number', title: 'Stock de esta variante', initialValue: 0 },
                    ],
                },
            ],
        }),
    ],
})
