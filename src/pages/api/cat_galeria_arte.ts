import type { CatGaleriaArte } from "../../types/global";

const SUPABASE_URL =
  "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte";
const apikey = import.meta.env.SUPABASE_KEY;

// Función genérica para obtener datos por sala
export const getArtsBySala = async (
  salaName: string
): Promise<CatGaleriaArte[]> => {
  try {
    const url = `${SUPABASE_URL}?select=*&sala=eq.${encodeURIComponent(
      salaName
    )}`;

    const response = await fetch(url, {
      headers: {
        apikey,
        authorization: `Bearer ${apikey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as CatGaleriaArte[];
  } catch (error) {
    console.error(`Error cargando sala "${salaName}":`, error);
    return []; // Devolver array vacío es más seguro que undefined para iterar en UI
  }
};

// Ejemplo de uso:
// const catAvesTropicales = await getArtsBySala("Aves tropicales");
