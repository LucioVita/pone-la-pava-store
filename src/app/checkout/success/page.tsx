import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#faf9f6] flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-orange-100 max-w-lg w-full text-center mt-20">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>

                    <h1 className="text-4xl font-black text-[#3d2b1f] mb-4">¡Pago exitoso!</h1>
                    <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
                        Tu orden ha sido procesada correctamente. En breve nos comunicaremos con vos por WhatsApp para coordinar los detalles del envío.
                    </p>

                    <Link href="/" className="inline-flex w-full py-4 bg-[#3d2b1f] text-white rounded-2xl font-black text-lg shadow-xl shadow-orange-900/20 hover:bg-[#5c4033] transition-all items-center justify-center gap-3 group">
                        Volver a la tienda
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
