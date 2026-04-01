"use client";

import { MapPin, Phone, Instagram, Clock } from "lucide-react";

export default function MapSection() {
    return (
        <section className="py-24 bg-[#faf9f6]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#3d2b1f] mb-8 leading-tight">
                            Vení a visitarnos a <br />
                            <span className="text-orange-600">nuestra tienda</span>
                        </h2>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600 flex-shrink-0 border border-orange-50">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#3d2b1f]">Dirección</h4>
                                    <p className="text-gray-500 font-medium">Pedernera 546, D5370, Villa Mercedes, San Luis</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600 flex-shrink-0 border border-orange-50">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#3d2b1f]">Horarios</h4>
                                    <p className="text-gray-500 font-medium">Lunes a Sábado: 09:00 - 13:00 | 17:00 - 21:00</p>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-orange-600 flex-shrink-0 border border-orange-50">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-[#3d2b1f]">WhatsApp</h4>
                                    <p className="text-gray-500 font-medium">Click para coordinar tu visita</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-orange-600 rounded-[2.5rem] text-white shadow-xl shadow-orange-900/20">
                            <p className="text-orange-100 font-medium mb-2 uppercase tracking-widest text-xs">Tradición Matera</p>
                            <h3 className="text-2xl font-black mb-4">¿Buscás un mate único?</h3>
                            <p className="opacity-90 font-medium mb-6">Te esperamos con el agua lista para que elijas tu próximo compañero de aventuras.</p>
                            <a
                                href="https://www.instagram.com/ponelapavatiendademate/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <button className="px-6 py-3 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-all flex items-center gap-2">
                                    <Instagram size={18} />
                                    Seguinos en IG
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.004089970129!2d-65.46849642369047!3d-33.68295827329814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d16ba1773954ed%3A0x9599eb977a18138f!2sTienda%20de%20Mate%20Pone%20La%20Pava!5e0!3m2!1sen!2sar!4v1771677958558!5m2!1sen!2sar"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale-[0.2] contrast-[1.1] transition-all group-hover:grayscale-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
