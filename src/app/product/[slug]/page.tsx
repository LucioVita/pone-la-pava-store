import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Header from "@/components/Header";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    price,
    category,
    image,
    description,
    stock
  }`;
    const product = await client.fetch(query, { slug });
    return product;
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#5c4033] hover:text-orange-600 transition-colors mb-8 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Volver a la tienda
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-sm border border-orange-100">
                        {product.image && (
                            <Image
                                src={urlFor(product.image).url()}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-orange-900 shadow-sm uppercase tracking-widest">
                            {product.category}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-3xl md:text-4xl font-black text-[#3d2b1f]">
                                ${new Intl.NumberFormat('es-AR').format(product.price)}
                            </span>
                            <div className="h-6 w-px bg-orange-200"></div>
                            <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                Stock disponible
                            </span>
                        </div>

                        <div className="prose prose-orange mb-10">
                            <p className="text-lg text-[#5c4033]/80 leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6 mb-10">
                            <button className="w-full py-5 bg-[#3d2b1f] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:bg-[#5c4033] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group">
                                <ShoppingCart size={24} />
                                Agregar al carrito
                            </button>
                            <button className="w-full py-5 bg-white text-[#3d2b1f] border-2 border-orange-100 rounded-2xl font-black text-lg hover:bg-orange-50 transition-all">
                                Comprar ahora
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-1 gap-4 pt-8 border-t border-orange-100">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-800">
                                    <Truck size={20} />
                                </div>
                                <p className="text-sm font-bold">Envío gratis en compras superiores a $50.000</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-800">
                                    <RotateCcw size={20} />
                                </div>
                                <p className="text-sm font-bold">Cambios y devoluciones sin cargo</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-800">
                                    <ShieldCheck size={20} />
                                </div>
                                <p className="text-sm font-bold">Garantía oficial Pone La Pava - 12 meses</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
