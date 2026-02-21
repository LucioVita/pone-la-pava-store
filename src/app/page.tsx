import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import AnimatedPava from "@/components/AnimatedPava";
import SteamEffect from "@/components/SteamEffect";
import GoogleReviews from "@/components/GoogleReviews";
import MapSection from "@/components/MapSection";
import AnimatedCategoryIcon from "@/components/AnimatedCategoryIcon";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";

async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    price,
    category,
    image,
    description
  }`;
  const products = await client.fetch(query, {}, { next: { revalidate: 60 } });
  return products;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f] selection:bg-orange-200">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/portada.png"
            alt="Pone La Pava Portada"
            fill
            className="object-cover object-center brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#faf9f6]"></div>
        </div>

        {/* Steam Effect positioned over the mate - adjusting based on common composition */}
        <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none scale-[1.5]">
          <SteamEffect className="w-40 h-40" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-wider uppercase mb-8 shadow-sm">
            <Star size={12} className="fill-orange-400 text-orange-400" />
            Artesanía Argentina de Exportación
          </div>

          <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter text-white drop-shadow-2xl">
            Pone La Pava
          </h1>
          <h2 className="text-2xl md:text-4xl font-bold mb-8 tracking-tight text-orange-400 drop-shadow-xl">
            Mates y Termos Premium en Argentina
          </h2>

          <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md">
            Especialistas en la cultura del mate. Encontrá tu Mate Imperial, Termo Stanley o sets materos diseñados para toda la vida. Mates de calabaza, madera y algarrobo 100% artesanales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-900/40 hover:bg-orange-700 transition-all hover:-translate-y-1 flex items-center gap-2 group text-xl">
              Ver Colección
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/20 transition-all text-xl shadow-lg">
              Personalizar mi Mate
            </button>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-y border-orange-100 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-800">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#3d2b1f]">Envíos a todo el país</h4>
              <p className="text-xs text-gray-500">Llegamos a cada rincón de Argentina.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-800">
              <Star size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#3d2b1f]">Calidad Premium</h4>
              <p className="text-xs text-gray-500">Materiales nobles y terminación artesanal.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-end">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-800">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#3d2b1f]">Compra Segura</h4>
              <p className="text-xs text-gray-500">Garantía oficial Pone La Pava.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Products Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#3d2b1f]">Nuestros Mates destacados</h2>
            <div className="h-1.5 w-20 bg-orange-600 rounded-full"></div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-orange-50/30 rounded-[3rem] border border-dashed border-orange-200">
            <p className="text-[#5c4033] font-medium italic">Estamos preparando las mejores piezas para vos...</p>
          </div>
        )}
      </section>

      {/* Categories Preview - Static Icons as fallback/complement */}
      <section className="py-24 max-w-7xl mx-auto px-4 border-t border-orange-100">
        <h3 className="text-2xl font-black mb-12 text-center uppercase tracking-widest text-[#3d2b1f]">Explorar por rubro</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { tag: "Mates", icon: "🧉", title: "Mates Imperiales", desc: "Cuero legítimo y virolas de alpaca." },
            { tag: "Termos", icon: "🌡️", title: "Termos Stanley", desc: "Grabados láser personalizados." },
            { tag: "Kits", icon: "💼", title: "Canastas Materas", desc: "El set ideal para tus viajes." },
          ].map((cat, i) => (
            <div key={i} className="group relative bg-white p-10 rounded-[2.5rem] shadow-sm border border-orange-100 flex flex-col items-center transition-all hover:shadow-xl hover:border-orange-200 overflow-hidden cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              <AnimatedCategoryIcon icon={cat.icon} />
              <h3 className="text-2xl font-black mb-3 relative z-10">{cat.title}</h3>
              <p className="text-gray-500 text-center relative z-10 font-medium leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Map & Contact Section */}
      <MapSection />

      {/* Footer */}
      <footer className="bg-[#3d2b1f] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-black tracking-tighter mb-8 underline decoration-orange-600 decoration-4 underline-offset-8">PONE LA PAVA</h2>
            <p className="text-orange-100/60 max-w-sm mx-auto md:mx-0 font-medium leading-relaxed mb-8">
              Dedicados a preservar y elevar la cultura del mate en Argentina y el mundo. Cada pieza es un tributo a nuestra identidad.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              {['ig', 'tk', 'fb'].map((social) => (
                <span key={social} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer text-sm font-bold italic">
                  {social}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-8 text-orange-200">Tienda</h5>
            <ul className="space-y-4 text-orange-100/70 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Mates Imperiales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos Grabados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bombillas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kits Materos</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-8 text-orange-200">Atención</h5>
            <ul className="space-y-4 text-orange-100/70 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Envíos y Seguimiento</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ventas Mayoristas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-white/5 text-center text-white/30 text-[10px] tracking-widest font-black uppercase">
          © {new Date().getFullYear()} PONE LA PAVA STORE. TRADICIÓN Y CALIDAD GARANTIZADA.
        </div>
      </footer>
    </div>
  );
}
