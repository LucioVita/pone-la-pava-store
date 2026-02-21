"use client";

import { ShoppingCart, Menu, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
    const { cartCount, setIsCartOpen } = useCart();

    return (
        <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-100 flex flex-col">
            {/* Top SEO Banner */}
            <div className="bg-[#3d2b1f] w-full text-center py-1">
                <span className="text-xs text-orange-200 font-medium tracking-wide">
                    Envíos a todo el país | Mates Artesanales y Termos con Garantía Local
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between w-full">
                <div className="flex items-center gap-8">
                    {/* Changed from h1 to div for SEO architecture */}
                    <div className="text-2xl font-black tracking-tighter text-[#3d2b1f]">
                        PONE LA PAVA
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5c4033]">
                        <a href="#" className="hover:text-orange-600 transition-colors">Mates</a>
                        <a href="#" className="hover:text-orange-600 transition-colors">Termos</a>
                        <a href="#" className="hover:text-orange-600 transition-colors">Bombillas</a>
                        <a href="#" className="hover:text-orange-600 transition-colors">Kits</a>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-[#3d2b1f] hover:bg-orange-50 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 text-[#3d2b1f] hover:bg-orange-50 rounded-full transition-colors relative"
                    >
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-orange-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button className="md:hidden p-2 text-[#3d2b1f] hover:bg-orange-50 rounded-full transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
