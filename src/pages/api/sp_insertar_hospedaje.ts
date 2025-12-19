import type { HospedajeResponse } from '../../types/global';

const SUPABASE_RPC_URL = 'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/rpc/sp_insert_hospedaje';
const SUPABASE_KEY_DIRECTA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycndscWh6eGxmY3NiYWFuenpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTcxODEsImV4cCI6MjA3NjA3MzE4MX0.DINbKtuLryfv3vUMmlA3IfSz8EkoqekGVKl5WhqarTM";

export async function insertHospedaje(
  nombre: string,
  apellido: string,
  correo: string,
  telefono: string,
  habitacion_cabana: string,
  fecha_entrada: string,
  fecha_salida: string
): Promise<HospedajeResponse | null> {
  
  const supabasePayload = {
    p_nombre: nombre,
    p_apellido: apellido,
    p_correo: correo,
    p_telefono: telefono,
    p_habitacion_cabana: habitacion_cabana,
    p_fecha_entrada: fecha_entrada,
    p_fecha_salida: fecha_salida
  };

  try {
    const res = await fetch(SUPABASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY_DIRECTA,
        'Authorization': `Bearer ${SUPABASE_KEY_DIRECTA}`,
      },
      body: JSON.stringify(supabasePayload),
    });

    if (!res.ok) {
        const errorBody = await res.text();
        let errorMessage = `Error ${res.status}: ${res.statusText}`;
        try {
            const errorJson = JSON.parse(errorBody);
            errorMessage = errorJson?.message || errorMessage;
        } catch (e) {
            errorMessage = errorBody;
        }
        
        console.error('Error en Supabase/RPC:', errorMessage);
        throw new Error(errorMessage);
    }

    const data = (await res.json()) as HospedajeResponse[];
    return data[0];

  } catch (error) {
    console.error('Error al llamar a insertHospedaje:', error);
    throw error; 
  }
}