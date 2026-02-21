import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#3d2b1f]">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-orange-50 px-4 py-1 rounded-full text-orange-800 text-xs font-bold tracking-widest uppercase">
            Tradición Argentina
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Pone La Pava
        </h1>

        <p className="text-xl md:text-2xl text-[#5c4033] mb-12 max-w-2xl mx-auto italic">
          "El ritual del mate, llevado a la excelencia."
        </p>

        {/* Categories Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center transition-all hover:shadow-md text-center">
            <span className="text-5xl mb-4">🧉</span>
            <h3 className="text-xl font-bold mb-2">Mates Premium</h3>
            <p className="text-sm text-gray-500">Mates de calabaza forrados en cuero y madera de caldén.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center transition-all hover:shadow-md text-center">
            <span className="text-5xl mb-4">🌡️</span>
            <h3 className="text-xl font-bold mb-2">Termos y Bombillas</h3>
            <p className="text-sm text-gray-500">Bombillas de alpaca y termos con grabado láser.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-orange-100 flex flex-col items-center transition-all hover:shadow-md text-center">
            <span className="text-5xl mb-4">💼</span>
            <h3 className="text-xl font-bold mb-2">Kit Matero</h3>
            <p className="text-sm text-gray-500">Mochilas y materas para llevar tu pasión a todos lados.</p>
          </div>
        </div>

        {/* Status Message */}
        <div className="mt-24 pt-12 border-t border-orange-100 text-gray-400">
          <p className="text-sm font-medium uppercase tracking-widest mb-2">Estado del Proyecto</p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs">Tienda en desarrollo - Panel de productos próximamente</span>
          </div>
        </div>
      </main>

      {/* Footer / Copyright */}
      <footer className="py-8 text-center text-gray-400 text-xs mt-auto">
        &copy; {new Date().getFullYear()} Pone La Pava Store. Todos los derechos reservados.
      </footer>
    </div>
  );
}
