"use client";

import React from "react";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

interface ProductCarouselProps {
    products: any[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
    return (
        <div className="relative">
            <motion.div
                className="flex gap-6 overflow-x-auto pb-12 pt-4 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory hide-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {products.map((product) => (
                    <div key={product._id} className="min-w-[280px] sm:min-w-[320px] lg:min-w-[380px] snap-start">
                        <ProductCard product={product} />
                    </div>
                ))}

                {/* Spacer at the end for padding */}
                <div className="min-w-[20px]" aria-hidden="true" />
            </motion.div>

            {/* Scroll Indicator */}
            <div className="flex justify-center gap-2 mt-4 lg:hidden">
                {products.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-200" />
                ))}
            </div>

            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
}
