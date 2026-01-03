import { Resend } from 'resend';
import type { HospedajeResponse } from '../../types/global'; 

const RESEND_API_KEY = 're_3x6T5hMc_FxdiP4B7VzXiWorMBs6tmqqA'; 
const ADMIN_EMAIL = 'gerardojaribgtz@gmail.com';     

const resend = new Resend(RESEND_API_KEY); 

async function sendEmailToAdmin(reserva: HospedajeResponse) {
    const bodyText = `
        ¡NUEVA SOLICITUD DE HOSPEDAJE RECIBIDA!

        Folio: ${reserva.folio}
        
        Datos del Cliente:
        - Nombre: ${reserva.nombre} ${reserva.apellido}
        - Teléfono: ${reserva.telefono}
        - Correo: ${reserva.correo}

        Detalles de la Reserva:
        - Habitación/Cabaña: ${reserva.habitacion_cabana}
        - Entrada: ${reserva.fecha_entrada}
        - Salida: ${reserva.fecha_salida}
    `;

    try {
        await resend.emails.send({
            from: 'Notificaciones Casa Rural <onboarding@resend.dev>',
            to: ADMIN_EMAIL as string,
            subject: `🔔 Nueva Solicitud - Folio ${reserva.folio}`,
            html: bodyText.replace(/\n/g, '<br>'),
        });
        console.log(`[EMAIL ADMIN] Correo enviado con éxito al administrador: ${ADMIN_EMAIL}`);
    } catch (error) {
        console.error('[EMAIL ADMIN] Error al enviar correo al administrador:', error);
        throw new Error(`Fallo al enviar correo a Admin: ${(error as Error).message}`);
    }
}

export const POST = async ({ request }: { request: Request }) => {
    try {
        const reserva = (await request.json()) as HospedajeResponse;
        
        if (!reserva || !reserva.folio) {
             return new Response(JSON.stringify({ error: "Datos de reserva incompletos" }), { status: 400 });
        }

        await sendEmailToAdmin(reserva);

        return new Response(JSON.stringify({ success: true, message: "Correo de Admin enviado" }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error en la ruta API de Admin:", error);
        return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};