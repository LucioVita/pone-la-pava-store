import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'Pone La Pava - Admin',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yqivp1p0', // Placeholder or Env
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

    basePath: '/studio',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schema.types,
    },
})
