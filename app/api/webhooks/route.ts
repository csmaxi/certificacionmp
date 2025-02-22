// src/app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: 'MERCADOPAGO_ACCESS_TOKEN', // Reemplaza con tu access token
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Verifica que la notificación sea válida
    if (body.action === 'payment.created' || body.action === 'payment.updated') {
      const paymentId = body.data.id;

      // Obtén los detalles del pago
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });

      // Procesa la notificación según el estado del pago
      switch (paymentDetails.status) {
        case 'approved':
          console.log('Pago aprobado:', paymentDetails);
          // Lógica para pagos aprobados
          break;
        case 'rejected':
          console.log('Pago rechazado:', paymentDetails);
          // Lógica para pagos rechazados
          break;
        case 'pending':
          console.log('Pago pendiente:', paymentDetails);
          // Lógica para pagos pendientes
          break;
        default:
          console.log('Estado de pago desconocido:', paymentDetails.status);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
  }
}