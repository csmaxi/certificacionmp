import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

if (!accessToken) {
  throw new Error("MERCADOPAGO_ACCESS_TOKEN no está definido en las variables de entorno.");
}

const client = new MercadoPagoConfig({
  accessToken, // Usa la variable de entorno del servidor
});

export async function POST(request: Request) {
  try {
    console.log("Access Token:", accessToken); // Depuración

    const preference = new Preference(client);

    const body = {
      items: [
        {
          id: "1234",
          title: "Dispositivo móvil de comercio electrónico",
          description: "Dispositivo móvil de última generación para uso en comercio electrónico, ideal para gestionar tu tienda online.",
          picture_url: "https://certificacionmp.vercel.app/images/producto.jpg",
          quantity: 1,
          unit_price: 5000,
        },
      ],
      back_urls: {
        success: "https://certificacionmp.vercel.app/success",
        failure: "https://certificacionmp.vercel.app/failure",
        pending: "https://certificacionmp.vercel.app/pending",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "visa", // Excluir tarjetas Visa
          },
        ],
        installments: 6, // Máximo de 6 cuotas
      },
      notification_url: "https://certificacionmp.vercel.app/api/webhook", // URL para notificaciones Webhook
      integrator_id: "dev_24c65fb163bf11ea96500242ac130004", // Integrator ID en el body
      external_reference: "1643827245",
    };

    const requestOptions = {
      integratorId: "dev_24c65fb163bf11ea96500242ac130004", // Integrator ID en requestOptions
    };

    const response = await preference.create({ body, requestOptions });

    console.log("Preference created:", response); // Depuración
    return NextResponse.json({ id: response.id });
  } catch (error) {
    console.error("Error creating preference:", error);
    return NextResponse.json(
      { error: "Failed to create preference", details: error },
      { status: 500 }
    );
  }
}