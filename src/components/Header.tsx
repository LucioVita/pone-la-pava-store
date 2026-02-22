"use client";

import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, Search, X, ChevronRight, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<{ title: string, slug: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const query = `*[_type == "category"] { title, "slug": slug.current }`;
            const data = await client.fetch(query);
            setCategories(data);
        };
        fetchCategories();
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen || isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen, isSearchOpen]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 flex flex-col">
            {/* Top SEO Banner */}
            <div className="bg-[#3d2b1f] w-full text-center py-1">
                <span className="text-xs text-orange-200 font-medium tracking-wide">
                    Envíos a todo el país | Mates Artesanales y Termos con Garantía Local
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 md:w-14 md:h-14 transition-transform group-hover:scale-105">
                            <Image
                                src="/logo.png"
                                alt="Pone La Pava - Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="text-xl md:text-2xl font-black tracking-tighter text-[#3d2b1f] hidden sm:block italic">
                            PONE LA PAVA
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-[#5c4033]">
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <Link
                                    key={cat.slug}
                                    href={`/categoria/${cat.slug}`}
                                    className="hover:text-orange-600 transition-colors"
                                >
                                    {cat.title}
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link href="#" className="hover:text-orange-600 transition-colors">Mates</Link>
                                <Link href="#" className="hover:text-orange-600 transition-colors">Termos</Link>
                                <Link href="#" className="hover:text-orange-600 transition-colors">Accesorios</Link>
                            </>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-2 md:gap-4 text-[#3d2b1f]">
                    <div className="relative flex items-center">
                        <AnimatePresence>
                            {isSearchOpen && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{ width: 240, opacity: 1 }}
                                    exit={{ width: 0, opacity: 0 }}
                                    className="overflow-hidden mr-2"
                                >
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="¿Qué buscás hoy?"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-orange-50 border-none rounded-full px-4 py-1.5 text-sm focus:ring-1 focus:ring-orange-200 outline-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                setIsSearchOpen(false);
                                                // Simulamos búsqueda por ahora o redirigimos
                                                window.location.href = `/?s=${encodeURIComponent(searchQuery)}`;
                                            }
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 text-[#3d2b1f] hover:bg-orange-50 rounded-full transition-colors relative"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 text-[#3d2b1f] hover:bg-orange-50 rounded-full transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[100] flex">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative h-screen w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col"
                        >
                            <div className="p-5 border-b border-orange-50 flex items-center justify-between bg-[#faf9f6]">
                                <div className="text-xl font-black italic text-[#3d2b1f]">MENÚ</div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 hover:bg-orange-50 rounded-full text-gray-400"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-5">
                                <nav className="flex flex-col gap-2">
                                    <Link
                                        href="/"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 rounded-2xl bg-orange-50 text-orange-950 font-bold"
                                    >
                                        Inicio
                                        <ChevronRight size={18} />
                                    </Link>

                                    <div className="mt-8 mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        Nuestras Categorías
                                    </div>

                                    {categories.length > 0 ? categories.map((cat) => (
                                        <Link
                                            key={cat.slug}
                                            href={`/categoria/${cat.slug}`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="flex items-center justify-between p-4 rounded-2xl border border-transparent hover:border-orange-100 hover:bg-orange-50/30 transition-all font-semibold"
                                        >
                                            {cat.title}
                                            <ChevronRight size={18} className="text-gray-300" />
                                        </Link>
                                    )) : (
                                        ['Mates', 'Termos', 'Accesorios'].map(placeholder => (
                                            <div key={placeholder} className="p-4 rounded-2xl border border-dashed border-gray-100 text-gray-300 font-semibold italic">
                                                {placeholder}
                                            </div>
                                        ))
                                    )}
                                </nav>
                            </div>

                            <div className="p-6 border-t border-orange-50 bg-[#faf9f6]">
                                <p className="text-center text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-4">
                                    Pone La Pava Store
                                </p>
                                <div className="flex justify-center gap-4">
                                    <a
                                        href="https://www.instagram.com/ponelapavatiendademate/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white border border-orange-100 flex items-center justify-center text-[#3d2b1f] hover:bg-orange-50 transition-colors"
                                    >
                                        <Instagram size={18} />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/ponelapavatiendademate"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white border border-orange-100 flex items-center justify-center text-[#3d2b1f] hover:bg-orange-50 transition-colors"
                                    >
                                        <Facebook size={18} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
}
