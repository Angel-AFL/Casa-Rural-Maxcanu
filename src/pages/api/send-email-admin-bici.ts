import { Resend } from 'resend';
import type { RentaBiciResponse } from '../../types/global';

const RESEND_API_KEY = 're_3x6T5hMc_FxdiP4B7VzXiWorMBs6tmqqA';
const ADMIN_EMAIL = 'gerardojaribgtz@gmail.com';

const resend = new Resend(RESEND_API_KEY);

async function sendEmailToAdminBici(renta: RentaBiciResponse) {
  const bodyText = `
    🚲 NUEVA RENTA DE BICICLETA

    Folio: ${renta.folio_generado}

    Datos del Cliente:
    - Nombre: ${renta.nombre} ${renta.apellido}
    - Teléfono: ${renta.telefono}

    Este cliente ha rentado una bicicleta.
  `;

  try {
    await resend.emails.send({
      from: 'Notificaciones Casa Rural <onboarding@resend.dev>',
      to: ADMIN_EMAIL,
      subject: `🚲 Nueva Renta de Bicicleta - Folio ${renta.folio_generado}`,
      html: bodyText.replace(/\n/g, '<br>'),
    });

    console.log('[EMAIL ADMIN BICI] Correo enviado con éxito al administrador');
  } catch (error) {
    console.error('[EMAIL ADMIN BICI] Error al enviar correo:', error);
    throw new Error(
      `Fallo al enviar correo de renta de bicicleta: ${(error as Error).message}`
    );
  }
}

export const POST = async ({ request }: { request: Request }) => {
  try {
    const renta = (await request.json()) as RentaBiciResponse;

    if (!renta || !renta.folio_generado) {
      return new Response(
        JSON.stringify({ error: 'Datos de renta incompletos' }),
        { status: 400 }
      );
    }

    await sendEmailToAdminBici(renta);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Correo de renta enviado al administrador',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error en send-email-admin-bici:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
