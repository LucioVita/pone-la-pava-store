"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Valeria Mendez",
        date: "Hace 1 mes",
        rating: 5,
        text: "Los dueños, que ellos mismos atienden, son muy amabales y respetuosos!!.. me encataron sus dos locales, no solo por su atencion y variedad de productos, sino también por sus precios accesibles.",
        avatar: "VM"
    },
    {
        name: "María José Nieto",
        date: "Hace 2 meses",
        rating: 5,
        text: "Excelente atención, al ingresar al local ya te da ganas de llevarte todoooo. Súper recomendable! Me encantó 🥰…",
        avatar: "MJ"
    },
    {
        name: "Mario Vicente Maraude",
        date: "Reciente",
        rating: 5,
        text: "Excelente atención. Excelentes Mates, compré Online y en tienda y todo Perfecto. Súper recomendables! A poner La Pava.",
        avatar: "MM"
    }
];

export default function GoogleReviews() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="flex justify-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={20} className="fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-[#3d2b1f] mb-4">
                        Lo que dicen nuestros materos
                    </h2>
                    <p className="text-gray-500 font-medium">
                        4.9/5 estrellas basado en más de 500 reseñas de Google Maps
                    </p>
                </div>

                <div className="flex overflow-x-auto pb-8 md:pb-0 md:grid md:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-hide">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="flex-shrink-0 w-[85vw] md:w-auto bg-[#faf9f6] p-8 rounded-[2.5rem] border border-orange-100 relative group hover:shadow-xl transition-all snap-center mx-1 flex flex-col h-full"
                        >
                            <Quote className="absolute top-6 right-8 text-orange-200 w-12 h-12 -z-0 opacity-50 group-hover:scale-110 transition-transform" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>

                                <p className="text-[#5c4033] font-medium leading-relaxed mb-8 italic flex-grow">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold shadow-md">
                                        {review.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#3d2b1f] truncate max-w-[150px]">{review.name}</h4>
                                        <p className="text-xs text-gray-400 font-medium">{review.date}</p>
                                    </div>
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Maps_icon_%282020%29.svg"
                                        alt="Google"
                                        className="ml-auto w-5 h-5 opacity-80"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="https://www.google.com/maps/place/Tienda+de+Mate+Pone+La+Pava/@-33.6829583,-65.4684964,17z/data=!4m8!3m7!1s0x95d16ba1773954ed:0x9599eb977a18138f!8m2!3d-33.6829583!4d-65.4659215!9m1!1b1!16s%2Fg%2F11sbj9_m9r?entry=ttu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-white border border-orange-200 text-[#3d2b1f] rounded-full font-bold hover:bg-orange-50 transition-all shadow-sm inline-flex items-center justify-center gap-2"
                    >
                        Ver todas en Google Maps
                    </a>
                    <a
                        href="https://search.google.com/local/writereview?placeid=ChIJSVQ5d6G60ZURjxMYepebmZU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all shadow-lg inline-flex items-center justify-center gap-2"
                    >
                        Dejanos tu reseña
                    </a>
                </div>
            </div>
        </section>
    );
}
