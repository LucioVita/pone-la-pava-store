import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

export default function FailurePage() {
    return (
        <div className="min-h-screen bg-[#faf9f6] flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-red-100 max-w-lg w-full text-center mt-20">
                    <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <XCircle size={48} />
                    </div>

                    <h1 className="text-4xl font-black text-[#3d2b1f] mb-4">Pago rechazado</h1>
                    <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
                        Hubo un problema al procesar tu pago. Por favor, verificá los datos de tu tarjeta o intentá con otro medio de pago.
                    </p>

                    <Link href="/" className="inline-flex w-full py-4 bg-white border border-gray-200 text-[#3d2b1f] rounded-2xl font-black text-lg shadow-sm hover:bg-gray-50 transition-all items-center justify-center gap-3">
                        <ArrowLeft size={20} />
                        Volver a intentar
                    </Link>
                </div>
            </main>
        </div>
    );
}
