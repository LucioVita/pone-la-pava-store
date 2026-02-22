/**
 * ==============================================================
 * IMPORTADOR DE PRODUCTOS: WordPress -> Sanity
 * Pone La Pava Store
 * ==============================================================
 * 
 * INSTRUCCIONES:
 * 1. Necesitás un SANITY_API_TOKEN con permisos de escritura.
 *    - Ve a: https://www.sanity.io/manage -> tu proyecto -> API -> Tokens
 *    - Crea un token con permisos "Editor"
 * 2. Ejecutá: SANITY_API_TOKEN="tu-token-aqui" node import_to_sanity.mjs
 * ==============================================================
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Load .env.local manually (no need for dotenv package)
const envPath = path.join(__dirname, '.env.local')
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=')
            if (eqIdx > 0) {
                const key = trimmed.slice(0, eqIdx).trim()
                const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
                if (!process.env[key]) process.env[key] = value
            }
        }
    }
}

const SANITY_TOKEN = process.env.SANITY_API_TOKEN
if (!SANITY_TOKEN) {
    console.error('❌ ERROR: Falta el token de Sanity.')
    console.error('   Ejecutá: SANITY_API_TOKEN="tu-token" node import_to_sanity.mjs')
    process.exit(1)
}

const client = createClient({
    projectId: '5q85wxa1',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: SANITY_TOKEN,
    useCdn: false,
})

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
}

function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http
        const req = protocol.get(url, { timeout: 15000 }, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                downloadFile(res.headers.location).then(resolve).catch(reject)
                return
            }
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP ${res.statusCode} for ${url}`))
                return
            }
            const chunks = []
            res.on('data', (chunk) => chunks.push(chunk))
            res.on('end', () => resolve(Buffer.concat(chunks)))
            res.on('error', reject)
        })
        req.on('error', reject)
        req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')) })
    })
}

async function getOrCreateCategory(categoryName, categoryCache) {
    const slug = slugify(categoryName)

    if (categoryCache[slug]) {
        return categoryCache[slug]
    }

    // Check if exists in Sanity
    const existing = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]._id`,
        { slug }
    )

    if (existing) {
        categoryCache[slug] = existing
        return existing
    }

    // Create new category
    const newCat = await client.create({
        _type: 'category',
        title: categoryName,
        slug: { _type: 'slug', current: slug },
    })

    console.log(`  📁 Categoría creada: "${categoryName}"`)
    categoryCache[slug] = newCat._id
    return newCat._id
}

async function uploadImageFromUrl(imageUrl, productName) {
    try {
        const buffer = await downloadFile(imageUrl)
        const ext = imageUrl.split('.').pop().split('?')[0].toLowerCase()
        const contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
            ext === 'png' ? 'image/png' :
                ext === 'webp' ? 'image/webp' : 'image/jpeg'

        const asset = await client.assets.upload('image', buffer, {
            contentType,
            filename: `${slugify(productName)}.${ext}`,
        })
        return asset._id
    } catch (err) {
        console.warn(`  ⚠️  No se pudo subir imagen: ${err.message}`)
        return null
    }
}

async function fetchImageFromWordPress(productSlug) {
    // Try to scrape the image from the old WP product page
    const wpUrl = `https://ponelapava-ar-700267.hostingersite.com/producto/${productSlug}/`
    try {
        const html = await downloadFile(wpUrl).then(b => b.toString('utf-8'))
        // Extract the featured image from og:image meta tag
        const ogMatch = html.match(/<meta property="og:image" content="([^"]+)"/)
        if (ogMatch) return ogMatch[1]
        // Fallback: look for woocommerce product image
        const imgMatch = html.match(/class="woocommerce-product-gallery__image[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/)
        if (imgMatch) return imgMatch[1]
    } catch (e) {
        // Silent fail - product page may not exist
    }
    return null
}

async function main() {
    console.log('🧉 Iniciando importación de productos a Sanity...\n')

    const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products_to_import.json'), 'utf-8'))
    console.log(`📦 Total de productos a importar: ${products.length}\n`)

    const categoryCache = {}
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < products.length; i++) {
        const product = products[i]
        const progress = `[${i + 1}/${products.length}]`

        try {
            // Check if product already exists
            const productSlug = slugify(product.name)
            const existing = await client.fetch(
                `*[_type == "product" && slug.current == $slug][0]._id`,
                { slug: productSlug }
            )

            if (existing) {
                console.log(`${progress} ⏭️  Ya existe: "${product.name}"`)
                successCount++
                continue
            }

            process.stdout.write(`${progress} ⏳ Importando: "${product.name}"...`)

            // 1. Get or create category
            const categoryId = await getOrCreateCategory(product.category, categoryCache)

            // 2. Try to fetch image
            let imageRef = null
            const wpSlug = slugify(product.name)

            // Try from imageUrl if we have one
            if (product.imageUrl) {
                imageRef = await uploadImageFromUrl(product.imageUrl, product.name)
            }

            // If no image, try scraping from the old WP site
            if (!imageRef) {
                const scrapedUrl = await fetchImageFromWordPress(wpSlug)
                if (scrapedUrl) {
                    imageRef = await uploadImageFromUrl(scrapedUrl, product.name)
                }
            }

            // 3. Build document
            const doc = {
                _type: 'product',
                name: product.name,
                slug: { _type: 'slug', current: productSlug },
                price: product.price || 0,
                description: product.description || '',
                stock: 99, // Default stock
                category: { _type: 'reference', _ref: categoryId },
            }

            if (imageRef) {
                doc.image = {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: imageRef },
                }
            }

            // 4. Create product in Sanity
            await client.create(doc)

            const imgStatus = imageRef ? '🖼️' : '📝'
            console.log(` ✅ ${imgStatus}`)
            successCount++

            // Small delay to avoid rate limiting
            await new Promise(r => setTimeout(r, 300))

        } catch (err) {
            console.log(` ❌ Error: ${err.message}`)
            errorCount++
        }
    }

    console.log('\n' + '='.repeat(50))
    console.log(`✅ Importación completada!`)
    console.log(`   Exitosos: ${successCount}`)
    console.log(`   Con error: ${errorCount}`)
    console.log(`   Total: ${products.length}`)
    console.log('='.repeat(50))
    console.log('\n💡 Los productos sin imagen los podés editar en: https://ponelapava-ar-700267.hostingersite.com/studio')
}

main().catch(err => {
    console.error('❌ Error fatal:', err)
    process.exit(1)
})
