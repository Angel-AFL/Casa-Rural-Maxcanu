import type { CatGaleriaArte } from "../../types/global";

export async function getCatGaleriaArte(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*",
      {
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error de Supabase: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as CatGaleriaArte[];
    console.log("Datos de galerias de arte obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error fetching galerias de arte:", error);
  }
}

export async function getAvesTropicales(): Promise<
  CatGaleriaArte[] | undefined
> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_galeria_arte?select=*&sala=eq.Aves%20tropicales",
      {
        headers: {
          apikey: import.meta.env.SUPABASE_KEY,
          Authorization: `Bearer ${import.meta.env.SUPABASE_KEY}`,
        },
      }
    );

    const data = (await response.json()) as CatGaleriaArte[];
    return data;
  } catch (error) {
    console.error("Errir fetching Aves Tropicales:", error);
  }
}
