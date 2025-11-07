import type { DisponibilidadHospedaje } from '../../types/global';

export async function getDisponibilidad(cabana_nombre: string): Promise<DisponibilidadHospedaje[]> {
  try {
    const res = await fetch(
      'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/rpc/sp_get_disponibilidad_hospedaje',
      {
        method: 'POST',
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cabana_nombre }),
      }
    );
    if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
    const data = (await res.json()) as DisponibilidadHospedaje[];
    return data;
  } catch (error) {
    console.error('Error fetching disponibilidad:', error);
    return [];
  }
}
