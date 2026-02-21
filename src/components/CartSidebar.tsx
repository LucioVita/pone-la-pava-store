"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

export default function CartSidebar() {
    const {
        cart,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal
    } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-orange-100 flex items-center justify-between bg-[#faf9f6]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#3d2b1f] flex items-center justify-center text-white">
                                    <ShoppingCart size={20} />
                                </div>
                                <h2 className="text-xl font-black tracking-tight text-[#3d2b1f]">Tu Carrito</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-orange-50 rounded-full transition-colors text-gray-500"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-orange-200">
                                        <ShoppingCart size={40} />
                                    </div>
                                    <p className="text-[#5c4033] font-medium italic">Tu carrito está vacío...</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="px-6 py-2 bg-[#3d2b1f] text-white rounded-full font-bold text-sm hover:bg-[#5c4033] transition-colors"
                                    >
                                        Ver Productos
                                    </button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-orange-100 flex-shrink-0">
                                            {item.image && (
                                                <Image
                                                    src={urlFor(item.image).url()}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-[#3d2b1f] text-sm uppercase tracking-tight">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium">Tradiciones Argentinas</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 bg-orange-50 rounded-lg px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="text-[#3d2b1f] hover:text-orange-600 transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="text-[#3d2b1f] hover:text-orange-600 transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <span className="font-black text-[#3d2b1f]">
                                                    ${new Intl.NumberFormat('es-AR').format(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-6 border-t border-orange-100 bg-[#faf9f6] space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Subtotal</span>
                                    <span className="text-2xl font-black text-[#3d2b1f]">
                                        ${new Intl.NumberFormat('es-AR').format(cartTotal)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 font-medium text-center">
                                    Envío calculado al momento del checkout
                                </p>
                                <button className="w-full py-4 bg-[#3d2b1f] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:bg-[#5c4033] transition-all flex items-center justify-center gap-3 group">
                                    Iniciar Compra
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
