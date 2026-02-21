"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        slug: string;
        price: number;
        category: string;
        image: any;
        description: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Navigation if clicked on the button
        e.stopPropagation();
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            slug: product.slug,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5 }}
            className="h-full"
        >
            <Link
                href={`/product/${product.slug}`}
                className="group bg-white rounded-3xl p-4 shadow-sm border border-orange-100 hover:shadow-xl transition-all block h-full"
            >
                <div className="relative aspect-square mb-6 overflow-hidden rounded-2xl bg-gray-50">
                    {product.image && (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-orange-800 shadow-sm uppercase tracking-wider">
                        {product.category}
                    </div>
                </div>
                <div className="px-2 pb-2">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-orange-950 transition-colors uppercase tracking-tight">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2 md:h-10">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                        <span className="text-2xl font-black text-[#3d2b1f]">
                            ${new Intl.NumberFormat('es-AR').format(product.price)}
                        </span>
                        <button
                            onClick={handleAddToCart}
                            className="bg-[#3d2b1f] text-white p-3 rounded-xl hover:bg-orange-600 transition-all shadow-sm group/btn"
                        >
                            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
