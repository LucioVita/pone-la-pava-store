import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: Request) {
    try {
        const url = new URL(req.url);
        const topic = url.searchParams.get('topic') || url.searchParams.get('type');
        const id = url.searchParams.get('id') || url.searchParams.get('data.id');

        console.log(`Webhook recibido: Topic=${topic}, ID=${id}`);

        if (topic === 'payment' || (topic === 'payment' && id)) {
            const payment = new Payment(client);
            const data = await payment.get({ id: String(id) });

            console.log("Datos del pago recibidos:", JSON.stringify(data, null, 2));

            // Aquí es donde actualizarías tu base de datos o enviarías un WhatsApp
            if (data.status === 'approved') {
                console.log("¡Pago aprobado! Referencia externa:", data.external_reference);

                // Enviar señal a n8n
                const N8N_WEBHOOK_URL = "https://n8n.resto.guruweb.com.ar/webhook/c25fc354-2a4e-4831-abdd-85113e39c772/chat";

                try {
                    await fetch(N8N_WEBHOOK_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            type: "PURCHASE",
                            orderId: data.external_reference,
                            amount: data.transaction_amount,
                            status: data.status,
                            customer: data.metadata,
                            items: data.additional_info?.items || [],
                            paymentId: id,
                        }),
                    });
                    console.log("Notificación enviada a n8n exitosamente");
                } catch (n8nError) {
                    console.error("Error al enviar a n8n:", n8nError);
                }
            }
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error: any) {
        console.error('Error en Webhook de Mercado Pago:', error);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
    }
}
