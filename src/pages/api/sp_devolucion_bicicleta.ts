import type { DevolucionBiciResponse } from '../../types/global';

const SUPABASE_RPC_URL = 'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/rpc/sp_devolucion_bicicleta';
const SUPABASE_KEY_DIRECTA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycndscWh6eGxmY3NiYWFuenpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTcxODEsImV4cCI6MjA3NjA3MzE4MX0.DINbKtuLryfv3vUMmlA3IfSz8EkoqekGVKl5WhqarTM"

export async function devolverBicicleta(
  folio: string
): Promise<DevolucionBiciResponse | null> {
  
  const supabasePayload = {
    p_folio_buscado: folio
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
      console.error('Error en Supabase (respuesta no ok):', errorBody);
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as DevolucionBiciResponse[];
    return data[0] || null;

  } catch (error) {
    console.error('Error al llamar a devolverBicicleta:', error);
    return null; 
  }
}