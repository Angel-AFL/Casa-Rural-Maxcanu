// 🟡 Archivo: src/pages/api/sp_insertar_renta_bicicleta.ts

import type { RentaBiciResponse } from '../../types/global';

// 1. La URL de tu SP que me diste
const SUPABASE_RPC_URL = 'https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/rpc/sp_insertar_renta_bicicleta';

// =============================================
// ===== 🟡 LLAVES PUESTAS DIRECTAMENTE 🟡 ======
// =============================================
const SUPABASE_KEY_DIRECTA = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpycndscWh6eGxmY3NiYWFuenpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTcxODEsImV4cCI6MjA3NjA3MzE4MX0.DINbKtuLryfv3vUMmlA3IfSz8EkoqekGVKl5WhqarTM";

/**
 * Función de servicio (como 'insertarGaleria')
 * Acepta argumentos simples en lugar de un objeto
 */
export async function insertarRentaBicicleta(
  nombre: string,
  apellido: string,
  telefono: string
): Promise<RentaBiciResponse | null> {
  
  // 2. Mapeamos los argumentos a como los espera el SP
  const supabasePayload = {
    p_nombre: nombre,
    p_apellido: apellido,
    p_telefono: telefono
  };

  try {
    // 3. El fetch
    const res = await fetch(SUPABASE_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // =============================================
        // ===== 🟡 USANDO LAS LLAVES DIRECTAS 🟡 ======
        // =============================================
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

    // 4. El SP devuelve un array
    const data = (await res.json()) as RentaBiciResponse[];
    
    // Devolvemos el primer (y único) resultado
    return data[0];

  } catch (error) {
    console.error('Error al llamar a insertarRentaBicicleta:', error);
    return null; // Devolvemos null si algo falla
  }
}