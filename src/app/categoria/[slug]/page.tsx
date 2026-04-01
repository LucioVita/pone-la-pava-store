import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import { notFound } from "next/navigation";
import AnimatedCategoryIcon from "@/components/AnimatedCategoryIcon";
import { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Fetch only the title for metadata
    const category = await client.fetch(
        `*[_type == "category" && slug.current == $slug][0]{ title, description }`,
        { slug }
    );

    if (!category) return { title: 'Categoría no encontrada | Pone La Pava' };

    return {
        title: `${category.title} Artesanales | Pone La Pava`,
        description: category.description || `Explorá nuestra colección exclusiva de ${category.title.toLowerCase()} en Pone La Pava. Calidad premium y envíos a todo el país.`,
    };
}

function getCategoryIcon(slug: string) {
    const lowerSlug = slug.toLowerCase();
    if (lowerSlug.includes('termo')) return '/cat-termo.png';
    if (lowerSlug.includes('mate') || lowerSlug.includes('imperial') || lowerSlug.includes('camionero') || lowerSlug.includes('algarrobo')) return '/cat-mate.png';
    if (lowerSlug.includes('canasta') || lowerSlug.includes('bolso') || lowerSlug.includes('kit') || lowerSlug.includes('mochila')) return '/cat-kit.png';
    return '/cat-mate.png'; // default fallback
}

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;

    // Fetch category and its products in parallel taking advantage of Next.js caching
    const data = await client.fetch(
        `{
            "category": *[_type == "category" && slug.current == $slug][0] {
                _id,
                title,
                description
            },
            "products": *[_type == "product" && category->slug.current == $slug] {
                _id,
                name,
                "slug": slug.current,
                price,
                image,
                description,
                "category": category->title
            }
        }`,
        { slug }
    );

    const { category, products } = data;

    if (!category) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#faf9f6] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-4 md:mt-12">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <AnimatedCategoryIcon icon={getCategoryIcon(slug)} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#3d2b1f] uppercase tracking-tighter mb-4 italic">
                        {category.title}
                    </h1>
                    <p className="text-[#5c4033] max-w-2xl mx-auto text-lg">
                        {category.description || `Explorá nuestra colección exclusiva de ${category.title.toLowerCase()}.`}
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto mt-6"></div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {products.map((product: any) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-orange-100 shadow-sm">
                        <div className="flex justify-center">
                            <AnimatedCategoryIcon icon={getCategoryIcon(slug)} />
                        </div>
                        <h2 className="text-2xl font-bold text-[#3d2b1f] mt-6 mb-2">No hay productos disponibles</h2>
                        <p className="text-gray-500">
                            Pronto agregaremos nuevos productos a esta categoría.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
