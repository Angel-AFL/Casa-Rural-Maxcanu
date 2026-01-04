import type { APIRoute } from 'astro';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const {
      folio_generado,
      nombre,
      apellido,
      telefono,
    } = data;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();

    const colorBrand = rgb(0.498, 0.18, 0.173);

    page.drawRectangle({
      x: 0,
      y: height - 150,
      width: width,
      height: 150,
      color: colorBrand,
    });

    page.drawRectangle({
      x: 0,
      y: 0,
      width,
      height: 50,
      color: colorBrand,
    });

    const logoUrl =
      'https://jrrwlqhzxlfcsbaanzzq.supabase.co/storage/v1/object/public/images/logo-casa-rural-horizontal-variante.png';

    const logoBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);

    page.drawImage(logoImage, {
      x: 70,
      y: height - 140,
      width: width - 140,
      height: 120,
    });

    page.drawText('Comprobante de Renta de Bicicleta', {
      x: 50,
      y: height - 240,
      size: 18,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    const startY = height - 290;
    const lineHeight = 24;

    const fields = [
      `Folio: ${folio_generado}`,
      `Nombre: ${nombre} ${apellido}`,
      `Telefono: ${telefono}`,
      'IMPORTANTE: Conserva este folio para registrar la devolucion de la bicicleta.',
    ];

    fields.forEach((text, index) => {
      page.drawText(text, {
        x: 50,
        y: startY - index * lineHeight,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    });

    // 5️⃣ Footer texto
    page.drawText(
      'Casa Rural Maxcanu - Gracias por tu preferencia',
      {
        x: 50,
        y: 20,
        size: 10,
        font,
        color: rgb(1, 1, 1),
      }
    );

    const pdfBytes = await pdfDoc.save();

    return new Response(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Renta_Bicicleta_${folio_generado}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error al generar PDF bicicleta:', error);

    return new Response(
      JSON.stringify({ error: 'Error al generar el PDF' }),
      { status: 500 }
    );
  }
};
