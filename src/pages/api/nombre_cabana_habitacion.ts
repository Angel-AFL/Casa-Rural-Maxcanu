import type { CatSala } from '../../types/global';

export async function getCatCabanaHabitacion(): Promise<CatSala[]> {
  try {
    const res = await fetch(
      'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_cabana_habitacion?select=nombre',
      {
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
        },
      }
    );
    if (!res.ok) throw new Error(`Error fetching: ${res.statusText}`);
    const data = (await res.json()) as CatSala[];
    return data;
  } catch (error) {
    console.error('Error fetching cabañas:', error);
    return [];
  }
}
