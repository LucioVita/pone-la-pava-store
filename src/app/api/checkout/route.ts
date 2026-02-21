import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Agrega tu access token en el archivo .env.local
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export async function POST(req: Request) {
    try {
        const { items, payer } = await req.json();

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: items.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    unit_price: item.unit_price,
                    currency_id: 'ARS',
                })),
                payer: {
                    email: payer?.email || 'test_user_78672195@testuser.com', // Correo de prueba provisto por MP o el del cliente
                },
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ponelapava.com.ar'}/checkout/success`,
                    failure: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ponelapava.com.ar'}/checkout/failure`,
                    pending: `${process.env.NEXT_PUBLIC_APP_URL || 'https://ponelapava.com.ar'}/checkout/pending`,
                },
                auto_return: 'approved',
            }
        });

        // Debug response just in case
        console.log("Mercado Pago Raw Response:", JSON.stringify(response, null, 2));

        // The SDK might return the data directly or wrapped in body
        const init_point = response.init_point || (response as any).body?.init_point;
        const id = response.id || (response as any).body?.id;

        if (!init_point) {
            console.error("No se encontró init_point en la respuesta:", response);
            return NextResponse.json({ error: 'Estructura de respuesta inesperada', details: response }, { status: 500 });
        }

        return NextResponse.json({ id, init_point });
    } catch (error: any) {
        console.error('Error creating preference:', error);

        let details = error?.message || error;
        // Log deep error content from MP SDK if available
        if (error.response) {
            console.error('MercadoPago Error Body:', JSON.stringify(error.response, null, 2));
            details = JSON.stringify(error.response);
        }

        return NextResponse.json({ error: 'Error creating preference', details }, { status: 500 });
    }
}
