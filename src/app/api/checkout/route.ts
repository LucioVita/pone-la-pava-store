import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export async function POST(req: Request) {
    try {
        // 1. Validar Token
        const accessToken = process.env.MP_ACCESS_TOKEN;
        if (!accessToken) {
            console.error("CRITICAL: MP_ACCESS_TOKEN is not defined in environment variables");
            return NextResponse.json({ 
                error: 'Configuración incompleta', 
                details: 'Falta el Access Token de Mercado Pago en el servidor.' 
            }, { status: 500 });
        }

        const client = new MercadoPagoConfig({ accessToken });

        const { items, payer } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'El carrito está vacío' }, { status: 400 });
        }

        const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://ponelapava.ar').replace(/\/$/, '');

        const preferenceData = {
            body: {
                items: items.map((item: any) => ({
                    id: String(item.id),
                    title: String(item.title),
                    quantity: Number(item.quantity),
                    unit_price: Number(item.unit_price),
                    currency_id: 'ARS',
                })),
                payer: {
                    email: payer?.email || 'test_user_78672195@testuser.com',
                    identification: payer?.dni ? {
                        type: 'DNI',
                        number: String(payer.dni)
                    } : undefined,
                },
                metadata: {
                    first_name: payer?.firstName,
                    last_name: payer?.lastName,
                    phone: payer?.phone,
                    dni: payer?.dni,
                    province: payer?.province,
                    city: payer?.city,
                    address: payer?.address,
                    shipping_method: payer?.shippingMethod,
                },
                back_urls: {
                    success: `${appUrl}/checkout/success`,
                    failure: `${appUrl}/checkout/failure`,
                    pending: `${appUrl}/checkout/pending`,
                },
                auto_return: 'approved',
                statement_descriptor: "PONE LA PAVA",
                external_reference: `ORDER-${Date.now()}`,
            }
        };

        console.log("Enviando a Mercado Pago:", JSON.stringify(preferenceData, null, 2));

        const preference = new Preference(client);
        const response = await preference.create(preferenceData);

        console.log("Respuesta completa de Mercado Pago:", JSON.stringify(response, null, 2));

        // En SDK v2, la respuesta puede estar en diferentes niveles según la versión exacta
        const init_point = response.init_point || (response as any).body?.init_point;
        const sandbox_init_point = response.sandbox_init_point || (response as any).body?.sandbox_init_point;
        const id = response.id || (response as any).body?.id;

        if (!init_point) {
            console.error("Error: No se obtuvo init_point. Respuesta:", response);
            return NextResponse.json({ 
                error: 'Error en la respuesta de Mercado Pago', 
                details: 'No se generó el punto de inicio de pago.' 
            }, { status: 500 });
        }

        return NextResponse.json({ id, init_point, sandbox_init_point });
    } catch (error: any) {
        console.error('Error detallado en el Checkout:', error);

        let errorMessage = 'Error al crear la preferencia de pago';
        let errorDetails = error?.message || 'Error desconocido';

        if (error.response) {
            console.error('Error Body de MP:', JSON.stringify(error.response, null, 2));
            errorDetails = JSON.stringify(error.response);
        }

        return NextResponse.json({ 
            error: errorMessage, 
            details: errorDetails 
        }, { status: 500 });
    }
}
