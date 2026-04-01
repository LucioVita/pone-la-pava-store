"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductDetailProps {
    product: {
        _id: string;
        name: string;
        slug: string;
        price: number;
        category: string;
        image: any;
        description: string;
        stock?: number;
        variants?: Array<{
            name: string;
            image: any;
            stock: number;
        }>;
    };
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

    const currentImage = selectedVariant !== null && product.variants?.[selectedVariant]?.image
        ? product.variants[selectedVariant].image
        : product.image;

    const currentStock = selectedVariant !== null && product.variants?.[selectedVariant]
        ? product.variants[selectedVariant].stock
        : (product.stock || 0);

    const handleAddToCart = () => {
        const variantName = selectedVariant !== null ? product.variants?.[selectedVariant]?.name : null;
        addToCart({
            id: product._id + (variantName ? `-${variantName}` : ''),
            name: product.name + (variantName ? ` (${variantName})` : ''),
            price: product.price,
            image: currentImage,
            quantity: 1,
            slug: product.slug,
        });
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#5c4033] hover:text-orange-600 transition-colors mb-8 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Volver a la tienda
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery */}
                <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white shadow-sm border border-orange-100">
                    {currentImage && (
                        <Image
                            src={urlFor(currentImage).url()}
                            alt={product.name}
                            fill
                            className="object-cover transition-all duration-500"
                            priority
                        />
                    )}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-orange-900 shadow-sm uppercase tracking-widest">
                        {product.category}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight text-[#3d2b1f]">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl md:text-4xl font-black text-[#3d2b1f]">
                            ${new Intl.NumberFormat('es-AR').format(product.price)}
                        </span>
                        <div className="h-6 w-px bg-orange-200"></div>
                        <span className={`text-sm font-bold flex items-center gap-1 ${currentStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            <span className={`h-2 w-2 rounded-full animate-pulse ${currentStock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {currentStock > 0 ? 'Stock disponible' : 'Sin stock'}
                        </span>
                    </div>

                    {/* Variants Selection */}
                    {product.variants && product.variants.length > 0 && (
                        <div className="mb-8 p-6 bg-orange-50/50 rounded-3xl border border-orange-100">
                            <p className="text-xs font-black uppercase tracking-widest text-[#5c4033] mb-4">Seleccioná un color / variante:</p>
                            <div className="flex flex-wrap gap-3">
                                {product.variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedVariant(index)}
                                        disabled={variant.stock === 0}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedVariant === index
                                                ? "border-[#3d2b1f] bg-[#3d2b1f] text-white"
                                                : variant.stock === 0
                                                    ? "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"
                                                    : "border-orange-200 bg-white text-[#3d2b1f] hover:border-[#3d2b1f]"
                                            }`}
                                    >
                                        {variant.name}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setSelectedVariant(null)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${selectedVariant === null
                                            ? "border-[#3d2b1f] bg-[#3d2b1f] text-white"
                                            : "border-orange-200 bg-white text-[#3d2b1f] hover:border-[#3d2b1f]"
                                        }`}
                                >
                                    Estándar
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="prose prose-orange mb-10">
                        <p className="text-lg text-[#3d2b1f] leading-relaxed font-semibold">
                            {product.description}
                        </p>
                    </div>

                    <div className="space-y-6 mb-10">
                        <button
                            onClick={handleAddToCart}
                            disabled={currentStock === 0}
                            className="w-full py-5 bg-[#3d2b1f] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:bg-[#5c4033] transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:translate-y-0"
                        >
                            <ShoppingCart size={24} />
                            {currentStock > 0 ? 'Agregar al carrito' : 'Agotado'}
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
    );
}
