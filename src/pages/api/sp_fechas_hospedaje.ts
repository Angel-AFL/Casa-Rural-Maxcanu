import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1️⃣ Recibir el nombre de la cabaña desde el frontend
    const { nombre } = await request.json();

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: 'Falta el nombre de la cabaña' }),
        { status: 400 }
      );
    }

    // 2️⃣ Llamar al stored procedure en Supabase
    const response = await fetch(
      `${import.meta.env.SUPABASE_URL}/rest/v1/rpc/sp_get_disponibilidad_hospedaje`,
      {
        method: 'POST',
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        // 👇 parámetro exacto del SP
        body: JSON.stringify({ p_cabana_nombre: nombre }),
      }
    );

    // 3️⃣ Manejar error de respuesta
    if (!response.ok) {
      const text = await response.text();
      console.error('Error desde Supabase:', text);
      return new Response(
        JSON.stringify({
          error: `Error al consultar disponibilidad: ${response.status}`,
        }),
        { status: response.status }
      );
    }

    // 4️⃣ Si todo sale bien, devolvemos los datos
    const data = await response.json();

    // data será un arreglo como:
    // [{ fecha_entrada: "2025-11-09T12:00:00Z", fecha_salida: "2025-11-11T12:00:00Z" }]
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('Error interno en el endpoint:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
