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
            type: 'string',
            options: {
                list: [
                    { title: 'Mates', value: 'mates' },
                    { title: 'Termos', value: 'termos' },
                    { title: 'Bombillas', value: 'bombillas' },
                    { title: 'Kits / Combos', value: 'kits' },
                    { title: 'Accesorios', value: 'accesorios' },
                ],
            },
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
    ],
})
