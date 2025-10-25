import type { CatSala } from "../../types/global";

export async function getCatSalas(): Promise<CatSala[] | undefined> {
  try {
    const response = await fetch(
      "https://jrrwlqhzxlfcsbaanzzq.supabase.co/rest/v1/cat_sala?select=imagen,nombre",
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

    const data = (await response.json()) as CatSala[];
    return data;
  } catch (error) {
    console.error("Error fetching salas:", error);
  }
}
