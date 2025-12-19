import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { nombre } = await request.json();

    if (!nombre) {
      return new Response(
        JSON.stringify({ error: 'Falta el nombre de la cabaña' }),
        { status: 400 }
      );
    }

    const response = await fetch(
      `${import.meta.env.SUPABASE_URL}/rest/v1/rpc/sp_get_disponibilidad_hospedaje`,
      {
        method: 'POST',
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ p_cabana_nombre: nombre }),
      }
    );

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

    const data = await response.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    console.error('Error interno en el endpoint:', err);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500 }
    );
  }
};
