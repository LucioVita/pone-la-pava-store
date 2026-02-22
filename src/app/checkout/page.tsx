"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/Header";
import { Truck, Store, MapPin, ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const PROVINCES = [
    "Buenos Aires", "CABA", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones",
    "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
    "Santiago del Estero", "Tierra del Fuego", "Tucumán"
];

// Lógica de costos por zonas
const getShippingCost = (province: string) => {
    if (!province) return 8500;

    // Zona 1: Local y Cercanías (Cuyo)
    if (["San Luis", "Mendoza", "San Juan"].includes(province)) {
        return 6500;
    }

    // Zona 2: Centro (Gran demanda)
    if (["Buenos Aires", "CABA", "Córdoba", "Santa Fe", "La Pampa", "Entre Ríos"].includes(province)) {
        return 8500;
    }

    // Zona 3: Norte y Patagonia (Más alejados)
    return 11500;
};

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [step, setStep] = useState(1);
    const [shippingMethod, setShippingMethod] = useState<"delivery" | "pickup">("delivery");
    const [isLoading, setIsLoading] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        dni: "",
        phone: "",
        province: "",
        city: "",
        address: "",
    });

    const currentShippingCost = shippingMethod === "pickup" ? 0 : getShippingCost(formData.province);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const items = cart.map(item => ({
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                unit_price: item.price,
            }));

            // Agregar el costo de envío como un item si es delivery
            if (shippingMethod === "delivery") {
                items.push({
                    id: "shipping-cost",
                    title: "Envío - Correo Argentino",
                    quantity: 1,
                    unit_price: currentShippingCost,
                } as any);
            }

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items,
                    payer: {
                        email: formData.email,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        phone: formData.phone,
                        dni: formData.dni,
                        province: formData.province,
                        city: formData.city,
                        address: formData.address,
                        shippingMethod: shippingMethod,
                    }
                }),
            });

            const data = await response.json();
            if (data.init_point) {
                window.location.href = data.init_point;
            }
        } catch (error) {
            console.error(error);
            alert("Error al procesar el pago");
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#faf9f6]">
                <Header />
                <div className="max-w-7xl mx-auto px-4 pt-40 text-center">
                    <p className="text-xl font-bold">Tu carrito está vacío</p>
                    <a href="/" className="text-orange-600 mt-4 inline-block">Volver a la tienda</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f]">
            <Header />

            <main className="max-w-7xl mx-auto px-4 pt-32 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Left Column: Form */}
                    <div className="space-y-10">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight mb-2">Finalizar Compra</h1>
                            <p className="text-gray-500 font-medium">Completá tus datos para recibir tu mate.</p>
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest border-b border-orange-100 pb-6">
                            <span className={step >= 1 ? "text-orange-600" : "text-gray-300"}>1. Información</span>
                            <div className="h-px w-8 bg-gray-200" />
                            <span className={step >= 2 ? "text-orange-600" : "text-gray-300"}>2. Envío</span>
                            <div className="h-px w-8 bg-gray-200" />
                            <span className={step >= 3 ? "text-orange-600" : "text-gray-300"}>3. Pago</span>
                        </div>

                        {/* Step 1: Personal Info */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Nombre</label>
                                    <input
                                        type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                                        className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                        placeholder="Ej: Juan"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Apellido</label>
                                    <input
                                        type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                                        className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                        placeholder="Ej: Pérez"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">DNI</label>
                                    <input
                                        type="text" name="dni" value={formData.dni} onChange={handleInputChange}
                                        className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                        placeholder="Tu documento"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">WhatsApp / Teléfono</label>
                                    <input
                                        type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                                        className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                        placeholder="Ej: 2657 123456"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email</label>
                                <input
                                    type="email" name="email" value={formData.email} onChange={handleInputChange}
                                    className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                    placeholder="usuario@correo.com"
                                />
                            </div>
                        </div>

                        {/* Step 2: Shipping Method */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold">Método de entrega</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => setShippingMethod("delivery")}
                                    className={`p-6 rounded-[2rem] border-2 text-left transition-all flex flex-col gap-4 ${shippingMethod === "delivery" ? "border-orange-600 bg-orange-50/50" : "border-orange-100 bg-white hover:border-orange-200"}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${shippingMethod === "delivery" ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-600"}`}>
                                        <Truck size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-[#3d2b1f]">Envío a Domicilio</p>
                                        <p className="text-sm text-gray-500">Correo Argentino</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setShippingMethod("pickup")}
                                    className={`p-6 rounded-[2rem] border-2 text-left transition-all flex flex-col gap-4 ${shippingMethod === "pickup" ? "border-orange-600 bg-orange-50/50" : "border-orange-100 bg-white hover:border-orange-200"}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${shippingMethod === "pickup" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-600"}`}>
                                        <Store size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg text-[#3d2b1f]">Retiro en Local</p>
                                        <p className="text-sm text-gray-500">Villa Mercedes, San Luis</p>
                                    </div>
                                </button>
                            </div>

                            {shippingMethod === "delivery" && (
                                <div className="bg-white p-8 rounded-[2.5rem] border border-orange-100 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Provincia</label>
                                            <div className="relative">
                                                <select
                                                    name="province" value={formData.province} onChange={handleInputChange}
                                                    className="w-full p-4 bg-white border border-orange-100 rounded-2xl appearance-none focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                                >
                                                    <option value="">Seleccioná tu provincia</option>
                                                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Ciudad/Localidad</label>
                                            <input
                                                type="text" name="city" value={formData.city} onChange={handleInputChange}
                                                className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                                placeholder="Ej: Rosario"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Dirección Completa</label>
                                            <input
                                                type="text" name="address" value={formData.address} onChange={handleInputChange}
                                                className="w-full p-4 bg-white border border-orange-100 rounded-2xl focus:ring-2 focus:ring-orange-600 focus:outline-none transition-all"
                                                placeholder="Calle, número, depto..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {shippingMethod === "pickup" && (
                                <div className="bg-green-50 border border-green-100 p-6 rounded-3xl flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <p className="text-sm text-green-800 font-medium">
                                        <strong>Punto de retiro:</strong> Pedernera 546, D5370, Villa Mercedes, San Luis. <br />
                                        Te avisaremos por WhatsApp cuando tu pedido esté listo.
                                    </p>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="w-full py-5 bg-[#3d2b1f] text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-orange-900/20 hover:bg-[#5c4033] transition-all flex items-center justify-center gap-3 group disabled:opacity-70"
                        >
                            {isLoading ? "Procesando..." : "Proceder al Pago"}
                            {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:sticky lg:top-32 h-fit space-y-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-orange-100 shadow-sm">
                            <h3 className="text-2xl font-black mb-8">Resumen del Pedido</h3>

                            <div className="space-y-6 mb-8">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-50 border border-orange-50">
                                            {item.image && (
                                                <Image src={urlFor(item.image).url()} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <span className="text-xs font-black uppercase text-gray-400">Mate Imperial</span>
                                            <p className="font-bold text-sm">{item.name} x{item.quantity}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-black text-sm">${new Intl.NumberFormat('es-AR').format(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-6 border-t border-orange-50">
                                <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                    <span>Subtotal</span>
                                    <span>${new Intl.NumberFormat('es-AR').format(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-medium text-gray-500">
                                    <span>Envío</span>
                                    <span>{shippingMethod === "pickup" ? "Gratis" : `$${new Intl.NumberFormat('es-AR').format(currentShippingCost)}`}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-lg font-black uppercase">Total</span>
                                    <span className="text-3xl font-black text-[#3d2b1f]">
                                        ${new Intl.NumberFormat('es-AR').format(cartTotal + currentShippingCost)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-8 text-xs font-bold text-gray-400">
                            <CheckCircle2 size={16} className="text-green-500" />
                            <span>Tus datos están protegidos por SSL de grado bancario.</span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
