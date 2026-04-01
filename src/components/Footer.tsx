import Link from "next/link";

export default function Footer() {
    return (
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
                        <li><Link href="/" className="hover:text-white transition-colors">Mates Imperiales</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Termos Grabados</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Bombillas</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Kits Materos</Link></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-bold mb-8 text-orange-200">Atención</h5>
                    <ul className="space-y-4 text-orange-100/70 text-sm font-medium">
                        <li><Link href="/" className="hover:text-white transition-colors">Envíos y Seguimiento</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Ventas Mayoristas</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">Contacto</Link></li>
                        <li><Link href="/" className="hover:text-white transition-colors">FAQ</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-24 pt-8 border-t border-white/5 text-center flex flex-col items-center gap-2">
                <div className="text-white/30 text-[10px] tracking-widest font-black uppercase">
                    © {new Date().getFullYear()} PONE LA PAVA STORE. TRADICIÓN Y CALIDAD GARANTIZADA.
                </div>
                <div className="text-white/40 text-[11px] font-medium">
                    Desarrollo: <a href="https://guruweb.com.ar" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors underline decoration-orange-600/30 underline-offset-4">guruweb.com.ar</a>
                </div>
            </div>
        </footer>
    );
}
