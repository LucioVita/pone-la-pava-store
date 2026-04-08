import { client } from "@/sanity/lib/client";
import ProductCard from "@/components/ProductCard";
import AnimatedCategoryIcon from "@/components/AnimatedCategoryIcon";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ofertas Exclusivas | Pone La Pava',
    description: 'Aprovechá nuestros productos en oferta. Calidad premium al mejor precio en Pone La Pava.',
};

export default async function OffersPage() {
    // Fetch all products where isOnSale is true
    const products = await client.fetch(
        `*[_type == "product" && isOnSale == true] {
            _id,
            name,
            "slug": slug.current,
            price,
            isOnSale,
            priceBefore,
            image,
            description,
            "category": category->title
        }`
    );

    return (
        <main className="min-h-screen bg-[#faf9f6] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto mt-4 md:mt-12">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <AnimatedCategoryIcon icon="/cat-set.png" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-red-600 uppercase tracking-tighter mb-4 italic">
                        Ofertas Imperdibles
                    </h1>
                    <p className="text-[#5c4033] max-w-2xl mx-auto text-lg">
                        Seleccionamos las mejores piezas con precios especiales para vos. ¡No te las pierdas!
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto mt-6"></div>
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
                        <div className="flex justify-center mb-6 grayscale opacity-30">
                             <AnimatedCategoryIcon icon="/cat-set.png" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#3d2b1f] mb-2">Por ahora no hay ofertas</h2>
                        <p className="text-gray-500">
                            Estamos preparando nuevas promociones. ¡Volvé pronto!
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
