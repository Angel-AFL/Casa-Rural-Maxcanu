import { Resend } from 'resend';
import type { DevolucionBiciResponse } from '../../types/global';

const RESEND_API_KEY = 're_3x6T5hMc_FxdiP4B7VzXiWorMBs6tmqqA';
const ADMIN_EMAIL = 'gerardojaribgtz@gmail.com';
const resend = new Resend(RESEND_API_KEY);

async function sendEmailAdminDevolucion(data: DevolucionBiciResponse) {
  const bodyText = `
    🚲 BICICLETA DEVUELTA

    Folio: ${data.folio_actualizado}

    Cliente:
    - Nombre: ${data.nombre_cliente}

    Estado:
    - Estatus: ${data.estatus_nuevo}
    - Fecha de devolución: ${new Date(
      data.fecha_devolucion_actualizada
    ).toLocaleString()}
  `;

  await resend.emails.send({
    from: 'Notificaciones Casa Rural <onboarding@resend.dev>',
    to: ADMIN_EMAIL,
    subject: `✅ Bicicleta devuelta - Folio ${data.folio_actualizado}`,
    html: bodyText.replace(/\n/g, '<br>'),
  });
}

export const POST = async ({ request }: { request: Request }) => {
  try {
    const data = (await request.json()) as DevolucionBiciResponse;

    if (!data?.folio_actualizado) {
      return new Response(
        JSON.stringify({ error: 'Datos de devolución incompletos' }),
        { status: 400 }
      );
    }

    await sendEmailAdminDevolucion(data);

    return new Response(
      JSON.stringify({ success: true, message: 'Correo de devolución enviado' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('[EMAIL DEVOLUCIÓN BICI] Error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
};
