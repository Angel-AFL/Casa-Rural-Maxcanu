import type { CabanaHabitacion } from '../../types/global';

const SUPABASE_URL = 'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_cabana_habitacion?select=*';

const SUPABASE_KEY_DIRECTA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycndscWh6eGxmY3NiYWFuenpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTcxODEsImV4cCI6MjA3NjA3MzE4MX0.DINbKtuLryfv3vUMmlA3IfSz8EkoqekGVKl5WhqarTM";
const authorization = `Bearer ${SUPABASE_KEY_DIRECTA}`;


export async function getCabanaHabitacion(): Promise<CabanaHabitacion[]> {
  try {
    const res = await fetch(SUPABASE_URL, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY_DIRECTA,
        'Authorization': authorization,
      },
    });

    if (!res.ok) {
      throw new Error(`Error Supabase: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as CabanaHabitacion[];
    console.log("Datos de cabañas obtenidos:", data.length); 
    
    return data;
    
  } catch (error) {
    console.error('Error al obtener datos del Carrusel:', error);
    return [];
  }
}