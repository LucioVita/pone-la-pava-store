import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import AnimatedPava from "@/components/AnimatedPava";
import SteamEffect from "@/components/SteamEffect";
import GoogleReviews from "@/components/GoogleReviews";
import MapSection from "@/components/MapSection";
import AnimatedCategoryIcon from "@/components/AnimatedCategoryIcon";
import { ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";

async function getProducts(search?: string) {
  let query = `*[_type == "product"] | order(_createdAt desc) [0...6] {
    _id,
    name,
    "slug": slug.current,
    price,
    "category": category->title,
    image,
    description
  }`;

  if (search) {
    query = `*[_type == "product" && (name match $search || description match $search || category->title match $search)] | order(_createdAt desc) {
      _id,
      name,
      "slug": slug.current,
      price,
      "category": category->title,
      image,
      description
    }`;
  }

  const products = await client.fetch(query, { search: search ? `${search}*` : "" }, { next: { revalidate: 60 } });
  return products;
}

export default async function Home({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s: searchQuery } = await searchParams;
  const products = await getProducts(searchQuery);
  const isSearching = !!searchQuery;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f] selection:bg-orange-200 pt-20">

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/fachada.jpeg"
            alt="Pone La Pava Local Fachada"
            fill
            className="object-cover object-center brightness-75 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Steam Effect positioned over the mate - adjusting based on common composition */}
        <div className="absolute top-[40%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none scale-[1.5]">
          <SteamEffect className="w-40 h-40" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 rounded-[3rem] shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/80 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
              <Star size={12} className="fill-white text-white" />
              Local Físico en Villa Mercedes
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter text-white drop-shadow-2xl">
              Pone La Pava
            </h1>
            <h2 className="text-xl md:text-3xl font-bold mb-12 tracking-tight text-orange-200 drop-shadow-xl uppercase">
              Tradición y Calidad en cada Mate
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#productos"
                className="px-10 py-5 bg-orange-600 text-white rounded-full font-bold shadow-xl shadow-orange-900/40 hover:bg-orange-700 transition-all hover:-translate-y-1 flex items-center gap-2 group text-xl w-full sm:w-auto justify-center"
              >
                Ver Catálogo
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/5491157348764"
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full font-bold hover:bg-white/30 transition-all text-xl shadow-lg w-full sm:w-auto text-center"
              >
                Contacto WhatsApp
              </a>
            </div>
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
      <section id="productos" className="py-24 max-w-7xl mx-auto px-4 overflow-hidden">
        <div className="flex items-end justify-between mb-16 px-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-[#3d2b1f]">
              {isSearching ? `Resultados para: "${searchQuery}"` : "Nuestros Mates destacados"}
            </h2>
            <div className="h-1.5 w-20 bg-orange-600 rounded-full"></div>
          </div>
          {isSearching && (
            <Link href="/" className="text-orange-600 font-bold hover:underline mb-4">
              Limpiar búsqueda
            </Link>
          )}
        </div>

        {products.length > 0 ? (
          isSearching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mx-4">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <ProductCarousel products={products} />
          )
        ) : (
          <div className="mx-4 text-center py-20 bg-orange-50/30 rounded-[3rem] border border-dashed border-orange-200">
            <p className="text-[#5c4033] font-medium italic">
              {isSearching ? "No encontramos productos que coincidan con tu búsqueda." : "Estamos preparando las mejores piezas para vos..."}
            </p>
          </div>
        )}
      </section>

      {/* Categories Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 border-t border-orange-100">
        <h3 className="text-2xl font-black mb-12 text-center uppercase tracking-widest text-[#3d2b1f]">Explorar por rubro</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { slug: "mates", icon: "/cat-mate.png", title: "Mates" },
            { slug: "termos", icon: "/cat-termo.png", title: "Termos" },
            { slug: "canastas-materas", icon: "/cat-kit.png", title: "Canastas materas" },
            { slug: "mochilas-materas", icon: "/cat-mochila.png", title: "Mochilas materas" },
            { slug: "sets-materos", icon: "/cat-set.png", title: "Sets materos" },
            { slug: "mates-personalizados", icon: "/cat-personalizado.png", title: "Mates personalizados" },
          ].map((cat, i) => (
            <Link
              key={i}
              href={`/categoria/${cat.slug}`}
              className="group relative rounded-[2rem] overflow-hidden cursor-pointer h-80 md:h-96 block shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Full-bleed background image */}
              <Image
                src={cat.icon}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
              {/* Title at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="text-3xl font-black text-white drop-shadow-lg tracking-tight">
                  {cat.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-orange-200 font-semibold text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span>Ver productos</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* Map & Contact Section */}
      <MapSection />
    </div>
  );
}
